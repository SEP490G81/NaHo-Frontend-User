"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { HelpFaqItem } from "@/modules/protected/get-help/types/help.ui.type";
import { ArrowRight, ChevronDown } from "lucide-react";

interface HelpFaqAccordionItemProps {
    item: HelpFaqItem;
    open: boolean;
    onToggle: () => void;
}

const HelpFaqAccordionItem = ({
    item,
    open,
    onToggle,
}: HelpFaqAccordionItemProps) => {
    const panelId = `help-faq-panel-${item.id}`;
    const buttonId = `help-faq-button-${item.id}`;

    return (
        <div
            id={`help-faq-${item.id}`}
            className={cn(
                "bg-bgc-page scroll-mt-5 rounded-xl border transition-colors",
                open ? "border-bgc-highlight/60" : "border-bdc-primary",
            )}
        >
            <h3>
                <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={onToggle}
                    className="text-text-contrast flex w-full cursor-pointer items-center justify-between gap-x-4 px-5 py-4 text-left text-[15px] font-semibold"
                >
                    {item.question}
                    <ChevronDown
                        className={cn(
                            "text-text-muted h-5 w-5 shrink-0 transition-transform",
                            open && "text-bgc-highlight rotate-180",
                        )}
                    />
                </button>
            </h3>

            {open && (
                <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="border-bdc-primary border-t px-5 pt-4 pb-5"
                >
                    {item.answer.map((paragraph) => (
                        <p
                            key={paragraph}
                            className="text-text-muted mb-3 text-sm leading-7 last:mb-0"
                        >
                            {paragraph}
                        </p>
                    ))}

                    {item.link && (
                        <Link
                            href={item.link.href}
                            className="text-bgc-highlight mt-3 inline-flex items-center gap-x-1.5 text-sm font-semibold hover:underline"
                        >
                            {item.link.label}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default HelpFaqAccordionItem;
