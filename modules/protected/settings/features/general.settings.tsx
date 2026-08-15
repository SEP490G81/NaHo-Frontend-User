"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Divider } from "@mui/material";
import { useSettingHighlight } from "@/modules/protected/settings/hooks/use.setting.highlight";
import BackButton from "@/components/ui/back.button";
import { AppearanceSetting } from "../components/appearance-setting";
import { LanguageSetting } from "../components/language-setting";
import { AiAudioSetting } from "../components/ai-audio-setting";

const GeneralSettings = () => {
    const t = useTranslations("settings.general");
    const tCommonRaw = useTranslations("common.metadata");
    const tCommon = tCommonRaw as (key: string) => string;
    useSettingHighlight();

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-y-6 pb-12">
            {/* Part 1 Header */}
            <div>
                <BackButton
                    label={tCommon("back") || "Quay lại"}
                    className="mb-4 md:hidden"
                />
                <h1 className="text-text-contrast text-2xl font-bold">
                    {t("title")}
                </h1>
                <p className="text-text-muted mt-1 text-sm">
                    {t("description")}
                </p>
            </div>

            <Divider className="border-bdc-primary/50" />

            {/* Section 1: Appearance (Giao diện) */}
            <AppearanceSetting />

            <Divider className="border-bdc-primary/50 my-1" />

            {/* Section 2: Language (Ngôn ngữ) */}
            <LanguageSetting />

            <Divider className="border-bdc-primary/50 my-1" />

            {/* Section 3: AI Live Chatroom Audio Setting */}
            <AiAudioSetting />
        </div>
    );
};

export default GeneralSettings;
