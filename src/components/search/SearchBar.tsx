export type SearchTab = "posts" | "people" | "tags";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const SearchBar = ({ value, onChange, onSubmit }: SearchBarProps) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex w-full flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="search-query" className="sr-only">
        Search posts, people, or hashtags
      </label>
      <input
        id="search-query"
        type="search"
        value={value}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search posts, people, or #tags"
        className="min-h-10 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
      />
      <button
        type="submit"
        aria-label="Submit search"
        className="h-10 shrink-0 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
