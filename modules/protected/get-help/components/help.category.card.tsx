"use client";

import { cn } from "@/libs/utils";
import {
    HELP_CATEGORY_ICONS,
    HELP_FALLBACK_ICON,
} from "@/modules/protected/get-help/constants/help.constant";
import { HelpCategory } from "@/modules/protected/get-help/types/help.ui.type";

interface HelpCategoryCardProps {
    category: HelpCategory;
    questionCountLabel: string;
    selected: boolean;
    onSelect: () => void;
}

const HelpCategoryCard = ({
    category,
    questionCountLabel,
    selected,
    onSelect,
}: HelpCategoryCardProps) => {
    const Icon = HELP_CATEGORY_ICONS[category.id] ?? HELP_FALLBACK_ICON;

    return (
        <button
            type="button"
            onClick={onSelect}
            aria-pressed={selected}
            className={cn(
                "bg-bgc-page flex h-full w-full cursor-pointer flex-col items-start gap-2 rounded-xl border p-5 text-left transition-all",
                selected
                    ? "border-bgc-highlight ring-bgc-highlight/40 -translate-y-0.5 shadow-md ring-2"
                    : "border-bdc-primary hover:border-bgc-highlight/60 hover:-translate-y-0.5 hover:shadow-sm",
            )}
        >
            <span className="bg-bgc-highlight/15 text-bgc-highlight flex h-10 w-10 items-center justify-center rounded-lg">
                <Icon className="h-5 w-5" />
            </span>

            <span className="text-text-contrast text-[15px] font-semibold">
                {category.title}
            </span>

            <span className="text-text-muted text-xs leading-relaxed">
                {category.description}
            </span>

            <span className="text-bgc-highlight mt-auto pt-2 text-xs font-medium">
                {questionCountLabel}
            </span>
        </button>
    );
};

export default HelpCategoryCard;
