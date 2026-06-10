"use client";
import React from "react";
import { Users, Target, ListChecks } from "lucide-react";
import { Link } from "@/intl/i18n/navigation";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { CATEGORY_LABEL, type Topic } from "@/data/mockTopics";
import FuriganaText from "@/components/ui/furigana.text";
import { slugifyText } from "@/lib/utils";

interface TopicIntroDialogProps {
    topic: Topic | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TopicIntroDialog({ topic, open, onOpenChange }: TopicIntroDialogProps) {
    const t = useTranslations("page.topics");

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
                    <span className="w-fit rounded-full bg-bgc-highlight/15 px-2.5 py-0.5 text-xs font-semibold text-bgc-highlight">
                        {CATEGORY_LABEL[topic.category]}
                    </span>
                    <h2 className="text-2xl font-bold text-text-contrast">{topic.title}</h2>
                    <div className="text-base text-text-muted">
                        <FuriganaText text={topic.jpTitle} furigana={topic.jpFurigana} />
                    </div>
                </div>
            </DialogTitle>

            <DialogContent dividers className="border-bdc-primary text-sm space-y-4">
                <section className="space-y-1">
                    <h4 className="flex items-center gap-2 font-semibold text-text-contrast">
                        <Users className="h-4 w-4 text-bgc-highlight" />
                        {t("dialogAudience")}
                    </h4>
                    <p className="text-text-muted">{topic.audience}</p>
                </section>

                <section className="space-y-1">
                    <h4 className="font-semibold text-text-contrast">{t("dialogDescription")}</h4>
                    <p className="text-text-muted">{topic.description}</p>
                </section>

                <section className="space-y-2">
                    <h4 className="flex items-center gap-2 font-semibold text-text-contrast">
                        <Target className="h-4 w-4 text-bgc-highlight" />
                        {t("dialogTarget")}
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-text-muted">
                        {topic.objectives.map((o) => (
                            <li key={o}>{o}</li>
                        ))}
                    </ul>
                </section>

                <div className="rounded-lg border border-bdc-primary bg-bgc-page px-3 py-2 text-xs text-text-muted">
                    {t.rich("dialogQuestionSummary", {
                        count: topic.questions.length,
                        bold: (chunks) => <span className="font-semibold text-text-contrast">{chunks}</span>
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
                    className="inline-flex h-9 items-center justify-center rounded-md bg-bgc-highlight px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-bgc-highlight/90"
                >
                    <ListChecks className="mr-2 h-4 w-4" />
                    {t("dialogStart")}
                </Link>
            </DialogActions>
        </Dialog>
    );
}

export default TopicIntroDialog;
