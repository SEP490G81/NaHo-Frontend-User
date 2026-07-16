"use client";
import React, { useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useMarugotoStore } from "@/store/marugotoStore";
import type { Vocab } from "@/data/marugoto/types";
import type { CanDoBlock, PathNode } from "../hooks/use.cando.nodes";
import { splitCanDoByQuestion } from "../utils/cando.split";
import CanDoNodeColumn from "./cando.node.column";
import VocabDialog from "./vocab.dialog";
import QuestionPreviewDrawer from "./question.preview.drawer";

const TITLE_KEY = {
    vocab: "node.vocabTitle",
    question: "node.speakingTitle",
    test: "node.testTitle",
    chest: "node.chestTitle",
} as const;

interface VocabView {
    title: string;
    vocab: Vocab[];
    grammar: string[];
}

interface Props {
    block: CanDoBlock;
    bookId: string;
    lessonId: string;
    showFurigana: boolean;
}

export function CanDoPath({ block, bookId, lessonId, showFurigana }: Props) {
    const t = useTranslations("marugoto");
    const markNodeDone = useMarugotoStore((s) => s.markNodeDone);
    const claimChest = useMarugotoStore((s) => s.claimChest);
    const [vocabView, setVocabView] = useState<VocabView | null>(null);
    const [activeQ, setActiveQ] = useState<PathNode | null>(null);

    const preps = useMemo(() => splitCanDoByQuestion(block.cando), [block.cando]);
    const activePrep = activeQ?.index ? preps[activeQ.index - 1] : undefined;

    const nodeCaption = (n: PathNode) =>
        n.kind === "question"
            ? t("node.speakingCaption", { index: n.index ?? 0 })
            : n.kind === "vocab"
              ? t("node.vocabForCaption", { index: n.index ?? 0 })
              : t("node.testCaption");

    const openCandoVocab = () =>
        setVocabView({
            title: t("vocab.titleCando", { index: block.cando.orderInLesson }),
            vocab: block.cando.vocabulary,
            grammar: block.cando.grammar,
        });

    const handleClick = (n: PathNode) => {
        if (n.status === "locked") {
            toast.info(t("lockedToastDesc"));
            return;
        }
        if (n.kind === "question" && n.question) {
            setActiveQ(n);
            return;
        }
        if (n.kind === "vocab") {
            markNodeDone(n.id);
            const prep = preps[(n.index ?? 1) - 1];
            setVocabView({
                title: t("vocab.titleQuestion", { index: n.index ?? 0 }),
                vocab: prep?.vocab ?? [],
                grammar: prep?.grammar ?? [],
            });
            return;
        }
        if (n.kind === "chest") {
            const reward = n.reward ?? 0;
            const claimed = claimChest(n.id, reward);
            if (claimed) toast.success(t("node.chestClaimed", { reward }));
            else toast.info(t("node.chestAlready"));
            return;
        }
        // test node (mock): tạm đánh dấu hoàn thành
        markNodeDone(n.id);
        toast.success(t("node.testTitle"));
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-bgc-highlight text-[11px] font-bold tracking-wide uppercase">
                        {t("path.routeTitle")}
                    </p>
                    <p className="text-text-muted text-sm">{t("path.routeSubtitle")}</p>
                </div>
                <button
                    type="button"
                    onClick={openCandoVocab}
                    aria-label={t("path.viewVocab")}
                    className="border-bgc-highlight/40 bg-bgc-highlight/10 text-bgc-highlight hover:bg-bgc-highlight hover:text-white inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all"
                >
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden sm:inline">{t("path.viewVocab")}</span>
                    <span className="sm:hidden">{t("path.vocabShort")}</span>
                </button>
            </div>

            <CanDoNodeColumn
                nodes={block.nodes}
                title={(n) => t(TITLE_KEY[n.kind])}
                caption={nodeCaption}
                onNodeClick={handleClick}
            />

            <VocabDialog
                open={!!vocabView}
                onOpenChange={(o) => !o && setVocabView(null)}
                title={vocabView?.title ?? ""}
                vocab={vocabView?.vocab ?? []}
                grammar={vocabView?.grammar ?? []}
                showFurigana={showFurigana}
            />

            <QuestionPreviewDrawer
                open={!!activeQ}
                onOpenChange={(o) => !o && setActiveQ(null)}
                question={activeQ?.question ?? null}
                grammar={activePrep?.grammar ?? []}
                context={block.cando.viDesc}
                bestScore={activeQ?.bestScore ?? 0}
                href={
                    activeQ?.question
                        ? `/books/${bookId}/${lessonId}/${activeQ.question.id}`
                        : "/books"
                }
                showFurigana={showFurigana}
            />
        </div>
    );
}

export default CanDoPath;
