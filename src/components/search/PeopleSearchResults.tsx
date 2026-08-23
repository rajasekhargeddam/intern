import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import UserFeedList from "../user/UserFeedList";
import FailedView from "../common/FailedView";
import UserFeedShimmer from "../../shimmer/UserFeedShimmer";
import { fetchSearchUsers } from "../../services/search";
import {
  SEARCH_STALE_TIME,
  searchUsersQueryKey,
} from "./searchQueryKeys";

type PeopleSearchResultsProps = {
  searchQuery: string;
};

const PeopleSearchResults = ({ searchQuery }: PeopleSearchResultsProps) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: searchUsersQueryKey(searchQuery),
    queryFn: ({ pageParam }) =>
      fetchSearchUsers({ query: searchQuery, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
    enabled: Boolean(searchQuery),
    staleTime: SEARCH_STALE_TIME,
    refetchOnWindowFocus: false,
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
    return <FailedView message="Failed to load people" />;
  }

  return (
    <>
      <UserFeedList
        users={users}
        invalidateQueryKeys={[
          searchUsersQueryKey(searchQuery),
          ["user-feed"],
        ]}
      />

      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && <UserFeedShimmer />}
    </>
  );
};

export default PeopleSearchResults;
