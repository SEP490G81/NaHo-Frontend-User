"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMarugotoStore } from "@/store/marugotoStore";
import {
    getLearningPathNodeDetail,
    openChest,
} from "@/services/client/book.service";
import { getUserLearningProgress } from "@/modules/protected/leaderboard/services/leaderboard.service";
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
    const queryClient = useQueryClient();
    const markNodeDone = useMarugotoStore((s) => s.markNodeDone);
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
    const closeDialog = () => setActive(null);

    // Cần userId để mở rương (BE cộng L-Point thật rồi refetch tiến độ).
    const { data: progress } = useQuery({
        queryKey: ["user-learning-progress"],
        queryFn: getUserLearningProgress,
    });

    const openMutation = useMutation({
        mutationFn: (vars: {
            chestId: number;
            userId: number;
            nodeId: string;
            reward: number;
        }) => openChest(vars.chestId, vars.userId),
        onSuccess: (_data, vars) => {
            markNodeDone(vars.nodeId); // đánh dấu đã mở (UI)
            queryClient.invalidateQueries({
                queryKey: ["user-learning-progress"],
            });
            toast.success(t("node.chestClaimed", { reward: vars.reward }));
            closeDialog();
        },
        onError: () => toast.error(t("node.chestFailed")),
    });

    const nodeTitle = (n: PathNode) => t(TITLE_KEY[n.kind]);
    const nodeCaption = (n: PathNode) =>
        n.kind === "question"
            ? t("node.speakingCaption", { index: n.index ?? 0 })
            : t("node.vocabCaption");

    const handleClick = (block: CanDoBlock) => (n: PathNode) => {
        if (n.kind === "vocab") markNodeDone(n.id);
        setActive({ node: n, block });
    };

    // Vào thẳng sandbox: nodeId để nạp đúng đề bài; book+topic để tô màu & quay lại.
    const practiceHref = active?.node.speakingQuestionId
        ? `/sandbox/${active.node.speakingQuestionId}?node=${active.node.nodeId}&book=${bookId}&topic=${topicId}`
        : "/books";

    const claimActiveChest = () => {
        if (!active || !detail?.chest) return;
        if (completedNodes.includes(active.node.id)) {
            toast.info(t("node.chestAlready"));
            return;
        }
        const userId = progress?.leaderboardUser?.id;
        if (!userId) {
            toast.error(t("node.chestFailed"));
            return;
        }
        openMutation.mutate({
            chestId: detail.chest.id,
            userId,
            nodeId: active.node.id,
            reward: detail.chest.point,
        });
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
                loading={nodeQ.isLoading || openMutation.isPending}
                claimed={!!active && completedNodes.includes(active.node.id)}
                onClaim={claimActiveChest}
            />
        </div>
    );
}

export default TopicRoadmapBody;
