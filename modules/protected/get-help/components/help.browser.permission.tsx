"use client";

import { cn } from "@/libs/utils";
import { HelpBrowserGuide } from "@/modules/protected/get-help/types/help.ui.type";
import { useState } from "react";

interface HelpBrowserPermissionProps {
    title: string;
    description: string;
    browsers: HelpBrowserGuide[];
}

const HelpBrowserPermission = ({
    title,
    description,
    browsers,
}: HelpBrowserPermissionProps) => {
    const [activeId, setActiveId] = useState(browsers[0]?.id ?? "");
    const active =
        browsers.find((browser) => browser.id === activeId) ?? browsers[0];

    if (!active) return null;

    return (
        <section className="border-bdc-primary bg-bgc-page mt-4 rounded-xl border p-5">
            <h3 className="text-text-contrast text-base font-semibold">
                {title}
            </h3>
            <p className="text-text-muted mt-1 text-sm leading-relaxed">
                {description}
            </p>

            <div
                role="tablist"
                aria-label={title}
                className="border-bdc-primary mt-5 flex flex-wrap gap-2 border-b pb-3"
            >
                {browsers.map((browser) => {
                    const selected = browser.id === active.id;
                    return (
                        <button
                            key={browser.id}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            aria-controls={`help-browser-panel-${browser.id}`}
                            onClick={() => setActiveId(browser.id)}
                            className={cn(
                                "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                                selected
                                    ? "border-bgc-highlight bg-bgc-highlight/15 text-bgc-highlight"
                                    : "border-bdc-primary text-text-muted hover:border-bgc-highlight/60 hover:text-bgc-highlight",
                            )}
                        >
                            {browser.name}
                        </button>
                    );
                })}
            </div>

            <ol
                id={`help-browser-panel-${active.id}`}
                role="tabpanel"
                className="mt-4 flex flex-col gap-y-3"
            >
                {active.steps.map((step, index) => (
                    <li key={step} className="flex gap-x-3">
                        <span className="bg-bgc-highlight/15 text-bgc-highlight flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums">
                            {index + 1}
                        </span>
                        <span className="text-text-contrast text-sm leading-relaxed">
                            {step}
                        </span>
                    </li>
                ))}
            </ol>
        </section>
    );
};

export default HelpBrowserPermission;
