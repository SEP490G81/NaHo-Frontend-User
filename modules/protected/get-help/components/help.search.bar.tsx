"use client";

import { Search, X } from "lucide-react";

interface HelpSearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    label: string;
    clearLabel: string;
    popularLabel: string;
    popularQueries: string[];
}

const HelpSearchBar = ({
    value,
    onChange,
    placeholder,
    label,
    clearLabel,
    popularLabel,
    popularQueries,
}: HelpSearchBarProps) => (
    <div className="mx-auto w-full max-w-2xl">
        <div className="border-bdc-primary bg-bgc-page focus-within:border-bgc-highlight focus-within:ring-bgc-highlight/30 flex items-center gap-3 rounded-full border px-5 py-3 transition-all focus-within:ring-2">
            <Search className="text-text-muted h-5 w-5 shrink-0" />
            <input
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                aria-label={label}
                className="text-text-contrast placeholder:text-text-muted min-w-0 flex-1 bg-transparent text-[15px] outline-none"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    aria-label={clearLabel}
                    className="text-text-muted hover:text-text-contrast hover:bg-hbgc-app cursor-pointer rounded-full p-1 transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-text-muted text-xs font-medium">
                {popularLabel}
            </span>
            {popularQueries.map((query) => (
                <button
                    key={query}
                    type="button"
                    onClick={() => onChange(query)}
                    className="border-bdc-primary bg-bgc-page text-text-muted hover:border-bgc-highlight/60 hover:text-bgc-highlight cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors"
                >
                    {query}
                </button>
            ))}
        </div>
    </div>
);

export default HelpSearchBar;
