export interface Experience {
  employer: string;
  title: string;
  startDate?: string;
  endDate?: string;
  summary?: string[];
}

interface Blog {
  name: string;
  url: string;
  title: string;
  date: string;
  readTime: string;
}

export type BlogTitleProps = Omit<Blog, 'url'>;

export type BlogPublishedOnProps = Pick<Blog, 'date' | 'readTime'>;
