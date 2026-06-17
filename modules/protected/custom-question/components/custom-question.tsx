"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import CustomQuestionHeader from "./custom-question-header";
import RulesDialog from "./rules.dialog";
import CustomQuestionForm from "../features/custom-question.form";

interface CustomQuestionProps {
    share?: boolean;
}

export function CustomQuestion({ share = false }: CustomQuestionProps) {
    const t = useTranslations("customQuestion");
    const { push } = useRouter();
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-6">
                <CustomQuestionHeader t={t} />

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
