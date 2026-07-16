"use client";
import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import type { Vocab } from "@/data/marugoto/types";
import FlashcardDeck from "./flashcard.deck";
import GrammarList from "./grammar.list";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    vocab: Vocab[];
    grammar: string[];
    showFurigana: boolean;
}

type Tab = "cards" | "grammar";

export function VocabDialog({
    open,
    onOpenChange,
    title,
    vocab,
    grammar,
    showFurigana,
}: Props) {
    const t = useTranslations("marugoto");
    const [tab, setTab] = useState<Tab>("cards");

    const tabs: { key: Tab; label: string }[] = [
        { key: "cards", label: t("vocab.tabCards") },
        { key: "grammar", label: t("vocab.tabGrammar") },
    ];

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
                <div className="bg-bgc-page mt-3 flex gap-1 rounded-xl p-1">
                    {tabs.map((tb) => (
                        <button
                            key={tb.key}
                            type="button"
                            onClick={() => setTab(tb.key)}
                            className={cn(
                                "flex-1 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all",
                                tab === tb.key
                                    ? "bg-bgc-highlight text-white shadow-sm"
                                    : "text-text-muted hover:text-text-contrast",
                            )}
                        >
                            {tb.label}
                        </button>
                    ))}
                </div>
            </DialogTitle>

            <DialogContent dividers className="border-bdc-primary">
                {tab === "cards" ? (
                    vocab.length === 0 ? (
                        <p className="text-text-muted py-6 text-center text-sm">
                            {t("vocab.empty")}
                        </p>
                    ) : (
                        <FlashcardDeck vocab={vocab} showFurigana={showFurigana} />
                    )
                ) : grammar.length === 0 ? (
                    <p className="text-text-muted py-6 text-center text-sm">
                        {t("vocab.emptyGrammar")}
                    </p>
                ) : (
                    <GrammarList grammar={grammar} />
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
