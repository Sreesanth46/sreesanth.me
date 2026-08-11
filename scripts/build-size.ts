/*
 * Reports the size of `dist` after a build.
 *
 * Prints a table to stdout, and — when running in GitHub Actions — writes the
 * same table to the job summary so every deployment shows its bundle size.
 *
 * Sizes are reported raw and gzipped. Gzip is the number worth watching: it's
 * roughly what visitors actually download, and raw size moves around for reasons
 * (minifier output, comments) that don't reach the wire.
 *
 * A baseline file (see BASELINE_PATH) carries the previous deployment's totals so
 * the report can show a delta. Missing or unreadable baseline just means no delta
 * — never a failure, since the very first run has nothing to compare against.
 */

import fg from 'fast-glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const DIST = 'dist';

/** Persisted between runs (via the CI cache) to produce the deploy-over-deploy delta. */
const BASELINE_PATH = process.env.BUILD_SIZE_BASELINE ?? '.build-size.json';

/** Level 6 is what a default nginx/CDN gzip uses — pinned so the number is
    comparable across runs rather than tracking Node's default of the day. */
const GZIP_LEVEL = 6;

/** How many of the biggest files to list individually. */
const TOP_FILES = 10;

interface FileSize {
  file: string;
  raw: number;
  gzip: number;
}

interface Group {
  label: string;
  files: number;
  raw: number;
  gzip: number;
}

interface Baseline {
  raw: number;
  gzip: number;
  files: number;
  /** Per-category totals, so a jump can be attributed rather than just noticed. */
  groups?: Record<string, { raw: number; gzip: number }>;
  sha?: string;
  builtAt?: string;
}

const CATEGORIES: { label: string; test: (ext: string) => boolean }[] = [
  { label: 'JavaScript', test: (ext) => ext === '.js' || ext === '.mjs' || ext === '.cjs' },
  { label: 'CSS', test: (ext) => ext === '.css' },
  { label: 'HTML', test: (ext) => ext === '.html' },
  {
    label: 'Images',
    test: (ext) =>
      ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.ico'].includes(ext),
  },
  { label: 'Fonts', test: (ext) => ['.woff', '.woff2', '.ttf', '.otf', '.eot'].includes(ext) },
];

function categoryOf(file: string) {
  const ext = path.extname(file).toLowerCase();
  return CATEGORIES.find((c) => c.test(ext))?.label ?? 'Other';
}

/** SI units, matching the kB/MB that Vite's own build output reports. */
function formatBytes(bytes: number) {
  if (bytes < 1000) return `${bytes} B`;
  if (bytes < 1000 * 1000) return `${(bytes / 1000).toFixed(1)} kB`;
  return `${(bytes / (1000 * 1000)).toFixed(2)} MB`;
}

function formatDelta(current: number, previous: number | undefined) {
  if (previous === undefined) return '';

  const diff = current - previous;

  // Sub-100-byte drift is noise from hashed filenames and minifier ordering.
  if (Math.abs(diff) < 100) return ' (±0)';

  const sign = diff > 0 ? '+' : '−';
  // Magnitude only — `sign` carries the direction for both figures.
  const pct = previous > 0 ? `, ${sign}${((Math.abs(diff) / previous) * 100).toFixed(1)}%` : '';
  return ` (${sign}${formatBytes(Math.abs(diff))}${pct})`;
}

async function measure(): Promise<FileSize[]> {
  const files = await fg('**/*', { cwd: DIST, onlyFiles: true, dot: false });

  return Promise.all(
    files.map(async (file) => {
      const buffer = await fs.readFile(path.join(DIST, file));
      return {
        file,
        raw: buffer.byteLength,
        gzip: gzipSync(buffer, { level: GZIP_LEVEL }).byteLength,
      };
    })
  );
}

function group(sizes: FileSize[]): Group[] {
  const byLabel = new Map<string, Group>();

  for (const size of sizes) {
    const label = categoryOf(size.file);
    const existing = byLabel.get(label) ?? { label, files: 0, raw: 0, gzip: 0 };

    existing.files += 1;
    existing.raw += size.raw;
    existing.gzip += size.gzip;
    byLabel.set(label, existing);
  }

  return [...byLabel.values()].sort((a, b) => b.gzip - a.gzip);
}

async function readBaseline(): Promise<Baseline | undefined> {
  try {
    const parsed = JSON.parse(await fs.readFile(BASELINE_PATH, 'utf-8')) as Baseline;
    return typeof parsed?.gzip === 'number' ? parsed : undefined;
  } catch {
    // No previous deployment recorded (first run, or the cache expired).
    return undefined;
  }
}

function buildReport(sizes: FileSize[], groups: Group[], baseline: Baseline | undefined) {
  const total = sizes.reduce((acc, s) => ({ raw: acc.raw + s.raw, gzip: acc.gzip + s.gzip }), {
    raw: 0,
    gzip: 0,
  });

  const lines: string[] = ['## Build size', ''];

  lines.push('| Category | Files | Raw | Gzip |', '| --- | --: | --: | --: |');

  for (const g of groups) {
    const previous = baseline?.groups?.[g.label];
    lines.push(
      `| ${g.label} | ${g.files} | ${formatBytes(g.raw)} | ${formatBytes(g.gzip)}${formatDelta(
        g.gzip,
        previous?.gzip
      )} |`
    );
  }

  lines.push(
    `| **Total** | **${sizes.length}** | **${formatBytes(total.raw)}**${formatDelta(
      total.raw,
      baseline?.raw
    )} | **${formatBytes(total.gzip)}**${formatDelta(total.gzip, baseline?.gzip)} |`,
    ''
  );

  if (baseline) {
    const when = baseline.builtAt ? ` (${baseline.builtAt})` : '';
    const sha = baseline.sha ? ` \`${baseline.sha.slice(0, 7)}\`` : '';
    lines.push(`Compared against the previous deployment${sha}${when}.`, '');
  } else {
    lines.push('No previous deployment to compare against — this run becomes the baseline.', '');
  }

  const largest = [...sizes].sort((a, b) => b.gzip - a.gzip).slice(0, TOP_FILES);

  lines.push(
    `<details><summary>${TOP_FILES} largest files</summary>`,
    '',
    '| File | Raw | Gzip |',
    '| --- | --: | --: |'
  );

  for (const f of largest) {
    lines.push(`| \`${f.file}\` | ${formatBytes(f.raw)} | ${formatBytes(f.gzip)} |`);
  }

  lines.push('', '</details>', '');

  return { markdown: lines.join('\n'), total };
}

async function run() {
  const sizes = await measure();

  if (!sizes.length) {
    console.error(`No files found in ${DIST}/ — run the build first.`);
    process.exitCode = 1;
    return;
  }

  const groups = group(sizes);
  const baseline = await readBaseline();
  const { markdown, total } = buildReport(sizes, groups, baseline);

  console.log(markdown);

  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (summaryPath) {
    await fs.appendFile(summaryPath, `${markdown}\n`, 'utf-8');
  }

  const next: Baseline = {
    raw: total.raw,
    gzip: total.gzip,
    files: sizes.length,
    groups: Object.fromEntries(groups.map((g) => [g.label, { raw: g.raw, gzip: g.gzip }])),
    sha: process.env.GITHUB_SHA,
    builtAt: new Date().toISOString().slice(0, 10),
  };

  await fs.writeFile(BASELINE_PATH, `${JSON.stringify(next, null, 2)}\n`, 'utf-8');
}

run();
