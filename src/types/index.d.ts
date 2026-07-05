export interface Experience {
  employer: string;
  title: string;
  startDate?: string;
  endDate?: string;
  summary?: string[];
}

export interface Blog {
  name: string;
  url: string;
  title: string;
  date: string;
  readTime: string;
  tags: readonly string[];
}

export type BlogTitleProps = Omit<Blog, 'url'>;

export type BlogPublishedOnProps = Pick<Blog, 'date' | 'readTime'>;
