import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import FailedView from "../common/FailedView";
import { fetchSearchTags } from "../../services/search";
import TagPostSearchResults from "./TagPostSearchResults";
import {
  SEARCH_STALE_TIME,
  searchTagsQueryKey,
} from "./searchQueryKeys";

type TagSearchResultsProps = {
  searchQuery: string;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
};

const TagSearchResults = ({
  searchQuery,
  selectedTag,
  onSelectTag,
}: TagSearchResultsProps) => {

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: searchTagsQueryKey(searchQuery),
    queryFn: ({ pageParam }) =>
      fetchSearchTags({ query: searchQuery, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
    enabled: Boolean(searchQuery) && !selectedTag,
    staleTime: SEARCH_STALE_TIME,
    refetchOnWindowFocus: false,
  });

  const tags =
    data?.pages.flatMap((page) => page.tags ?? []).filter(Boolean) ?? [];

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !isLoading
        ) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "500px",
        threshold: 0,
      },
    );

    const current = loadMoreRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]);

  if (selectedTag) {
    return (
      <div>
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 pt-3 sm:px-6">
          <button
            type="button"
            onClick={() => onSelectTag(null)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Back
          </button>
          <h2 className="text-lg font-semibold text-blue-600">#{selectedTag}</h2>
        </div>

        <TagPostSearchResults tag={selectedTag} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <ul className="mx-auto mt-3 flex w-full max-w-3xl list-none flex-col gap-2 px-4 sm:px-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <li
            key={index}
            className="h-14 animate-pulse rounded-lg border border-slate-200/80 bg-slate-100"
          />
        ))}
      </ul>
    );
  }

  if (isError) {
    return <FailedView message="Failed to load tags" />;
  }

  if (tags.length === 0) {
    return (
      <p className="mt-10 text-center text-sm text-slate-500">
        No tags match &ldquo;{searchQuery}&rdquo;.
      </p>
    );
  }

  return (
    <>
      <ul className="mx-auto mt-3 flex w-full max-w-3xl list-none flex-col gap-2 px-4 sm:px-6">
        {tags.map((item) => (
          <li key={item.tag}>
            <button
              type="button"
              onClick={() => onSelectTag(item.tag)}
              className="flex w-full items-center justify-between rounded-lg border border-slate-200/80 bg-white px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="font-medium text-blue-600">#{item.tag}</span>
              <span className="text-sm text-slate-500">
                {item.postsCount} posts
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && (
        <p className="py-4 text-center text-sm text-slate-400">Loading more…</p>
      )}
    </>
  );
};

export default TagSearchResults;
