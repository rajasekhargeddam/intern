import type { SearchTab } from "./SearchBar";

const TABS: { id: SearchTab; label: string }[] = [
  { id: "posts", label: "Posts" },
  { id: "people", label: "People" },
  { id: "tags", label: "#Tags" },
];

type SearchTabsProps = {
  activeTab: SearchTab;
  onChange: (tab: SearchTab) => void;
};

const SearchTabs = ({ activeTab, onChange }: SearchTabsProps) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = TABS.findIndex((tab) => tab.id === activeTab);
    if (currentIndex < 0) return;

    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (currentIndex + delta + TABS.length) % TABS.length;
      onChange(TABS[nextIndex].id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Search type"
      onKeyDown={onKeyDown}
      className="mt-3 flex gap-1 rounded-lg border border-slate-200 bg-slate-100 p-0.5"
    >
      {TABS.map(({ id, label }) => {
        const isActive = activeTab === id;

        return (
          <button
            key={id}
            id={`search-tab-${id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`search-panel-${id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(id)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition ${
              isActive
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default SearchTabs;
