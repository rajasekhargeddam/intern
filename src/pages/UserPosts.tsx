import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import UserPostsList from "../components/post/UserPostsList";
import FailedView from "../components/common/FailedView";
import UserPostsShimmer from "../shimmer/UserPostsShimmer";
import { fetchOneUserPosts, fetchUserPosts } from "../services/posts";
import useDeletePostMutation from "../hooks/useDeletePostMutation";
import { useScroll } from "../context/ScrollContext";
import { fetchLikedPosts, fetchSavedPosts } from "../services/profile";
import { notifyError, notifySuccess } from "../utils/toast";

type UserPostsProps = {
  id?: string;
  feedType?: "posts" | "liked-posts" | "saved-posts";
};

const UserPosts = ({ id, feedType = "posts" }: UserPostsProps) => {
  const { getScrollPosition, saveScrollPosition } = useScroll();

  useEffect(() => {
    window.scrollTo(0, getScrollPosition("feed"));

    return () => {
      saveScrollPosition("feed", window.scrollY);
    };
  }, []);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: id ? [feedType, id] : [feedType],

    queryFn: ({ pageParam }) => {
      if (id) {
        return fetchOneUserPosts(id, pageParam);
      } else if (feedType === "liked-posts") {
        return fetchLikedPosts({ pageParam });
      } else if (feedType === "saved-posts") {
        return fetchSavedPosts({ pageParam });
      } else {
        return fetchUserPosts({ pageParam });
      }
    },

    initialPageParam: 0,

    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
  });

  const userPosts =
    data?.pages.flatMap((page) => page.posts ?? []).filter(Boolean) ?? [];

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const deleteQueryKeys: (readonly unknown[])[] = [
    id ? [feedType, id] : [feedType],
    ["posts"],
    ...(id ? [["posts", id]] : []),
    ["liked-posts"],
    ["saved-posts"],
  ];

  const deletePostMutation = useDeletePostMutation(deleteQueryKeys);

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
      <UserPostsList posts={userPosts} onDeletePost={onDeletePost} />

      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && <UserPostsShimmer />}
    </>
  );
};

export default UserPosts;
