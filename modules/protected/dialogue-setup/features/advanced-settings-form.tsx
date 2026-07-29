"use client";
import { useState } from "react";
import { MessagesSquare } from "lucide-react";
import {
    Button,
    FormControl,
    MenuItem,
    Select,
    Slider,
    Switch,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { type ChatKeigo, type ChatTone, useChatStore } from "@/store/chatStore";
import { useRouter } from "@/i18n/navigation";
import { ContainerBox } from "@/components/ui/container.box";

interface AdvancedSettingsFormProps {
    companionId: string;
}

export function AdvancedSettingsForm({
    companionId,
}: AdvancedSettingsFormProps) {
    const t = useTranslations("dialogueSetup");
    const router = useRouter();
    const setConfig = useChatStore((s) => s.setConfig);

    const [tone, setTone] = useState<ChatTone>("casual");
    const [keigo, setKeigo] = useState<ChatKeigo>("auto");
    const [voiceSpeed, setVoiceSpeed] = useState(1.0);
    const [showTranslation, setShowTranslation] = useState(true);
    const [showHints, setShowHints] = useState(true);

    const handleStart = () => {
        setConfig({
            companionId,
            tone,
            keigo,
            voiceSpeed,
            showTranslation,
            showHints,
        });
        router.push("/live-chatroom");
    };

    return (
        <ContainerBox className="border-bdc-primary border shadow-sm">
            <h2 className="text-text-contrast text-base font-semibold">
                {t("advancedTitle")}
            </h2>
            <p className="text-text-muted mt-1 text-sm">
                {t("advancedSubtitle")}
            </p>

            <div className="mt-5 grid gap-6 lg:grid-cols-2">
                {/* Tone */}
                <div className="flex flex-col justify-start space-y-2">
                    <span className="text-text-contrast text-sm font-medium">
                        {t("toneLabel")}
                    </span>
                    <ToggleButtonGroup
                        value={tone}
                        exclusive
                        onChange={(e, v) => v && setTone(v as ChatTone)}
                        size="small"
                        className="justify-start gap-2"
                    >
                        <ToggleButton
                            value="casual"
                            className="border-bdc-primary !text-text-contrast [&.Mui-selected]:!border-bgc-highlight [&.Mui-selected]:!bg-bgc-highlight/15 [&.Mui-selected]:!text-bgc-highlight !rounded-md border !px-3 !py-1.5 !text-xs !font-medium !capitalize"
                        >
                            {t("toneCasual")}
                        </ToggleButton>
                        <ToggleButton
                            value="business"
                            className="border-bdc-primary !text-text-contrast [&.Mui-selected]:!border-bgc-highlight [&.Mui-selected]:!bg-bgc-highlight/15 [&.Mui-selected]:!text-bgc-highlight !rounded-md border !px-3 !py-1.5 !text-xs !font-medium !capitalize"
                        >
                            {t("toneBusiness")}
                        </ToggleButton>
                        <ToggleButton
                            value="interview"
                            className="border-bdc-primary !text-text-contrast [&.Mui-selected]:!border-bgc-highlight [&.Mui-selected]:!bg-bgc-highlight/15 [&.Mui-selected]:!text-bgc-highlight !rounded-md border !px-3 !py-1.5 !text-xs !font-medium !capitalize"
                        >
                            {t("toneInterview")}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                {/* Keigo */}
                <div className="space-y-2">
                    <span className="text-text-contrast mb-1 block text-sm font-medium">
                        {t("keigoLabel")}
                    </span>
                    <FormControl fullWidth size="small">
                        <Select
                            value={keigo}
                            onChange={(e) =>
                                setKeigo(e.target.value as ChatKeigo)
                            }
                            className="text-text-contrast bg-bgc-app"
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--color-bdc-primary)",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--color-bgc-highlight)",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor:
                                            "var(--color-bgc-highlight)",
                                    },
                            }}
                        >
                            <MenuItem value="auto">{t("keigoAuto")}</MenuItem>
                            <MenuItem value="sonkeigo">
                                {t("keigoSonkeigo")}
                            </MenuItem>
                            <MenuItem value="kenjougo">
                                {t("keigoKenjougo")}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {/* Voice speed */}
                <div className="space-y-2 lg:col-span-2">
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
                        onChange={(e, v) => setVoiceSpeed(v as number)}
                        color="primary"
                    />
                    <div className="text-text-muted flex justify-between text-[11px]">
                        <span>0.8x ({t("speedSlow")})</span>
                        <span>1.5x ({t("speedFast")})</span>
                    </div>
                </div>

                {/* Toggles */}
                <label className="border-bdc-primary bg-bgc-page flex cursor-pointer items-start justify-between gap-3 rounded-md border p-3">
                    <span className="flex-1">
                        <span className="text-text-contrast block text-sm font-medium">
                            {t("translationTitle")}
                        </span>
                        <span className="text-text-muted block text-xs">
                            {t("translationDesc")}
                        </span>
                    </span>
                    <Switch
                        checked={showTranslation}
                        onChange={(e) => setShowTranslation(e.target.checked)}
                        color="primary"
                    />
                </label>

                <label className="border-bdc-primary bg-bgc-page flex cursor-pointer items-start justify-between gap-3 rounded-md border p-3">
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
                        onChange={(e) => setShowHints(e.target.checked)}
                        color="primary"
                    />
                </label>
            </div>

            <div className="border-bdc-primary mt-6 flex justify-end border-t pt-4">
                <Button
                    onClick={handleStart}
                    variant="contained"
                    color="primary"
                    className="!h-10 !rounded-lg !px-5 font-bold text-white capitalize hover:opacity-90"
                    startIcon={<MessagesSquare className="h-4 w-4" />}
                >
                    {t("startButton")}
                </Button>
            </div>
        </ContainerBox>
    );
}

export default AdvancedSettingsForm;
