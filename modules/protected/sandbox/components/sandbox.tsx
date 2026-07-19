"use client";
import React, { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { findQuestionAnywhere, findTopicAnywhere } from "@/data/questionLookup";
import { splitMarkup, mapBook } from "@/data/marugoto/mapper";
import { getQuestionHints, type QuestionHints } from "@/data/mockHints";
import { useMarugotoStore } from "@/store/marugotoStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    getBookDetail,
    getLearningPathNodeDetail,
} from "@/services/client/book.service";
import { submitPractice } from "@/modules/protected/history/services/history.service";
import { submitSpeakingAnalysis } from "@/services/client/speaking.service";
import { SandboxProvider, useSandbox } from "../provider/sandbox.context";
import { getSandboxRules } from "../constants/sandbox.constant";
import SandboxStepper from "./sandbox.stepper";
import SandboxHeader from "./sandbox.header";
import SandboxStep1 from "./sandbox.step1";
import SandboxStep2 from "./sandbox.step2";
import SandboxStep3 from "./sandbox.step3";
import SandboxAnalyzingOverlay from "./sandbox.analyzing.overlay";
import { useRouter } from "@/i18n/navigation";

function loadQuestion(questionId: string) {
    const hit = findQuestionAnywhere(questionId);
    if (hit) {
        const topicTitle = findTopicAnywhere(hit.topicId)?.title ?? "";
        return { topicId: hit.topicId, topicTitle, question: hit.question };
    }
    // Câu hỏi BE (id số) chưa có endpoint chi tiết → dựng placeholder tối thiểu để
    // người dùng vẫn ghi âm và gửi chấm điểm được (prompt đầy đủ sẽ nối sau).
    if (/^\d+$/.test(questionId)) {
        return {
            topicId: "",
            topicTitle: "",
            question: {
                id: questionId,
                jp: "録音して発音を分析しましょう",
                furigana: "ろくおんしてはつおんをぶんせきしましょう",
                vi: "Ghi âm câu trả lời của bạn để hệ thống chấm điểm phát âm.",
            },
        };
    }
    return null;
}

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
    const questionId = params?.questionId as string;
    const nodeId = searchParams.get("node");
    const bookParam = searchParams.get("book");
    const topicParam = searchParams.get("topic");

    // Câu hỏi BE: nạp đề bài thật qua learning-path-node detail (không cần API
    // /speaking-questions/{id}); nếu không có nodeId thì tra dữ liệu local.
    const nodeQ = useQuery({
        queryKey: ["sandbox-node", nodeId],
        queryFn: () => getLearningPathNodeDetail(nodeId!),
        enabled: !!nodeId,
    });

    // Màu chủ đạo = màu quyển sách chứa câu hỏi (để tô nút Quay lại).
    const bookQ = useQuery({
        queryKey: ["book", bookParam],
        queryFn: () => getBookDetail(bookParam!),
        enabled: !!bookParam,
    });
    const accent = bookQ.data
        ? (mapBook(bookQ.data).coverColor ?? "var(--color-bgc-highlight)")
        : "var(--color-bgc-highlight)";

    const data = useMemo(() => {
        const sq = nodeQ.data?.speakingQuestion;
        if (sq) {
            const { text, reading } = splitMarkup(sq.titleMarkup || sq.title);
            return {
                topicId: "",
                topicTitle: "",
                question: {
                    id: questionId,
                    jp: text,
                    furigana: reading,
                    vi: sq.description ?? "",
                },
            };
        }
        return loadQuestion(questionId);
    }, [nodeQ.data, questionId]);

    // Từ vựng + ngữ pháp: ưu tiên dữ liệu thật của câu hỏi (node), không dùng mock.
    const hints = useMemo<QuestionHints>(() => {
        const sq = nodeQ.data?.speakingQuestion;
        if (sq) {
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
        }
        if (!data) return { vocab: [], structures: [] };
        return getQuestionHints(data.topicId, data.question.id);
    }, [nodeQ.data, data]);

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

    // questionId số = câu hỏi BE → gọi API chấm điểm thật; ngược lại (mock) → giả lập.
    const mutation = useMutation({
        mutationFn: async (vars: {
            audioBlob: Blob;
            durationSec: number;
            topicId: string;
            mockQuestionId: string;
        }) => {
            const speakingQuestionId = Number(questionId);
            if (Number.isFinite(speakingQuestionId)) {
                return submitSpeakingAnalysis({
                    file: vars.audioBlob,
                    speakingQuestionId,
                    durationSec: vars.durationSec,
                });
            }
            return submitPractice({
                topicId: vars.topicId,
                questionId: vars.mockQuestionId,
                audioBlob: vars.audioBlob,
                durationSec: vars.durationSec,
            });
        },
        onSuccess: (result) => {
            setAnalyzing(false);
            // Ghi điểm vào lộ trình Marugoto để mở khóa node kế + cộng L-Point
            // (không ảnh hưởng câu hỏi ngoài Marugoto).
            useMarugotoStore.getState().setQuestionScore(questionId, result.score);
            push(`/history/${result.historyId}`);
        },
        onError: (err) => {
            console.error("Lỗi phân tích giọng nói:", err);
            setAnalyzing(false);
        },
    });

    if (nodeId && nodeQ.isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-text-muted">Đang tải câu hỏi...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-text-contrast text-2xl font-bold">
                    {t("notFoundTitle")}
                </h2>
                <p className="text-text-muted">{t("notFoundSubtitle")}</p>
            </div>
        );
    }

    const { topicId, topicTitle, question } = data;
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
            // Lấy file Blob từ url ghi âm cục bộ
            const res = await fetch(audioUrl);
            const audioBlob = await res.blob();

            mutation.mutate({
                audioBlob,
                durationSec,
                topicId,
                mockQuestionId: question.id,
            });
        } catch (err) {
            console.error("Lỗi khi tải file ghi âm:", err);
            setAnalyzing(false);
        }
    };

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto max-w-5xl space-y-5">
                <SandboxHeader backHref={backHref} accent={accent} />

                <SandboxStepper step={step} />

                {/* Step 1 */}
                {step === 1 && (
                    <SandboxStep1
                        rules={rules}
                        volume={volume}
                        micStatus={micStatus}
                        startMicTest={startMicTest}
                        resetMicTest={resetMicTest}
                        setStep={setStep}
                        furigana={showFurigana}
                    />
                )}

                {/* Step 2 */}
                {step === 2 && (
                    <SandboxStep2
                        topicTitle={topicTitle}
                        question={question}
                        showFurigana={showFurigana}
                        recording={recording}
                        elapsed={elapsed}
                        toggleRecord={toggleRecord}
                        hints={hints}
                    />
                )}

                {/* Step 3 */}
                {step === 3 && (
                    <SandboxStep3
                        topicTitle={topicTitle}
                        question={question}
                        showFurigana={showFurigana}
                        elapsed={elapsed}
                        playing={playing}
                        setPlaying={setPlaying}
                        retrySpeaking={retrySpeaking}
                        onNext={handleAnalyze}
                    />
                )}
            </div>

            <SandboxAnalyzingOverlay analyzing={analyzing} />
        </div>
    );
}

export default Sandbox;
