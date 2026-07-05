import type { Blog } from '~/types';

interface RelatedBlogs {
  blogs: Blog[];
  /** True when the picks actually share tags with the current post. */
  similar: boolean;
}

/**
 * Pick posts sharing tags with the current one, most overlap first,
 * newest first on ties. When nothing overlaps, fall back to the most
 * recent posts instead — callers should label that case differently
 * rather than present unrelated posts as "similar".
 */
export function relatedBlogs(current: Blog, all: readonly Blog[], limit = 2): RelatedBlogs {
  const currentTags = new Set(current.tags);

  const scored = all
    .filter((blog) => blog.name !== current.name)
    .map((blog) => ({
      blog,
      shared: blog.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        new Date(b.blog.date).valueOf() - new Date(a.blog.date).valueOf(),
    );

  const similar = scored.filter(({ shared }) => shared > 0);

  return {
    blogs: (similar.length ? similar : scored).slice(0, limit).map(({ blog }) => blog),
    similar: similar.length > 0,
  };
}
