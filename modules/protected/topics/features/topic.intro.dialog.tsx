"use client";
import React from "react";
import { ListChecks, Target, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { CATEGORY_LABEL, type Topic } from "@/data/mockTopics";
import FuriganaText from "@/components/ui/furigana.text";
import { slugifyText } from "@/libs/utils";

interface TopicIntroDialogProps {
    topic: Topic | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TopicIntroDialog({
    topic,
    open,
    onOpenChange,
}: TopicIntroDialogProps) {
    const t = useTranslations("topics");

    if (!topic) return null;

    return (
        <Dialog
            open={open}
            onClose={() => onOpenChange(false)}
            maxWidth="sm"
            fullWidth
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: "var(--color-bgc-app)",
                    color: "var(--color-text-contrast)",
                    border: "1px solid var(--color-bdc-primary)",
                    borderRadius: "16px",
                    padding: "8px",
                },
            }}
        >
            <DialogTitle>
                <div className="flex flex-col gap-1.5">
                    <span className="bg-bgc-highlight/15 text-bgc-highlight w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold">
                        {CATEGORY_LABEL[topic.category]}
                    </span>
                    <h2 className="text-text-contrast text-2xl font-bold">
                        {topic.title}
                    </h2>
                    <div className="text-text-muted text-base">
                        <FuriganaText
                            text={topic.jpTitle}
                            furigana={topic.jpFurigana}
                        />
                    </div>
                </div>
            </DialogTitle>

            <DialogContent
                dividers
                className="border-bdc-primary space-y-4 text-sm"
            >
                <section className="space-y-1">
                    <h4 className="text-text-contrast flex items-center gap-2 font-semibold">
                        <Users className="text-bgc-highlight h-4 w-4" />
                        {t("dialogAudience")}
                    </h4>
                    <p className="text-text-muted">{topic.audience}</p>
                </section>

                <section className="space-y-1">
                    <h4 className="text-text-contrast font-semibold">
                        {t("dialogDescription")}
                    </h4>
                    <p className="text-text-muted">{topic.description}</p>
                </section>

                <section className="space-y-2">
                    <h4 className="text-text-contrast flex items-center gap-2 font-semibold">
                        <Target className="text-bgc-highlight h-4 w-4" />
                        {t("dialogTarget")}
                    </h4>
                    <ul className="text-text-muted list-disc space-y-1 pl-5">
                        {topic.objectives.map((o) => (
                            <li key={o}>{o}</li>
                        ))}
                    </ul>
                </section>

                <div className="border-bdc-primary bg-bgc-page text-text-muted rounded-lg border px-3 py-2 text-xs">
                    {t.rich("dialogQuestionSummary", {
                        count: topic.questions.length,
                        bold: (chunks) => (
                            <span className="text-text-contrast font-semibold">
                                {chunks}
                            </span>
                        ),
                    })}
                </div>
            </DialogContent>

            <DialogActions className="gap-2 px-6 py-4">
                <Button
                    onClick={() => onOpenChange(false)}
                    variant="outlined"
                    sx={{
                        textTransform: "none",
                        borderColor: "var(--color-bdc-muted)",
                        color: "var(--color-text-contrast)",
                        fontWeight: "semibold",
                        "&:hover": {
                            borderColor: "var(--color-bdc-primary)",
                            backgroundColor: "var(--color-hbgc-app)",
                        },
                    }}
                >
                    {t("dialogClose")}
                </Button>
                <Link
                    href={`/topics/${slugifyText(topic.id + "-" + topic.jpTitle)}`}
                    className="bg-bgc-highlight hover:bg-bgc-highlight/90 inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
                >
                    <ListChecks className="mr-2 h-4 w-4" />
                    {t("dialogStart")}
                </Link>
            </DialogActions>
        </Dialog>
    );
}

export default TopicIntroDialog;
