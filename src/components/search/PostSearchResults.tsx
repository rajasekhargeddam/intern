import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import UserPostsList from "../post/UserPostsList";
import FailedView from "../common/FailedView";
import UserPostsShimmer from "../../shimmer/UserPostsShimmer";
import { fetchSearchPosts } from "../../services/search";
import useDeletePostMutation from "../../hooks/useDeletePostMutation";
import { notifyError, notifySuccess } from "../../utils/toast";
import {
  SEARCH_STALE_TIME,
  searchPostsQueryKey,
} from "./searchQueryKeys";

type PostSearchResultsProps = {
  searchQuery: string;
};

const PostSearchResults = ({ searchQuery }: PostSearchResultsProps) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: searchPostsQueryKey(searchQuery),
    queryFn: ({ pageParam }) =>
      fetchSearchPosts({ query: searchQuery, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
    enabled: Boolean(searchQuery),
    staleTime: SEARCH_STALE_TIME,
    refetchOnWindowFocus: false,
  });

  const posts =
    data?.pages.flatMap((page) => page.posts ?? []).filter(Boolean) ?? [];

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const deletePostMutation = useDeletePostMutation([
    searchPostsQueryKey(searchQuery),
    ["posts"],
    ["liked-posts"],
    ["saved-posts"],
  ]);

  const onDeletePost = (postId: string) => {
    deletePostMutation.mutate(postId, {
      onSuccess: (message) => {
        notifySuccess(message);
      },
      onError: (error) => {
        notifyError(
          error instanceof Error ? error.message : "failed to delete Post",
        );
      },
    });
  };

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

  if (isLoading) {
    return <UserPostsShimmer />;
  }

  if (isError) {
    return <FailedView />;
  }

  return (
    <>
      <UserPostsList posts={posts} onDeletePost={onDeletePost} />

      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && <UserPostsShimmer />}
    </>
  );
};

export default PostSearchResults;
