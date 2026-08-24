"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { getTopicVocabularies } from "@/services/client/book.service";
import NodeTermList from "./node.term.list";

interface Props {
    topicId: string;
    open: boolean;
    onClose: () => void;
}

/** Dialog liệt kê toàn bộ từ vựng của chủ đề (nút "Xem danh sách từ vựng"). */
export function TopicVocabDialog({ topicId, open, onClose }: Props) {
    const t = useTranslations("marugoto.path");
    const { data, isLoading, isError } = useQuery({
        queryKey: ["topic-vocab", topicId],
        queryFn: () => getTopicVocabularies(topicId),
        enabled: open && !!topicId,
    });
    const items = data?.vocabularies ?? [];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: "16px",
                        bgcolor: "var(--color-bgc-app)",
                        backgroundImage: "none",
                    },
                },
            }}
        >
            <DialogTitle
                sx={{ fontWeight: 700, color: "var(--color-text-contrast)" }}
            >
                {t("topicVocabList")}
            </DialogTitle>
            <DialogContent>
                {isLoading ? (
                    <div className="bg-bgc-page h-40 animate-pulse rounded-xl" />
                ) : isError ? (
                    <p className="py-4 text-center text-sm text-red-500">
                        {t("vocabLoadFailed")}
                    </p>
                ) : items.length > 0 ? (
                    <NodeTermList items={items} />
                ) : (
                    <p className="text-text-muted py-4 text-center text-sm">
                        {t("vocabEmpty")}
                    </p>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default TopicVocabDialog;
