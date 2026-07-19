"use client";
import React from "react";
import { BookOpen } from "lucide-react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useTranslations } from "next-intl";
import type { NodeVocabularyItem } from "@/types/responses/learning.response";
import type { Vocab } from "@/data/marugoto/types";
import FlashcardDeck from "./flashcard.deck";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    vocab: NodeVocabularyItem[];
    loading?: boolean;
    showFurigana: boolean;
}

function toVocab(v: NodeVocabularyItem): Vocab {
    return {
        id: String(v.id),
        japanese: v.japanese,
        reading: v.reading ?? undefined,
        vi: v.vietnameseMeaningText ?? "",
    };
}

export function VocabDialog({
    open,
    onOpenChange,
    title,
    vocab,
    loading,
    showFurigana,
}: Props) {
    const t = useTranslations("marugoto");
    const items = vocab.map(toVocab);

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
                <div className="flex items-center gap-2">
                    <BookOpen className="text-bgc-highlight h-5 w-5" />
                    <span className="text-text-contrast text-lg font-bold">
                        {title}
                    </span>
                </div>
            </DialogTitle>

            <DialogContent dividers className="border-bdc-primary">
                {loading ? (
                    <div className="bg-bgc-page h-64 animate-pulse rounded-xl" />
                ) : items.length === 0 ? (
                    <p className="text-text-muted py-6 text-center text-sm">
                        {t("vocab.empty")}
                    </p>
                ) : (
                    <FlashcardDeck vocab={items} showFurigana={showFurigana} />
                )}
            </DialogContent>

            <div className="flex justify-end px-6 py-4">
                <Button
                    onClick={() => onOpenChange(false)}
                    variant="outlined"
                    sx={{
                        textTransform: "none",
                        borderColor: "var(--color-bdc-muted)",
                        color: "var(--color-text-contrast)",
                        "&:hover": {
                            borderColor: "var(--color-bdc-primary)",
                            backgroundColor: "var(--color-hbgc-app)",
                        },
                    }}
                >
                    {t("vocab.close")}
                </Button>
            </div>
        </Dialog>
    );
}

export default VocabDialog;
