"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function useSettingHighlight() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const highlightId =
            searchParams.get("highlight") ||
            window.location.hash.replace("#", "");
        if (!highlightId) return;

        const timer = setTimeout(() => {
            const el =
                document.getElementById(highlightId) ||
                document.querySelector(`[data-setting-id="${highlightId}"]`);

            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });

                // Use ring-inset to prevent right/left border clipping on small screens
                el.classList.add(
                    "ring-2",
                    "ring-inset",
                    "ring-pink-500",
                    "shadow-md",
                    "transition-all",
                    "duration-500",
                );

                const removeTimer = setTimeout(() => {
                    el.classList.remove(
                        "ring-2",
                        "ring-inset",
                        "ring-pink-500",
                        "shadow-md",
                    );
                }, 3500);

                return () => clearTimeout(removeTimer);
            }
        }, 150);

        return () => clearTimeout(timer);
    }, [searchParams]);
}
