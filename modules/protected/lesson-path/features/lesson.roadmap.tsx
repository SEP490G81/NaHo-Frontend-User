"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { useMarugotoStore } from "@/store/marugotoStore";
import { getLearningPathNodeDetail } from "@/services/client/book.service";
import type { CanDoBlock, PathNode } from "../hooks/use.cando.nodes";
import CanDoNodeColumn from "../components/cando.node.column";
import CanDoSectionHeader from "../components/cando.section.header";
import VocabDialog from "../components/vocab.dialog";
import QuestionPreviewDrawer from "../components/question.preview.drawer";
import ChestDialog from "../components/chest.dialog";

const TITLE_KEY = {
    vocab: "node.vocabTitle",
    question: "node.speakingTitle",
    chest: "node.chestTitle",
} as const;

interface Props {
    blocks: CanDoBlock[];
    accent: string;
    showFurigana: boolean;
    currentNodeId?: string;
}

/** Lộ trình luyện tập liền mạch cho cả bài học: mọi Can-do hiển thị sẵn. */
export function LessonRoadmap({
    blocks,
    accent,
    showFurigana,
    currentNodeId,
}: Props) {
    const t = useTranslations("marugoto");
    const markNodeDone = useMarugotoStore((s) => s.markNodeDone);
    const claimChest = useMarugotoStore((s) => s.claimChest);
    const completedNodes = useMarugotoStore((s) => s.completedNodes);
    const [active, setActive] = useState<{
        node: PathNode;
        block: CanDoBlock;
    } | null>(null);

    const nodeQ = useQuery({
        queryKey: ["learning-node", active?.node.nodeId],
        queryFn: () => getLearningPathNodeDetail(active!.node.nodeId),
        enabled: !!active,
    });
    const detail = nodeQ.data;

    const nodeTitle = (n: PathNode) => t(TITLE_KEY[n.kind]);
    const nodeCaption = (n: PathNode) =>
        n.kind === "question"
            ? t("node.speakingCaption", { index: n.index ?? 0 })
            : t("node.vocabCaption");

    const handleClick = (block: CanDoBlock) => (n: PathNode) => {
        if (n.status === "locked") {
            toast.info(t("lockedToastDesc"));
            return;
        }
        if (n.kind === "vocab") markNodeDone(n.id);
        setActive({ node: n, block });
    };

    const closeDialog = () => setActive(null);
    // Vào thẳng sandbox với câu hỏi này; truyền nodeId để sandbox nạp đúng đề bài.
    const practiceHref = active?.node.speakingQuestionId
        ? `/sandbox/${active.node.speakingQuestionId}?node=${active.node.nodeId}`
        : "/books";

    const claimActiveChest = () => {
        if (!active || !detail?.chest) return;
        const claimed = claimChest(active.node.id, detail.chest.point);
        if (claimed)
            toast.success(
                t("node.chestClaimed", { reward: detail.chest.point }),
            );
        else toast.info(t("node.chestAlready"));
    };

    return (
        <div className="space-y-4">
            {blocks.map((block, i) => {
                // Lệch sóng cộng dồn để đường đi nối liền mạch giữa các Can-do.
                const offset = blocks
                    .slice(0, i)
                    .reduce((s, b) => s + b.nodes.length, 0);
                return (
                    <section key={block.cando.id} className="space-y-1">
                        <CanDoSectionHeader
                            block={block}
                            accent={accent}
                            showFurigana={showFurigana}
                        />
                        <CanDoNodeColumn
                            nodes={block.nodes}
                            title={nodeTitle}
                            caption={nodeCaption}
                            onNodeClick={handleClick(block)}
                            currentNodeId={currentNodeId}
                            waveOffset={offset}
                        />
                    </section>
                );
            })}

            <VocabDialog
                open={active?.node.kind === "vocab"}
                onOpenChange={(o) => !o && closeDialog()}
                title={t("vocab.titleCando", {
                    index: active?.block.cando.orderInLesson ?? 0,
                })}
                vocab={detail?.vocabularyQuestion?.vocabularies ?? []}
                loading={nodeQ.isLoading}
                showFurigana={showFurigana}
            />

            <QuestionPreviewDrawer
                open={active?.node.kind === "question"}
                onOpenChange={(o) => !o && closeDialog()}
                question={detail?.speakingQuestion ?? null}
                loading={nodeQ.isLoading}
                context={active?.block.cando.viDesc ?? ""}
                bestScore={active?.node.bestScore ?? 0}
                href={practiceHref}
                showFurigana={showFurigana}
            />

            <ChestDialog
                open={active?.node.kind === "chest"}
                onOpenChange={(o) => !o && closeDialog()}
                chest={detail?.chest ?? null}
                loading={nodeQ.isLoading}
                claimed={!!active && completedNodes.includes(active.node.id)}
                onClaim={claimActiveChest}
            />
        </div>
    );
}

export default LessonRoadmap;
