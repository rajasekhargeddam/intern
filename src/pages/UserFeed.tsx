import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import UserFeedList from "../components/user/UserFeedList";
import FailedView from "../components/common/FailedView";
import UserFeedShimmer from "../shimmer/UserFeedShimmer";
import { fetchUserFeed } from "../services/users";
import { useScroll } from "../context/ScrollContext";

const UserFeed = () => {
  const { getScrollPosition, saveScrollPosition } = useScroll();

  useEffect(() => {
    window.scrollTo(0, getScrollPosition("user-feed"));

    return () => {
      saveScrollPosition("user-feed", window.scrollY);
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
    queryKey: ["user-feed"],
    queryFn: ({ pageParam }) => fetchUserFeed({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
  });

  const users =
    data?.pages.flatMap((page) => page.users ?? []).filter(Boolean) ?? [];

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

  if (isLoading) {
    return <UserFeedShimmer />;
  }

  if (isError) {
    return <FailedView />;
  }

  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-4 pt-4 sm:px-6">
        <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
          Discover People
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Find and connect with users you haven&apos;t connected with yet.
        </p>
      </div>

      <UserFeedList users={users} />

      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && <UserFeedShimmer />}
    </>
  );
};

export default UserFeed;
