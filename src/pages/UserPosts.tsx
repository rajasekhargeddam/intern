import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import UserPostsList from "../components/post/UserPostsList";
import FailedView from "../components/common/FailedView";
import UserPostsShimmer from "../shimmer/UserPostsShimmer";
import {
  deletePost,
  fetchOneUserPosts,
  fetchUserPosts,
} from "../services/posts";
import { queryClient } from "../lib/queryClient";

type UserPostsProps = {
  id?: string;
};

const UserPosts = ({ id }: UserPostsProps) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: id ? ["posts", id] : ["posts"],

    queryFn: ({ pageParam }) =>
      id ? fetchOneUserPosts(id, pageParam) : fetchUserPosts({ pageParam }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
  });

  const userPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: id ? ["posts", id] : ["posts"],
      });
    },
  });

  const onDeletePost = (postId: string) => {
    deletePostMutation.mutate(postId);
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
