"use client";
import React, { useState } from "react";
import { BookOpen, Check } from "lucide-react";
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
    /** Đánh dấu hoàn thành node từ vựng (đẩy mốc). Bỏ trống nếu chỉ để xem. */
    onFinish?: () => void;
    finishing?: boolean;
    finished?: boolean;
    accent: string;
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
    onFinish,
    finishing,
    finished,
    accent,
}: Props) {
    const t = useTranslations("marugoto");
    const items = vocab.map(toVocab);

    // Chỉ cho "Hoàn thành" sau khi đã lướt hết thẻ (0–1 thẻ thì không cần lướt).
    // Reset ngay trong render khi hộp thoại mở/đóng (không dùng effect).
    const [viewedAll, setViewedAll] = useState(false);
    const [trackedOpen, setTrackedOpen] = useState(open);
    if (open !== trackedOpen) {
        setTrackedOpen(open);
        setViewedAll(false);
    }
    const canFinish = viewedAll || (!loading && items.length <= 1);

    return (
        <Dialog
            open={open}
            onClose={() => onOpenChange(false)}
            maxWidth="sm"
            fullWidth
            sx={{
                "& .MuiPaper-root": {
                    "--book-accent": accent,
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
                    <BookOpen
                        className="h-5 w-5"
                        style={{
                            color: "var(--book-accent, var(--color-bgc-highlight))",
                        }}
                    />
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
                    <FlashcardDeck
                        vocab={items}
                        showFurigana={showFurigana}
                        onReachedLast={() => setViewedAll(true)}
                    />
                )}
            </DialogContent>

            <div className="flex items-center justify-end gap-3 px-6 py-4">
                {onFinish && !finished && !canFinish && (
                    <span className="text-text-muted mr-auto text-xs">
                        {t("vocab.finishHint")}
                    </span>
                )}
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
                {onFinish && (
                    <Button
                        onClick={onFinish}
                        disabled={
                            loading || finishing || finished || !canFinish
                        }
                        variant="contained"
                        startIcon={
                            finished ? <Check className="h-4 w-4" /> : undefined
                        }
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            backgroundColor:
                                "var(--book-accent, var(--color-bgc-highlight))",
                            color: "var(--color-text-pure)",
                            "&.Mui-disabled": {
                                backgroundColor: "var(--color-bdc-muted)",
                                color: "var(--color-text-pure)",
                            },
                        }}
                    >
                        {finished ? t("vocab.done") : t("vocab.finish")}
                    </Button>
                )}
            </div>
        </Dialog>
    );
}

export default VocabDialog;
