import { Octokit } from '@octokit/rest';
import fs from 'fs-extra';
import { matter } from '../src/utils/matter.ts';
import { readTime } from '../src/utils/read-time.ts';
import type { components } from '@octokit/openapi-types';
import { Blog } from '~/types/index.js';

type GetRepoContentResponseDataFile = components['schemas']['content-file'];

const auth = process.env.GITHUB_TOKEN;

async function getContent(owner: string, repo: string, path = '') {
  const github = new Octokit({ auth });

  const { data } = await github.repos.getContent({
    owner,
    repo,
    path,
  });

  return data as GetRepoContentResponseDataFile;
}

const parseMatter = async (owner: string, repo: string, path = '') => {
  const data = await getContent(owner, repo, path);

  if (Array.isArray(data)) return;

  const { name, download_url, content } = data;

  const buffer = Buffer.from(content, 'base64').toString();
  const { data: matterData, content: matterContent } = matter(buffer);
  const read = readTime(matterContent);

  return {
    name: name.split('.')[0],
    url: download_url ?? '',
    readTime: read,
    ...matterData,
  } as Blog;
};

/**
 * Fetches markdown files from a GitHub repository path, parses their frontmatter into Blog objects, sorts them by date (newest first), and writes the resulting `blogs` export to ./src/blogs.ts.
 *
 * @param owner - GitHub repository owner
 * @param repo - GitHub repository name
 * @param path - Repository path to list and parse (defaults to repository root)
 */
async function run(owner: string, repo: string, path = '') {
  const data = await getContent(owner, repo, path);

  if (!Array.isArray(data)) {
    return;
  }

  const blogs: Blog[] = [];

  for (const { type, path } of data) {
    if (type === 'file') {
      const contents = await parseMatter(owner, repo, path);
      if (contents) blogs.push(contents);
    }
  }

  blogs.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

  const final = `export const blogs = ${JSON.stringify(blogs, null, 4)} as const`;

  await fs.writeFile('./src/blogs.ts', final, 'utf-8');
}

run('Sreesanth46', 'blogs');
