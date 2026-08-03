"use client";
import { LegalTocItem } from "@/modules/public/legal/types/legal.ui.type";
import { useEffect, useState } from "react";

const LegalTableOfContents = ({
    title,
    items,
}: {
    title: string;
    items: LegalTocItem[];
}) => {
    const [activeId, setActiveId] = useState(items[0]?.id ?? "");

    useEffect(() => {
        const sections = items
            .map((item) => document.getElementById(item.id))
            .filter((element): element is HTMLElement => Boolean(element));

        if (sections.length === 0) return;

        // rootMargin cắt 65% phía dưới màn hình để mục đang nằm gần đỉnh được tính là active
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top - b.boundingClientRect.top,
                    );

                if (visible[0]) setActiveId(visible[0].target.id);
            },
            { rootMargin: "-80px 0px -65% 0px", threshold: 0 },
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [items]);

    return (
        <nav aria-label={title} className="lg:sticky lg:top-6 lg:h-fit">
            <h2 className="text-text-muted text-sm font-semibold tracking-wide uppercase">
                {title}
            </h2>
            <ol className="mt-4 flex flex-col gap-y-1">
                {items.map((item, index) => {
                    const isActive = item.id === activeId;
                    return (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                aria-current={isActive ? "true" : undefined}
                                className={`flex gap-x-2 border-l-2 py-1.5 pr-2 pl-3 text-[15px] leading-6 transition-colors ${
                                    isActive
                                        ? "text-text-highlight border-[var(--color-text-highlight)] font-semibold"
                                        : "border-bdc-primary text-text-muted hover:text-text-highlight"
                                }`}
                            >
                                <span className="tabular-nums">
                                    {index + 1}.
                                </span>
                                <span>{item.heading}</span>
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default LegalTableOfContents;
