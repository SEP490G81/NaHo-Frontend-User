"use client";
import React, { useMemo } from "react";
import { Mic } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { mapBook } from "@/data/marugoto/mapper";
import type { QuestionHints } from "@/data/mockHints";
import { useMarugotoStore } from "@/store/marugotoStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getBookDetail,
    getLearningPathNodeDetail,
} from "@/services/client/book.service";
import { submitSpeakingAnalysis } from "@/services/client/speaking.service";
import {
    getMySubscription,
    getTodayAiUsage,
} from "@/services/client/subscription.service";
import { SandboxProvider, useSandbox } from "../provider/sandbox.context";
import { getSandboxRules } from "../constants/sandbox.constant";
import SandboxStepper from "./sandbox.stepper";
import SandboxHeader from "./sandbox.header";
import SandboxQuestionBanner from "./sandbox.question.banner";
import SandboxStep1 from "./sandbox.step1";
import SandboxStep2 from "./sandbox.step2";
import SandboxStep3 from "./sandbox.step3";
import SandboxAnalyzingOverlay from "./sandbox.analyzing.overlay";
import { useRouter } from "@/i18n/navigation";

import { useFurigana } from "@/components/providers/app.toggle.furigana.provider";

const EMPTY_HINTS: QuestionHints = { vocab: [], structures: [] };
const DEFAULT_MAX_SECONDS = 60;

export function Sandbox() {
    // Gói đăng ký quyết định thời gian nói tối đa & quyền xem câu trả lời mẫu.
    const planQ = useQuery({
        queryKey: ["my-subscription"],
        queryFn: getMySubscription,
        staleTime: 5 * 60 * 1000,
    });
    const maxSeconds = Math.max(
        1,
        Math.round(planQ.data?.plan?.maxAnswerTimeSeconds ?? DEFAULT_MAX_SECONDS),
    );
    const sampleAnswerEnabled = planQ.data?.plan?.sampleAnswerEnabled ?? false;

    return (
        <SandboxProvider maxSeconds={maxSeconds}>
            <SandboxContent sampleAnswerEnabled={sampleAnswerEnabled} />
        </SandboxProvider>
    );
}

