"use client";

import React from "react";
import {
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useTranslations } from "next-intl";
import {
    CONVERSATION_STYLES,
    MARUGOTO_LEVELS,
    marugotoLabel,
} from "@/modules/protected/live-chatroom/constants/live.chatroom.constant";
import type {
    FormalityLevel,
    MarugotoLevel,
} from "@/types/responses/persona.response";

interface AdvancedSettingsFormProps {
    conversationStyle: FormalityLevel;
    marugotoLevel: MarugotoLevel;
    onStyleChange: (s: FormalityLevel) => void;
    onMarugotoChange: (m: MarugotoLevel) => void;
}

export function AdvancedSettingsForm({
    conversationStyle,
    marugotoLevel,
    onStyleChange,
    onMarugotoChange,
}: Readonly<AdvancedSettingsFormProps>) {
    const t = useTranslations("dialogueSetup");

    const handleStyleChange = (e: SelectChangeEvent) => {
        onStyleChange(e.target.value as FormalityLevel);
    };

    const handleMarugotoChange = (e: SelectChangeEvent) => {
        onMarugotoChange(e.target.value as MarugotoLevel);
    };

    return (
        <div className="border-bdc-primary bg-bgc-app space-y-4 rounded-2xl border p-5 shadow-sm sm:p-6">
            <h3 className="text-text-contrast text-base font-semibold">
                {t("advancedTitle")}
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
                {/* Formality level */}
                <div
                    data-tour-id="tour-ai1on1-style-select"
                    className="space-y-2"
                >
                    <label className="text-text-contrast text-xs font-semibold">
                        {t("styleLabel")}
                    </label>
                    <FormControl fullWidth size="small">
                        <Select
                            value={conversationStyle}
                            onChange={handleStyleChange}
                            className="border-bdc-primary bg-bgc-app text-text-contrast rounded-xl! text-sm!"
                            MenuProps={{
                                slotProps: {
                                    paper: {
                                        className:
                                            "bg-bgc-app border border-bdc-primary rounded-xl text-text-contrast",
                                    },
                                },
                            }}
                        >
                            {CONVERSATION_STYLES.map((f) => (
                                <MenuItem
                                    key={f.formality}
                                    value={f.formality}
                                    className="text-text-contrast! text-sm!"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-semibold">
                                            {t(`style_${f.key}`)}
                                        </span>
                                        <span className="text-text-muted text-xs">
                                            {t(`styleDesc_${f.key}`)}
                                        </span>
                                    </div>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* Marugoto level */}
                <div
                    data-tour-id="tour-ai1on1-level-select"
                    className="space-y-2"
                >
                    <label className="text-text-contrast text-xs font-semibold">
                        {t("levelLabel")}
                    </label>
                    <FormControl fullWidth size="small">
                        <Select
                            value={marugotoLevel}
                            onChange={handleMarugotoChange}
                            className="border-bdc-primary bg-bgc-app text-text-contrast rounded-xl! text-sm!"
                            MenuProps={{
                                slotProps: {
                                    paper: {
                                        className:
                                            "bg-bgc-app border border-bdc-primary rounded-xl text-text-contrast",
                                    },
                                },
                            }}
                        >
                            {MARUGOTO_LEVELS.map((m) => (
                                <MenuItem
                                    key={m}
                                    value={m}
                                    className="text-text-contrast! text-sm!"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-semibold">
                                            {marugotoLabel(m)}
                                        </span>
                                    </div>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    );
}

export default AdvancedSettingsForm;
