"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { useMarugotoStore } from "@/store/marugotoStore";
import { getLearningPathNodeDetail } from "@/services/client/book.service";
import type {
    CanDoBlock,
    LessonGroup,
    PathNode,
} from "../hooks/use.cando.nodes";
import LessonBand from "../components/lesson.band";
import CanDoSectionHeader from "../components/cando.section.header";
import NodeFlow from "../components/node.flow";
import VocabDialog from "../components/vocab.dialog";
import QuestionPreviewDrawer from "../components/question.preview.drawer";
import ChestDialog from "../components/chest.dialog";

const TITLE_KEY = {
    vocab: "node.vocabTitle",
    question: "node.speakingTitle",
    chest: "node.chestTitle",
} as const;

interface Props {
    groups: LessonGroup[];
    bookId: string;
    topicId: string;
    accent: string;
    showFurigana: boolean;
    currentNodeId?: string;
}

/** Thân lộ trình theo chủ đề: mọi bài học · Can-do · node, xếp ngang tự xuống dòng. */
export function TopicRoadmapBody({
    groups,
    bookId,
    topicId,
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
        if (n.kind === "vocab") markNodeDone(n.id);
        setActive({ node: n, block });
    };

    const closeDialog = () => setActive(null);
    // Vào thẳng sandbox: nodeId để nạp đúng đề bài; book+topic để tô màu & quay lại.
    const practiceHref = active?.node.speakingQuestionId
        ? `/sandbox/${active.node.speakingQuestionId}?node=${active.node.nodeId}&book=${bookId}&topic=${topicId}`
        : "/books";

    const claimActiveChest = () => {
        if (!active || !detail?.chest) return;
        const claimed = claimChest(active.node.id, detail.chest.point);
        if (claimed)
            toast.success(t("node.chestClaimed", { reward: detail.chest.point }));
        else toast.info(t("node.chestAlready"));
    };

    return (
        <div className="space-y-3">
            {groups.map((group) => (
                <section key={group.lesson.id} className="space-y-3">
                    <LessonBand
                        lesson={group.lesson}
                        accent={accent}
                        showFurigana={showFurigana}
                    />
                    {group.blocks.map((block) => (
                        <div key={block.cando.id} className="space-y-1">
                            <CanDoSectionHeader
                                block={block}
                                accent={accent}
                                showFurigana={showFurigana}
                            />
                            <NodeFlow
                                nodes={block.nodes}
                                title={nodeTitle}
                                caption={nodeCaption}
                                onNodeClick={handleClick(block)}
                                currentNodeId={currentNodeId}
                            />
                        </div>
                    ))}
                </section>
            ))}

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

export default TopicRoadmapBody;
