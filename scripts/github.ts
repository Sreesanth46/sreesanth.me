import { Octokit } from "@octokit/rest";
import fs from "fs-extra";
import { matter } from "../src/utils/matter.ts";
import { readTime } from "../src/utils/read-time.ts";
import type { components } from "@octokit/openapi-types";

type GetRepoContentResponseDataFile = components["schemas"]["content-file"];
type TBlogs = {
  name: string;
  url: string;
  title?: string;
  date?: string;
  readTime?: string;
};

const auth = process.env.GITHUB_TOKEN;

async function getContent(owner: string, repo: string, path = "") {
  const github = new Octokit({ auth });

  const { data } = await github.repos.getContent({
    owner,
    repo,
    path,
  });

  return data as GetRepoContentResponseDataFile;
}

const parseMatter = async (owner: string, repo: string, path = "") => {
  const data = await getContent(owner, repo, path);

  if (Array.isArray(data)) return;

  const { name, download_url, content } = data;

  const buffer = Buffer.from(content, "base64").toString();
  const { data: matterData, content: matterContent } = matter(buffer);
  const read = readTime(matterContent);

  return {
    name: name.split(".")[0],
    url: download_url ?? "",
    readTime: read,
    ...matterData,
  } as TBlogs;
};

async function run(owner: string, repo: string, path = "") {
  const data = await getContent(owner, repo, path);

  if (!Array.isArray(data)) {
    return;
  }

  const blogs: TBlogs[] = [];

  for (const { type, path } of data) {
    if (type === "file") {
      const contents = await parseMatter(owner, repo, path);
      if (contents) blogs.push(contents);
    }
  }

  const final = `export const blogs = ${JSON.stringify(blogs)}`;

  await fs.writeFile("./src/blogs.ts", final, "utf-8");
}

run("Sreesanth46", "blogs");
