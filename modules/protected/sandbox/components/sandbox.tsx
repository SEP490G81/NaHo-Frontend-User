"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { findQuestionAnywhere, findTopicAnywhere } from "@/data/questionLookup";
import { getQuestionChain } from "@/data/marugoto";
import { getQuestionHints } from "@/data/mockHints";
import { useMarugotoStore } from "@/store/marugotoStore";
import { useMutation } from "@tanstack/react-query";
import { submitPractice } from "@/modules/protected/history/services/history.service";
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
    if (!hit) return null;
    const topicTitle = findTopicAnywhere(hit.topicId)?.title ?? "";
    return { topicId: hit.topicId, topicTitle, question: hit.question };
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
    const { push } = useRouter();
    const questionId = params?.questionId as string;

    // TODO: câu hỏi Marugoto từ BE (id số) chưa tra được vì BE chưa có endpoint
    // chi tiết câu hỏi (GET /speaking-questions/{id}) → tạm dùng dữ liệu local.
    const data = loadQuestion(questionId);

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

    const [showFurigana, setShowFurigana] = useState(true);

    const mutation = useMutation({
        mutationFn: submitPractice,
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
    const hints = getQuestionHints(topicId, question.id);
    const rules = getSandboxRules(t);
    const chain = getQuestionChain(question.id);
    const backHref = chain
        ? `/books/${chain.book.id}/${chain.lesson.id}/${question.id}`
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
                topicId,
                questionId: question.id,
                audioBlob,
                durationSec,
            });
        } catch (err) {
            console.error("Lỗi khi tải file ghi âm:", err);
            setAnalyzing(false);
        }
    };

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto max-w-5xl space-y-5">
                <SandboxHeader
                    backHref={backHref}
                    showFurigana={showFurigana}
                    setShowFurigana={setShowFurigana}
                />

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
