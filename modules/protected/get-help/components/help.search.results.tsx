"use client";

import ContainerBox from "@/components/ui/container.box";
import {
    HelpResultKind,
    HelpSearchResult,
} from "@/modules/protected/get-help/types/help.ui.type";
import { useReportStore } from "@/store/reportStore";
import { ArrowRight, SearchX } from "lucide-react";
import { useTranslations } from "next-intl";

interface HelpSearchResultsProps {
    query: string;
    results: HelpSearchResult[];
    onSelect: (result: HelpSearchResult) => void;
}

const GROUP_ORDER: HelpResultKind[] = ["guide", "faq", "troubleshooting"];

const GROUP_LABEL_KEYS: Record<HelpResultKind, string> = {
    guide: "groupGuide",
    faq: "groupFaq",
    troubleshooting: "groupTroubleshooting",
};

const HelpSearchResults = ({
    query,
    results,
    onSelect,
}: HelpSearchResultsProps) => {
    const t = useTranslations("help.search");
    const openReportModal = useReportStore((state) => state.openModal);

    if (results.length === 0) {
        return (
            <ContainerBox as="section" className="py-12 text-center">
                <SearchX className="text-text-muted mx-auto h-10 w-10" />
                <h2 className="text-text-contrast mt-4 text-lg font-bold">
                    {t("emptyTitle", { query })}
                </h2>
                <p className="text-text-muted mx-auto mt-2 max-w-md text-sm leading-relaxed">
                    {t("emptyDescription")}
                </p>
                <button
                    type="button"
                    onClick={() => openReportModal("SYSTEM")}
                    className="bg-bgc-highlight text-text-pure mt-6 cursor-pointer rounded-lg px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-90"
                >
                    {t("emptyAction")}
                </button>
            </ContainerBox>
        );
    }

    return (
        <ContainerBox as="section" aria-live="polite">
            <h2 className="text-text-contrast text-lg font-bold md:text-xl">
                {t("resultsTitle", { count: results.length, query })}
            </h2>

            <div className="mt-5 flex flex-col gap-y-6">
                {GROUP_ORDER.map((kind) => {
                    const group = results.filter(
                        (result) => result.kind === kind,
                    );

                    if (group.length === 0) return null;

                    return (
                        <div key={kind}>
                            <h3 className="text-text-muted text-xs font-semibold tracking-wide uppercase">
                                {t(
                                    GROUP_LABEL_KEYS[kind] as Parameters<
                                        typeof t
                                    >[0],
                                )}
                            </h3>

                            <ul className="mt-3 flex flex-col gap-y-2">
                                {group.map((result) => (
                                    <li key={`${result.kind}-${result.id}`}>
                                        <button
                                            type="button"
                                            onClick={() => onSelect(result)}
                                            className="border-bdc-primary bg-bgc-page hover:border-bgc-highlight/60 flex w-full cursor-pointer items-start justify-between gap-x-4 rounded-xl border px-5 py-4 text-left transition-colors"
                                        >
                                            <span className="min-w-0">
                                                <span className="text-text-contrast block text-[15px] font-semibold">
                                                    {result.title}
                                                </span>
                                                <span className="text-text-muted mt-1 line-clamp-2 block text-sm leading-relaxed">
                                                    {result.excerpt}
                                                </span>
                                            </span>
                                            <ArrowRight className="text-text-muted mt-1 h-4 w-4 shrink-0" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </ContainerBox>
    );
};

export default HelpSearchResults;
