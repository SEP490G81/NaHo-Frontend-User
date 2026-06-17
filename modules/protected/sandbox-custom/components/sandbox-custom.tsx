"use client";
import React, { useState } from "react";
import { Switch } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useCustomQuestionStore } from "@/store/customQuestionStore";
import { useHistoryStore } from "@/store/historyStore";
import {
    SandboxCustomProvider,
    useSandboxCustom,
} from "../provider/sandbox-custom.context";
import CustomStepper from "./custom.stepper";
import SandboxStep1 from "./sandbox-custom.step1";
import SandboxStep2 from "./sandbox-custom.step2";
import SandboxStep3 from "./sandbox-custom.step3";
import SandboxStep4 from "./sandbox-custom.step4";
import SandboxAnalyzingOverlay from "../../sandbox/components/sandbox.analyzing.overlay";

interface SandboxCustomProps {
    id: string;
}

export function SandboxCustom({ id }: SandboxCustomProps) {
    return (
        <SandboxCustomProvider>
            <SandboxCustomContent id={id} />
        </SandboxCustomProvider>
    );
}

function SandboxCustomContent({ id }: { id: string }) {
    const t = useTranslations("sandboxCustom");
    const { push } = useRouter();
    const current = useCustomQuestionStore((s) => s.current);
    const addHistoryEntry = useHistoryStore((s) => s.addEntry);

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
    } = useSandboxCustom();

    const [showFurigana, setShowFurigana] = useState(true);

    if (!current || current.id !== id) {
        return (
            <div className="animate-fade-in mx-auto max-w-2xl px-4 py-12">
                <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-8 text-center shadow-sm">
                    <h1 className="text-text-contrast text-xl font-bold">
                        {t("noQuestionTitle")}
                    </h1>
                    <p className="text-text-muted mt-2 text-sm">
                        {t("noQuestionSubtitle")}
                    </p>
                    <Link
                        href="/custom-question"
                        className="bg-bgc-highlight hover:bg-bgc-highlight/90 mt-5 inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors cursor-pointer"
                    >
                        {t("noQuestionBtn")}
                    </Link>
                </div>
            </div>
        );
    }

    const handleAnalyze = () => {
        setAnalyzing(true);
        setPlaying(false);
        setTimeout(() => {
            setAnalyzing(false);
            setStep(4);
        }, 2000);
    };

    const handleSaveToHistory = () => {
        addHistoryEntry({
            historyId: `h-custom-${Date.now()}`,
            topicId: "custom",
            questionId: current.id,
            practicedAt: new Date().toISOString(),
            durationSec: Math.max(elapsed, 1),
            score: 8.0,
            customJp: current.questionJp,
            customHintVi: current.hintVi,
        });
        toast.success(t("saveSuccess"));
        push("/history-custom");
    };

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto max-w-5xl space-y-5">
                <header className="flex flex-wrap items-center justify-between gap-3">
                    <Link
                        href="/custom-question"
                        className="border-bdc-primary bg-bgc-page text-text-contrast hover:bg-hbgc-app inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-semibold transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                        {t("backBtn")}
                    </Link>
                    <div className="flex items-center gap-2">
                        <label
                            htmlFor="furigana-custom"
                            className="text-text-contrast cursor-pointer text-sm font-medium"
                        >
                            {t("showFurigana")}
                        </label>
                        <Switch
                            id="furigana-custom"
                            checked={showFurigana}
                            onChange={(e) => setShowFurigana(e.target.checked)}
                            sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                    color: "var(--color-bgc-highlight)",
                                    "& + .MuiSwitch-track": {
                                        backgroundColor:
                                            "var(--color-bgc-highlight)",
                                    },
                                },
                            }}
                        />
                    </div>
                </header>

                <CustomStepper step={step} />

                {/* Step 1 */}
                {step === 1 && (
                    <SandboxStep1
                        volume={volume}
                        micStatus={micStatus}
                        startMicTest={startMicTest}
                        resetMicTest={resetMicTest}
                        setStep={setStep}
                    />
                )}

                {/* Step 2 */}
                {step === 2 && (
                    <SandboxStep2
                        questionJp={current.questionJp}
                        hintVi={current.hintVi}
                        showFurigana={showFurigana}
                        recording={recording}
                        elapsed={elapsed}
                        toggleRecord={toggleRecord}
                    />
                )}

                {/* Step 3 */}
                {step === 3 && (
                    <SandboxStep3
                        questionJp={current.questionJp}
                        hintVi={current.hintVi}
                        showFurigana={showFurigana}
                        elapsed={elapsed}
                        playing={playing}
                        setPlaying={setPlaying}
                        retrySpeaking={retrySpeaking}
                        onNext={handleAnalyze}
                    />
                )}

                {/* Step 4 */}
                {step === 4 && (
                    <SandboxStep4
                        questionJp={current.questionJp}
                        hintVi={current.hintVi}
                        showFurigana={showFurigana}
                        practiceAgain={retrySpeaking}
                        saveToHistory={handleSaveToHistory}
                    />
                )}
            </div>

            <SandboxAnalyzingOverlay analyzing={analyzing} />
        </div>
    );
}

export default SandboxCustom;
