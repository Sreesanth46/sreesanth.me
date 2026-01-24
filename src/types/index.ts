export interface Experience {
  employer: string;
  title: string;
  startDate?: string;
  endDate?: string;
  summary?: string[];
}

export interface BlogData {
  title?: string;
  date?: string;
}

export interface BlogTitleProps extends BlogData {
  readTime?: string;
}

export type BlogPublishedOnProps = Omit<BlogTitleProps, 'title'>;
