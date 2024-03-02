import { Octokit } from '@octokit/rest';
import fs from 'fs-extra';

async function run(owner: string, repo: string, path: string = '') {
  const github = new Octokit({ auth: process.env.GITHUB_TOKEN! });

  const { data } = await github.repos.getContent({
    owner,
    repo,
    path
  });

  if (!Array.isArray(data)) return;

  const blogs: { name: string; url: string }[] = [];

  for (const content of data) {
    const { name, download_url } = content;

    blogs.push({ name, url: download_url ?? '' });
  }

  const final = `export const blogs = ${JSON.stringify(blogs)}`;

  await fs.writeFile('./src/blogs.ts', final, 'utf-8');
}

run('Sreesanth46', 'blogs');
