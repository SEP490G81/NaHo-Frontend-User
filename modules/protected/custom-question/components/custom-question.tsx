"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/intl/i18n/navigation";
import RulesDialog from "./rules.dialog";
import CustomQuestionForm from "../features/custom-question.form";

interface CustomQuestionProps {
  share?: boolean;
}

export function CustomQuestion({ share = false }: CustomQuestionProps) {
  const t = useTranslations("page.customQuestion");
  const { push } = useRouter();
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="px-4 py-6 md:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-contrast">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            {t("subtitle")}
          </p>
        </div>

        <CustomQuestionForm defaultShare={share} />
      </div>

      <RulesDialog
        open={!accepted}
        onAccept={() => setAccepted(true)}
        onBack={() => push("/dashboard")}
      />
    </div>
  );
}

export default CustomQuestion;
