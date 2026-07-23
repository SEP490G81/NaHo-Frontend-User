"use client";
import React, { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { splitMarkup, mapBook } from "@/data/marugoto/mapper";
import type { QuestionHints } from "@/data/mockHints";
import { useMarugotoStore } from "@/store/marugotoStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getBookDetail,
    getLearningPathNodeDetail,
} from "@/services/client/book.service";
import { submitSpeakingAnalysis } from "@/services/client/speaking.service";
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

const EMPTY_HINTS: QuestionHints = { vocab: [], structures: [] };

export function Sandbox() {
    return (
        <SandboxProvider>
            <SandboxContent />
        </SandboxProvider>
    );
}

function SandboxContent() {
    const t = useTranslations("sandbox");
    const params = useParams();
    const searchParams = useSearchParams();
    const { push } = useRouter();
    const queryClient = useQueryClient();
    const questionId = params?.questionId as string;
    const nodeId = searchParams.get("node");
    const bookParam = searchParams.get("book");
    const topicParam = searchParams.get("topic");

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

    const question = useMemo(() => {
        if (sq) {
            const { text, reading } = splitMarkup(sq.titleMarkup || sq.title);
            return {
                id: questionId,
                jp: text,
                furigana: reading,
                vi: sq.description ?? "",
            };
        }
        // Chưa nạp được node → placeholder tối thiểu để vẫn ghi âm/gửi chấm được.
        return {
            id: questionId,
            jp: "録音して発音を分析しましょう",
            furigana: "ろくおんしてはつおんをぶんせきしましょう",
            vi: "",
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

    const {
        step,
        setStep,
        micStatus,
        volume,
        recording,
        elapsed,
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

    const showFurigana = true;

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
            useMarugotoStore.getState().setQuestionScore(questionId, result.score);
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
            push(`/history/${result.historyId}${qs ? `?${qs}` : ""}`);
        },
        onError: (err) => {
            console.error("Lỗi phân tích giọng nói:", err);
            setAnalyzing(false);
            toast.error(t("analyzeFailed"));
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
              : "/history";

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
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto max-w-5xl space-y-5">
                <SandboxHeader backHref={backHref} accent={accent} />

                <SandboxQuestionBanner
                    jp={question.jp}
                    furigana={question.furigana}
                    vi={question.vi}
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
                        toggleRecord={toggleRecord}
                        hints={hints}
                        showFurigana={showFurigana}
                        accent={accent}
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
