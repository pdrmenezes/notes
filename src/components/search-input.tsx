import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <form id="search-form" role="search" className="relative">
      <input
        name="q"
        id="q"
        className="w-full rounded-xs border-b border-neutral-500 bg-transparent p-1.5 text-sm hover:border-neutral-400 focus-within:border-neutral-400 focus:outline-none transition-colors duration-150"
        aria-label="Search files and folders"
        placeholder="Search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value ? (
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-neutral-500 hover:text-neutral-300 transition-colors duration-150"
          onClick={() => onChange("")}
        >
          <X className="size-3.5 text-neutral-500 hover:text-neutral-300 transition-colors duration-150" />
        </button>
      ) : (
        <Search className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-neutral-500" />
      )}
    </form>
  );
}
