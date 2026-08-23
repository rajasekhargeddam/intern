import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import SearchBar, { type SearchTab } from "../components/search/SearchBar";
import SearchTabs from "../components/search/SearchTabs";
import PostSearchResults from "../components/search/PostSearchResults";
import PeopleSearchResults from "../components/search/PeopleSearchResults";
import TagSearchResults from "../components/search/TagSearchResults";

const SEARCH_TABS: SearchTab[] = ["posts", "people", "tags"];

const parseTab = (value: string | null): SearchTab =>
  SEARCH_TABS.includes(value as SearchTab) ? (value as SearchTab) : "posts";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("q")?.trim() ?? "";
  const activeTab = parseTab(searchParams.get("tab"));
  const selectedTag = searchParams.get("tag");

  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const setParams = ({
    q = searchQuery,
    tab = activeTab,
    tag = selectedTag,
  }: {
    q?: string;
    tab?: SearchTab;
    tag?: string | null;
  }) => {
    const next = new URLSearchParams();

    if (q) {
      next.set("q", q);
    }

    next.set("tab", tab);

    if (tab === "tags" && tag) {
      next.set("tag", tag);
    }

    setSearchParams(next);
  };

  const submitSearch = () => {
    const nextQuery = searchInput.trim();
    setParams({ q: nextQuery, tag: null });
  };

  const changeTab = (tab: SearchTab) => {
    setParams({ tab, tag: tab === "tags" ? selectedTag : null });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:w-3/4 sm:px-6 lg:w-3/5">
      <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
        Search
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Search posts, people, and hashtags.
      </p>

      <div className="mt-5">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSubmit={submitSearch}
        />
        <SearchTabs activeTab={activeTab} onChange={changeTab} />
      </div>

      {!searchQuery ? (
        <p className="mt-10 text-center text-sm text-slate-500">
          Type a query and press Enter or Search. Requests are not sent until
          you submit.
        </p>
      ) : (
        <div className="mt-2">
          {activeTab === "posts" && (
            <div
              id="search-panel-posts"
              role="tabpanel"
              aria-labelledby="search-tab-posts"
              className="-mx-4 pb-8 sm:-mx-6"
            >
              <PostSearchResults searchQuery={searchQuery} />
            </div>
          )}

          {activeTab === "people" && (
            <div
              id="search-panel-people"
              role="tabpanel"
              aria-labelledby="search-tab-people"
              className="-mx-4 pb-8 sm:-mx-6"
            >
              <PeopleSearchResults searchQuery={searchQuery} />
            </div>
          )}

          {activeTab === "tags" && (
            <div
              id="search-panel-tags"
              role="tabpanel"
              aria-labelledby="search-tab-tags"
              className="-mx-4 pb-8 sm:-mx-6"
            >
              <TagSearchResults
                searchQuery={searchQuery}
                selectedTag={selectedTag}
                onSelectTag={(tag) => setParams({ tag })}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
