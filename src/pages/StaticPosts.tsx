import { useState, useEffect } from "react";
import CardList from "../components/post/CardList";
import type { Post } from "../types";
import { POSTS_PER_PAGE, api_status } from "../constants";
import { fetchPosts } from "../services/posts";
import ShimmerPosts from "../shimmer/ShimmerPosts";
import NoPostsView from "../components/common/NoPostsView";
import FailedView from "../components/common/FailedView";

const StaticPosts = () => {
  const [apiStatus, setApiStatus] = useState(api_status.loading);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    const fetchCardsData = async (): Promise<void> => {
      setApiStatus(api_status.loading);
      try {
        const { posts: fetchedPosts, hasNextPage } = await fetchPosts(searchQuery, currentPage, POSTS_PER_PAGE);
        setHasNextPage(hasNextPage);
        setPosts(fetchedPosts);
        setApiStatus(api_status.success);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPosts([]);
        setHasNextPage(false);
        setApiStatus(api_status.failed);
      }
    };

    fetchCardsData();
  }, [searchQuery, currentPage]);

  const onClickSearch = () => {
    const trimmedSearchText = searchText.trim();
    setSearchQuery(trimmedSearchText);
    setCurrentPage(1);
    if (maxPage > 1) {
      setMaxPage(1);
    }
  };

  const onClickNextPage = () => {
    if (maxPage < currentPage + 1) {
      setMaxPage((value) => value + 1);
    }
    setCurrentPage((value) => value + 1);
  };

  const postsView = () => {
    switch (apiStatus) {
      case api_status.loading:
        return <ShimmerPosts count={POSTS_PER_PAGE} />;
      case api_status.success:
        return posts.length > 0 ? <CardList posts={posts} /> : <NoPostsView />;
      case api_status.failed:
        return <FailedView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-semibold text-slate-900">
          Discover Posts
        </h1>

        <p className="mb-3 text-sm text-slate-500">
          Search and explore posts effortlessly
        </p>
        <div className="flex w-full max-w-2xl flex-col gap-2 sm:flex-row">
          <input
            className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
            type="search"
            placeholder="Search posts..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={onClickSearch}
            disabled={apiStatus === api_status.loading}
            className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>

      {postsView()}

      <div className="flex flex-wrap justify-center items-center gap-2 p-2 sm:gap-3 sm:p-4">
        {currentPage > 1 && (
          <button
            className="bg-indigo-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded hover:bg-indigo-700 transition-all"
            onClick={() => {
              setCurrentPage((value) => value - 1);
            }}
          >
            prev
          </button>
        )}

        <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
          {Array.from({ length: maxPage }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                if (currentPage !== index + 1) {
                  setCurrentPage(index + 1);
                }
              }}
              disabled={currentPage === index + 1}
              className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-base rounded-lg font-medium shadow-md border border-slate-300 hover:shadow-blue-400 transition-all ${currentPage === index + 1 ? "bg-indigo-600 text-white shadow-md" : ""}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {hasNextPage && (
          <button
            className="bg-indigo-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded hover:bg-indigo-700 transition-all"
            onClick={onClickNextPage}
          >
            next
          </button>
        )}
      </div>
    </div>
  );
};

export default StaticPosts;
