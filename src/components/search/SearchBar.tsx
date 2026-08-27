import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineSearch } from "react-icons/hi";

import { fetchSearchSuggestions } from "../../services/search";
import {
  SEARCH_STALE_TIME,
  searchSuggestionsQueryKey,
} from "./searchQueryKeys";

export type SearchTab = "posts" | "people" | "tags";

const DEBOUNCE_MS = 400;

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onSuggestionSelect: (suggestion: string) => void;
};

const SearchBar = ({
  value,
  onChange,
  onSubmit,
  onSuggestionSelect,
}: SearchBarProps) => {
  const [debouncedQuery, setDebouncedQuery] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(value);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [value]);

  const trimmedDebouncedQuery = debouncedQuery.trim();
  const canFetchSuggestions = trimmedDebouncedQuery.length >= 2;

  const { data, isLoading, isError } = useQuery({
    queryKey: searchSuggestionsQueryKey(trimmedDebouncedQuery),
    queryFn: () => fetchSearchSuggestions(trimmedDebouncedQuery),
    enabled: canFetchSuggestions,
    staleTime: SEARCH_STALE_TIME,
    refetchOnWindowFocus: false,
  });

  const suggestions = data?.suggestions ?? [];

  const shouldShowDropdown =
    showSuggestions &&
    canFetchSuggestions &&
    !isError &&
    (isLoading || suggestions.length > 0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowSuggestions(false);
    onSubmit();
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionSelect(suggestion);
    setShowSuggestions(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex w-full flex-col gap-2 sm:flex-row"
    >
      <div className="relative min-w-0 flex-1">
        <label htmlFor="search-query" className="sr-only">
          Search posts, people, or hashtags
        </label>
        <HiOutlineSearch
          size={16}
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
        />
        <input
          id="search-query"
          type="search"
          value={value}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 150);
          }}
          placeholder="Search posts, people, or #tags"
          className="min-h-10 w-full rounded-lg border border-slate-200 bg-white py-2 pr-3 pl-9 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
        />

        {shouldShowDropdown && (
          <ul className="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-sm">
            {isLoading && (
              <li className="px-3 py-2 text-sm text-slate-500">Loading...</li>
            )}

            {!isLoading &&
              suggestions.map((suggestion) => (
                <li key={suggestion}>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        aria-label="Submit search"
        className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        <HiOutlineSearch size={16} aria-hidden />
        Search
      </button>
    </form>
  );
};

export default SearchBar;
