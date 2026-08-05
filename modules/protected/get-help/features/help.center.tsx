"use client";

import ContainerBox from "@/components/ui/container.box";
import HelpBrowserPermission from "@/modules/protected/get-help/components/help.browser.permission";
import HelpCategoryCard from "@/modules/protected/get-help/components/help.category.card";
import HelpContactPanel from "@/modules/protected/get-help/components/help.contact.panel";
import HelpFaqAccordionItem from "@/modules/protected/get-help/components/help.faq.item";
import HelpGuideCard from "@/modules/protected/get-help/components/help.guide.card";
import HelpSearchBar from "@/modules/protected/get-help/components/help.search.bar";
import HelpSearchResults from "@/modules/protected/get-help/components/help.search.results";
import HelpTroubleshootingCard from "@/modules/protected/get-help/components/help.troubleshooting.card";
import {
    HELP_ALL_CATEGORY,
    HELP_FAQ_SECTION_ID,
} from "@/modules/protected/get-help/constants/help.constant";
import {
    HelpContent,
    HelpSearchResult,
} from "@/modules/protected/get-help/types/help.ui.type";
import {
    buildHelpSearchIndex,
    countQuestionsByCategory,
    searchHelp,
} from "@/modules/protected/get-help/utils/help.search";
import { cn } from "@/libs/utils";
import { LifeBuoy } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { flushSync } from "react-dom";

/** Anchor tương ứng với từng loại kết quả tìm kiếm trên trang. */
const ANCHOR_PREFIX: Record<HelpSearchResult["kind"], string> = {
    guide: "help-guide",
    faq: "help-faq",
    troubleshooting: "help-troubleshooting",
};

const chipClass = (active: boolean) =>
    cn(
        "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        active
            ? "border-bgc-highlight bg-bgc-highlight/15 text-bgc-highlight"
            : "border-bdc-primary text-text-muted hover:border-bgc-highlight/60 hover:text-bgc-highlight",
    );

