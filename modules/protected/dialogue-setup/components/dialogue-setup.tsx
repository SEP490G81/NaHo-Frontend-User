"use client";
import { useState } from "react";
import { CompanionList } from "./companion-list";
import { AdvancedSettingsForm } from "../features/advanced-settings-form";
import { useTranslations } from "next-intl";
import { ContainerBox } from "@/components/ui/container.box";

export function DialogueSetup() {
    const t = useTranslations("dialogueSetup");
    const [companionId, setCompanionId] = useState("sakura");

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-6 sm:px-6">
            <ContainerBox
                as="header"
                className="border-bdc-primary space-y-4 border shadow-sm"
            >
                <h1 className="text-text-contrast text-2xl font-bold tracking-tight">
                    {t("title")}
                </h1>
                <p className="text-text-muted mt-1 text-sm">{t("subtitle")}</p>
            </ContainerBox>

            {/* Companion selector */}
            <CompanionList selectedId={companionId} onSelect={setCompanionId} />

            {/* Advanced Settings Form with State & Action */}
            <AdvancedSettingsForm companionId={companionId} />
        </div>
    );
}

export default DialogueSetup;
