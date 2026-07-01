"use client";
import { useState } from "react";
import { CompanionList } from "./companion-list";
import { AdvancedSettingsForm } from "../features/advanced-settings-form";
import { useTranslations } from "next-intl";

export function DialogueSetup() {
  const t = useTranslations("dialogueSetup");
  const [companionId, setCompanionId] = useState("sakura");

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6">
      <header className="border-bdc-primary bg-bgc-app rounded-xl border p-6 shadow-sm space-y-4">
        <h1 className="text-2xl font-bold tracking-tight text-text-contrast">
          {t("title")}
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          {t("subtitle")}
        </p>
      </header>

      {/* Companion selector */}
      <CompanionList
        selectedId={companionId}
        onSelect={setCompanionId}
      />

      {/* Advanced Settings Form with State & Action */}
      <AdvancedSettingsForm
        companionId={companionId}
      />
    </div>
  );
}

export default DialogueSetup;
