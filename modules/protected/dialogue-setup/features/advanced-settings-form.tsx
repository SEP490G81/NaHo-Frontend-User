"use client";
import { Crown, MessagesSquare, Smile } from "lucide-react";
import { Slider, Switch } from "@mui/material";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { CONVERSATION_STYLES } from "@/modules/protected/live-chatroom/constants/live-chatroom.constant";

interface AdvancedSettingsFormProps {
    conversationStyleId: number;
    voiceSpeed: number;
    showHints: boolean;
    onStyleChange: (id: number) => void;
    onVoiceSpeedChange: (v: number) => void;
    onShowHintsChange: (v: boolean) => void;
}

const STYLE_ICON: Record<string, React.ReactNode> = {
    informal: <Smile className="h-5 w-5" />,
    neutral: <MessagesSquare className="h-5 w-5" />,
    formal: <Crown className="h-5 w-5" />,
};

export function AdvancedSettingsForm({
    conversationStyleId,
    voiceSpeed,
    showHints,
    onStyleChange,
    onVoiceSpeedChange,
    onShowHintsChange,
}: AdvancedSettingsFormProps) {
    const t = useTranslations("dialogueSetup");

    return (
        <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 shadow-sm sm:p-6">
            <h2 className="text-text-contrast text-base font-semibold">
                {t("advancedTitle")}
            </h2>
            <p className="text-text-muted mt-1 text-sm">
                {t("advancedSubtitle")}
            </p>

            {/* Style hội thoại — 3 thẻ */}
            <div className="mt-5">
                <span className="text-text-contrast text-sm font-medium">
                    {t("styleLabel")}
                </span>
                <div className="mt-2 grid gap-3 sm:grid-cols-3">
                    {CONVERSATION_STYLES.map((s) => {
                        const selected = conversationStyleId === s.id;
                        return (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => onStyleChange(s.id)}
                                className={cn(
                                    "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all",
                                    selected
                                        ? "border-bgc-highlight ring-bgc-highlight/30 bg-bgc-highlight/5 ring-2"
                                        : "border-bdc-primary hover:border-bgc-highlight/60 bg-bgc-page/40",
                                )}
                            >
                                <span
                                    className={cn(
                                        "flex h-9 w-9 items-center justify-center rounded-lg",
                                        selected
                                            ? "bg-bgc-highlight text-white"
                                            : "bg-bgc-highlight/15 text-bgc-highlight",
                                    )}
                                >
                                    {STYLE_ICON[s.key]}
                                </span>
                                <span className="text-text-contrast text-sm font-semibold">
                                    {t(`style_${s.key}`)}
                                </span>
                                <span className="text-text-muted text-xs leading-relaxed">
                                    {t(`styleDesc_${s.key}`)}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="border-bdc-primary mt-6 grid gap-6 border-t pt-6 lg:grid-cols-2">
                {/* Voice speed */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-text-contrast text-sm font-medium">
                            {t("speedLabel")}
                        </span>
                        <span className="bg-bgc-page text-bgc-highlight rounded-md px-2 py-0.5 text-xs font-semibold">
                            {voiceSpeed.toFixed(1)}x
                        </span>
                    </div>
                    <Slider
                        value={voiceSpeed}
                        min={0.8}
                        max={1.5}
                        step={0.1}
                        onChange={(_e, v) => onVoiceSpeedChange(v as number)}
                        color="primary"
                    />
                    <div className="text-text-muted flex justify-between text-[11px]">
                        <span>0.8x ({t("speedSlow")})</span>
                        <span>1.5x ({t("speedFast")})</span>
                    </div>
                </div>

                {/* Hints toggle */}
                <label className="border-bdc-primary bg-bgc-page/50 flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4">
                    <span className="flex-1">
                        <span className="text-text-contrast block text-sm font-medium">
                            {t("hintsTitle")}
                        </span>
                        <span className="text-text-muted block text-xs">
                            {t("hintsDesc")}
                        </span>
                    </span>
                    <Switch
                        checked={showHints}
                        onChange={(e) => onShowHintsChange(e.target.checked)}
                        color="primary"
                    />
                </label>
            </div>
        </div>
    );
}

export default AdvancedSettingsForm;