function SandboxContent({
    sampleAnswerEnabled,
}: {
    sampleAnswerEnabled: boolean;
}) {
    const t = useTranslations("sandbox");
    const params = useParams();
    const searchParams = useSearchParams();
    const { push } = useRouter();
    const queryClient = useQueryClient();
    const questionId = params?.questionId as string;
    const nodeId = searchParams.get("node");
    const bookParam = searchParams.get("book");
    const topicParam = searchParams.get("topic");

    const { showFurigana } = useFurigana();

    // Đề bài + từ vựng + ngữ pháp lấy THẬT từ learning-path-node detail.
    const nodeQ = useQuery({
        queryKey: ["sandbox-node", nodeId],
        queryFn: () => getLearningPathNodeDetail(nodeId!),
        enabled: !!nodeId,
    });
    const sq = nodeQ.data?.speakingQuestion;

    // Màu chủ đạo = màu quyển sách chứa câu hỏi.
    const bookQ = useQuery({
        queryKey: ["book", bookParam],
        queryFn: () => getBookDetail(bookParam!),
        enabled: !!bookParam,
    });
    const accent = bookQ.data
        ? (mapBook(bookQ.data).coverColor ?? "var(--color-bgc-highlight)")
        : "var(--color-bgc-highlight)";

    // Lượt chấm nói còn lại hôm nay = hạn mức gói − đã dùng (BE cùng công thức).
    const subQ = useQuery({
        queryKey: ["my-subscription"],
        queryFn: getMySubscription,
        staleTime: 5 * 60 * 1000,
    });
    const usageQ = useQuery({
        queryKey: ["ai-usage-today"],
        queryFn: getTodayAiUsage,
        staleTime: 60 * 1000,
    });
    const dailyLimit = subQ.data?.plan?.dailySpeakingQuestionEvaluationLimit;
    const remainingToday =
        dailyLimit != null
            ? Math.max(0, dailyLimit - (usageQ.data?.speakingEvaluationCount ?? 0))
            : null;

    const question = useMemo(() => {
        if (sq) {
            return {
                id: questionId,
                jp: sq.japaneseName,
                markup: sq.japaneseNameMarkup,
                vi: sq.description ?? "",
                viMarkup: sq.descriptionMarkup ?? undefined,
            };
        }
        // Chưa nạp được node → placeholder tối thiểu để vẫn ghi âm/gửi chấm được.
        return {
            id: questionId,
            jp: "録音して発音を分析しましょう",
            markup: undefined,
            vi: "",
            viMarkup: undefined,
        };
    }, [sq, questionId]);

    const hints = useMemo<QuestionHints>(() => {
        if (!sq) return EMPTY_HINTS;
        return {
            vocab: sq.vocabularies.map((v) => ({
                jp: v.japanese,
                furigana: v.reading ?? v.japanese,
                vi: v.vietnameseMeaningText ?? "",
            })),
            structures: sq.grammars.map((g) => ({
                jp: g.japanese,
                vi: g.vietnameseMeaningText ?? "",
            })),
        };
    }, [sq]);

    const sampleAnswer = useMemo(() => {
        if (!sq?.japaneseSampleAnswer?.trim()) return null;
        return {
            japanese: sq.japaneseSampleAnswer,
            japaneseMarkup: sq.japaneseSampleAnswerMarkup,
            vietnamese: sq.vietnameseSampleAnswer,
        };
    }, [sq]);

    const {
        step,
        setStep,
        micStatus,
        volume,
        recording,
        elapsed,
        maxSeconds,
        playing,
        setPlaying,
        analyzing,
        setAnalyzing,
        startMicTest,
        resetMicTest,
        toggleRecord,
        retrySpeaking,
        audioUrl,
    } = useSandbox();

    const mutation = useMutation({
        mutationFn: (vars: { audioBlob: Blob; durationSec: number }) =>
            submitSpeakingAnalysis({
                file: vars.audioBlob,
                speakingQuestionId: Number(questionId),
                durationSec: vars.durationSec,
            }),
        onSuccess: (result) => {
            setAnalyzing(false);
            // Ghi điểm cục bộ để mở khóa node kế trên lộ trình.
            useMarugotoStore
                .getState()
                .setQuestionScore(questionId, result.overallScore);
            // BE đã cộng L-Point/streak → làm mới tiến độ để header đúng.
            queryClient.invalidateQueries({
                queryKey: ["user-learning-progress"],
            });
            // Kèm ngữ cảnh để màn kết quả mở lại đúng sandbox câu này.
            const ctx = new URLSearchParams();
            if (nodeId) ctx.set("node", nodeId);
            if (bookParam) ctx.set("book", bookParam);
            if (topicParam) ctx.set("topic", topicParam);
            const qs = ctx.toString();
            push(
                `/speaking-history/${result.answerHistoryId}${qs ? `?${qs}` : ""}`,
            );
        },
        onError: (err) => {
            console.error("Lỗi phân tích giọng nói:", err);
            setAnalyzing(false);
            // Hiện message thật từ BE (hết lượt, node khoá, chấm thất bại…) thay
            // vì báo lỗi chung chung — dễ biết đúng nguyên nhân.
            toast.error(err instanceof Error ? err.message : t("analyzeFailed"));
        },
    });

    if (nodeId && nodeQ.isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-text-muted">Đang tải câu hỏi...</p>
            </div>
        );
    }

    const rules = getSandboxRules(t);
    // Quay lại đúng lộ trình chủ đề chứa câu hỏi (nếu vào từ lộ trình Marugoto).
    const backHref =
        bookParam && topicParam
            ? `/books/${bookParam}/topics/${topicParam}`
            : bookParam
              ? `/books/${bookParam}`
              : "/speaking-history";

    const handleAnalyze = async () => {
        if (!audioUrl) return;
        setAnalyzing(true);
        setPlaying(false);
        const durationSec = Math.max(elapsed, 1);
        try {
            const res = await fetch(audioUrl);
            const audioBlob = await res.blob();
            mutation.mutate({ audioBlob, durationSec });
        } catch (err) {
            console.error("Lỗi khi tải file ghi âm:", err);
            setAnalyzing(false);
        }
    };

    return (
        <div
            className="px-4 py-6 md:px-8"
            style={{ "--book-accent": accent } as React.CSSProperties}
        >
            <div className="mx-auto max-w-5xl space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <SandboxHeader backHref={backHref} accent={accent} />
                    {remainingToday != null && (
                        <span
                            className="border-bdc-primary bg-bgc-app inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
                            style={{
                                color: remainingToday > 0 ? accent : undefined,
                            }}
                        >
                            <Mic className="h-3.5 w-3.5" />
                            {t("dailyQuotaLeft", {
                                remaining: remainingToday,
                                limit: dailyLimit,
                            })}
                        </span>
                    )}
                </div>

                <SandboxQuestionBanner
                    jp={question.jp}
                    markup={question.markup}
                    vi={question.vi}
                    viMarkup={question.viMarkup}
                    accent={accent}
                    showFurigana={showFurigana}
                />

                <SandboxStepper step={step} accent={accent} />

                {step === 1 && (
                    <SandboxStep1
                        rules={rules}
                        volume={volume}
                        micStatus={micStatus}
                        startMicTest={startMicTest}
                        resetMicTest={resetMicTest}
                        setStep={setStep}
                        accent={accent}
                    />
                )}

                {step === 2 && (
                    <SandboxStep2
                        recording={recording}
                        elapsed={elapsed}
                        maxSeconds={maxSeconds}
                        toggleRecord={toggleRecord}
                        hints={hints}
                        showFurigana={showFurigana}
                        accent={accent}
                        sampleAnswer={sampleAnswer}
                        sampleAnswerEnabled={sampleAnswerEnabled}
                    />
                )}

                {step === 3 && (
                    <SandboxStep3
                        elapsed={elapsed}
                        playing={playing}
                        setPlaying={setPlaying}
                        retrySpeaking={retrySpeaking}
                        onNext={handleAnalyze}
                        accent={accent}
                    />
                )}
            </div>

            <SandboxAnalyzingOverlay analyzing={analyzing} accent={accent} />
        </div>
    );
}

export default Sandbox;