const HelpCenter = () => {
    const t = useTranslations("help");
    // đọc qua useMessages vì t() chỉ trả về chuỗi, ở đây cần cả mảng bài viết
    const content = useMessages().help as unknown as HelpContent;

    const [query, setQuery] = useState("");
    const [categoryId, setCategoryId] = useState(HELP_ALL_CATEGORY);
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);

    const searchIndex = useMemo(() => buildHelpSearchIndex(content), [content]);

    const trimmedQuery = query.trim();
    const isSearching = trimmedQuery.length > 0;

    const results = useMemo(
        () => (isSearching ? searchHelp(searchIndex, trimmedQuery) : []),
        [isSearching, searchIndex, trimmedQuery],
    );

    const visibleFaqItems = useMemo(
        () =>
            categoryId === HELP_ALL_CATEGORY
                ? content.faq.items
                : content.faq.items.filter(
                      (item) => item.categoryId === categoryId,
                  ),
        [categoryId, content.faq.items],
    );

    const scrollToAnchor = (anchorId: string) => {
        document
            .getElementById(anchorId)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleSelectCategory = (id: string) => {
        // flushSync để phần tử đích đã có trong DOM trước khi cuộn tới nó
        flushSync(() => {
            setCategoryId((current) =>
                current === id ? HELP_ALL_CATEGORY : id,
            );
            setOpenFaqId(null);
        });

        scrollToAnchor(HELP_FAQ_SECTION_ID);
    };

    // Chọn một kết quả sẽ thoát chế độ tìm kiếm rồi đưa người dùng tới đúng mục.
    const handleSelectResult = (result: HelpSearchResult) => {
        flushSync(() => {
            setQuery("");

            if (result.kind === "faq") {
                setCategoryId(HELP_ALL_CATEGORY);
                setOpenFaqId(result.id);
            }
        });

        scrollToAnchor(`${ANCHOR_PREFIX[result.kind]}-${result.id}`);
    };

    return (
        <div className="space-y-5">
            <ContainerBox className="flex flex-col items-center">
                <div className="bg-bgc-highlight/10 mb-3 flex h-14 w-14 items-center justify-center rounded-2xl">
                    <LifeBuoy className="text-bgc-highlight h-7 w-7" />
                </div>
                <h1 className="text-text-contrast text-xl font-bold md:text-2xl">
                    {t("hero.title")}
                </h1>
                <p className="text-text-muted mt-1 max-w-2xl text-center text-sm">
                    {t("hero.subtitle")}
                </p>

                <div className="mt-5 w-full">
                    <HelpSearchBar
                        value={query}
                        onChange={setQuery}
                        placeholder={t("hero.searchPlaceholder")}
                        label={t("hero.searchLabel")}
                        clearLabel={t("search.clear")}
                        popularLabel={t("hero.popularLabel")}
                        popularQueries={content.hero.popularQueries}
                    />
                </div>
            </ContainerBox>

            {isSearching ? (
                <HelpSearchResults
                    query={trimmedQuery}
                    results={results}
                    onSelect={handleSelectResult}
                />
            ) : (
                <>
                    <ContainerBox>
                        <h2 className="text-text-contrast text-lg font-bold md:text-xl">
                            {t("categories.title")}
                        </h2>
                        <p className="text-text-muted mt-1 text-sm">
                            {t("categories.description")}
                        </p>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                            {content.categories.items.map((category) => (
                                <HelpCategoryCard
                                    key={category.id}
                                    category={category}
                                    questionCountLabel={t(
                                        "categories.questionCount",
                                        {
                                            count: countQuestionsByCategory(
                                                content,
                                                category.id,
                                            ),
                                        },
                                    )}
                                    selected={categoryId === category.id}
                                    onSelect={() =>
                                        handleSelectCategory(category.id)
                                    }
                                />
                            ))}
                        </div>
                    </ContainerBox>

                    <ContainerBox>
                        <h2 className="text-text-contrast text-lg font-bold md:text-xl">
                            {t("guides.title")}
                        </h2>
                        <p className="text-text-muted mt-1 text-sm">
                            {t("guides.description")}
                        </p>

                        <div className="mt-5 grid gap-4 lg:grid-cols-2">
                            {content.guides.items.map((guide) => (
                                <HelpGuideCard
                                    key={guide.id}
                                    guide={guide}
                                    stepLabel={(index) =>
                                        t("guides.stepLabel", { index })
                                    }
                                />
                            ))}
                        </div>
                    </ContainerBox>

                    <ContainerBox
                        id={HELP_FAQ_SECTION_ID}
                        className="scroll-mt-5"
                    >
                        <h2 className="text-text-contrast text-lg font-bold md:text-xl">
                            {t("faq.title")}
                        </h2>
                        <p className="text-text-muted mt-1 text-sm">
                            {t("faq.description")}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    handleSelectCategory(HELP_ALL_CATEGORY)
                                }
                                aria-pressed={categoryId === HELP_ALL_CATEGORY}
                                className={chipClass(
                                    categoryId === HELP_ALL_CATEGORY,
                                )}
                            >
                                {t("categories.all")}
                            </button>

                            {content.categories.items.map((category) => (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() =>
                                        handleSelectCategory(category.id)
                                    }
                                    aria-pressed={categoryId === category.id}
                                    className={chipClass(
                                        categoryId === category.id,
                                    )}
                                >
                                    {category.title}
                                </button>
                            ))}
                        </div>

                        {visibleFaqItems.length === 0 ? (
                            <p className="border-bdc-primary bg-bgc-page text-text-muted mt-5 rounded-xl border px-5 py-8 text-center text-sm">
                                {t("faq.emptyCategory")}
                            </p>
                        ) : (
                            <div className="mt-5 flex flex-col gap-y-3">
                                {visibleFaqItems.map((item) => (
                                    <HelpFaqAccordionItem
                                        key={item.id}
                                        item={item}
                                        open={openFaqId === item.id}
                                        onToggle={() =>
                                            setOpenFaqId((current) =>
                                                current === item.id
                                                    ? null
                                                    : item.id,
                                            )
                                        }
                                    />
                                ))}
                            </div>
                        )}
                    </ContainerBox>

                    <ContainerBox>
                        <h2 className="text-text-contrast text-lg font-bold md:text-xl">
                            {t("troubleshooting.title")}
                        </h2>
                        <p className="text-text-muted mt-1 text-sm">
                            {t("troubleshooting.description")}
                        </p>

                        <div className="mt-5 grid gap-4 lg:grid-cols-2">
                            {content.troubleshooting.items.map((item) => (
                                <HelpTroubleshootingCard
                                    key={item.id}
                                    item={item}
                                    symptomLabel={t(
                                        "troubleshooting.symptomLabel",
                                    )}
                                />
                            ))}
                        </div>

                        <HelpBrowserPermission
                            title={t("troubleshooting.browserTitle")}
                            description={t(
                                "troubleshooting.browserDescription",
                            )}
                            browsers={content.troubleshooting.browsers}
                        />
                    </ContainerBox>

                    <HelpContactPanel />
                </>
            )}
        </div>
    );
};

export default HelpCenter;
