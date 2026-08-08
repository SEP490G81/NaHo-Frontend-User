"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMarugotoStore } from "@/store/marugotoStore";
import {
    completeVocabularyQuestion,
    getLearningPathNodeDetail,
    openChest,
} from "@/services/client/book.service";
import type {
    CanDoBlock,
    LessonGroup,
    PathNode,
} from "../hooks/use.cando.nodes";
import TopicSnakePath from "../components/topic.snake.path";
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

/** Thân lộ trình theo chủ đề: 3 cột trên Desktop (Mục lục | Lộ trình Zigzag | Tiến độ & Thưởng). */
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
    // Điểm thực nhận sau khi mở rương — hiển thị ngay trong dialog (không chỉ toast).
    const [earnedChest, setEarnedChest] = useState<number | null>(null);
    const closeDialog = () => {
        setActive(null);
        setEarnedChest(null);
    };

    const openMutation = useMutation({
        // BE nhận id NODE lộ trình (không phải chestId) và trả điểm ngẫu nhiên thực nhận.
        mutationFn: (vars: { nodeId: number; uiId: string }) =>
            openChest(vars.nodeId),
        onSuccess: (earned, vars) => {
            markNodeDone(vars.uiId); // đánh dấu đã mở (UI)
            setEarnedChest(Math.round(earned)); // reveal ngay trong dialog
            queryClient.invalidateQueries({
                queryKey: ["user-learning-progress"],
            });
        },
        onError: () => toast.error(t("node.chestFailed")),
    });

    // Hoàn thành node từ vựng → BE cộng điểm & đẩy mốc sang node kế (mở node sau).
    const vocabMutation = useMutation({
        mutationFn: (vars: { vqId: number; uiId: string }) =>
            completeVocabularyQuestion(vars.vqId),
        onSuccess: (_data, vars) => {
            markNodeDone(vars.uiId);
            queryClient.invalidateQueries({
                queryKey: ["user-learning-progress"],
            });
            toast.success(t("node.vocabDone"));
            closeDialog();
        },
        onError: () => toast.error(t("node.vocabFailed")),
    });

    const nodeTitle = (n: PathNode) => t(TITLE_KEY[n.kind]);
    const nodeCaption = (n: PathNode) =>
        n.kind === "question"
            ? t("node.speakingCaption", { index: n.index ?? 0 })
            : t("node.vocabCaption");

    const handleClick = (block: CanDoBlock) => (n: PathNode) => {
        if (n.status === "locked") {
            return;
        }
        setActive({ node: n, block });
    };

    // Bấm "Hoàn thành" ở phần từ vựng → gọi BE để đẩy mốc, mở node kế.
    const finishVocab = () => {
        if (!active) return;
        const vqId =
            active.node.vocabularyQuestionId ?? detail?.vocabularyQuestion?.id;
        if (!vqId) return;
        vocabMutation.mutate({ vqId, uiId: active.node.id });
    };
    // "Đã hoàn thành" bám trạng thái thật từ BE (GOI < mốc), không dùng cờ cục bộ.
    const vocabDone = active?.node.status === "completed";
    const chestClaimed = active?.node.status === "completed";

    // Vào thẳng sandbox: nodeId để nạp đúng đề bài; book+topic để tô màu & quay lại.
    const practiceHref = active?.node.speakingQuestionId
        ? `/sandbox/${active.node.speakingQuestionId}?node=${active.node.nodeId}&book=${bookId}&topic=${topicId}`
        : "/books";

    const claimActiveChest = () => {
        if (!active || !detail?.chest) return;
        if (chestClaimed) {
            toast.info(t("node.chestAlready"));
            return;
        }
        openMutation.mutate({
            nodeId: active.node.nodeId,
            uiId: active.node.id,
        });
    };

    return (
        <div className="relative z-20 flex flex-col items-center">
            <TopicSnakePath
                groups={groups}
                accent={accent}
                showFurigana={showFurigana}
                currentNodeId={currentNodeId}
                nodeTitle={nodeTitle}
                nodeCaption={nodeCaption}
                onNodeClick={(block, n) => handleClick(block)(n)}
            />

            <VocabDialog
                open={active?.node.kind === "vocab"}
                onOpenChange={(o) => !o && closeDialog()}
                title={t("vocab.titleCando", {
                    index: active?.block.cando.orderInLesson ?? 0,
                })}
                vocab={detail?.vocabularyQuestion?.vocabularies ?? []}
                loading={nodeQ.isLoading}
                showFurigana={showFurigana}
                onFinish={finishVocab}
                finishing={vocabMutation.isPending}
                finished={vocabDone}
                accent={accent}
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
                accent={accent}
            />

            <ChestDialog
                open={active?.node.kind === "chest"}
                onOpenChange={(o) => !o && closeDialog()}
                chest={detail?.chest ?? null}
                loading={nodeQ.isLoading || openMutation.isPending}
                claimed={chestClaimed}
                earned={earnedChest}
                onClaim={claimActiveChest}
                accent={accent}
            />
        </div>
    );
}

export default TopicRoadmapBody;
