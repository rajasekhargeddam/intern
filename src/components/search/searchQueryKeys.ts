export const SEARCH_STALE_TIME = 30_000;

export const searchPostsQueryKey = (query: string) =>
  ["search-posts", query] as const;

export const searchUsersQueryKey = (query: string) =>
  ["search-users", query] as const;

export const searchTagsQueryKey = (query: string) =>
  ["search-tags", query] as const;

export const searchTagPostsQueryKey = (tag: string) =>
  ["search-tag-posts", tag] as const;
