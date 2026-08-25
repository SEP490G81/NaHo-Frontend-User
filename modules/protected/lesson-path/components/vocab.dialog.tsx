"use client";
import React, { useCallback } from "react";
import { BookOpen, Check } from "lucide-react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useTranslations } from "next-intl";
import type { NodeVocabularyItem } from "@/types/responses/learning.response";
import type { Vocab } from "@/data/marugoto/types";
import { useMarugotoStore } from "@/store/marugotoStore";
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
    /** PathNode.id — key lưu vị trí thẻ/tiến trình ghi âm vào store (persist),
     *  sống ngoài dialog nên không mất khi dialog bị unmount/remount. */
    progressKey?: string;
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
    progressKey,
}: Props) {
    const t = useTranslations("marugoto");
    const items = vocab.map(toVocab);

    // Vị trí thẻ đang xem + đã "Hoàn thành" hay chưa — lưu ở store (persist),
    // key theo node, tự tách bộ nhớ giữa các node khác nhau và không mất khi
    // dialog bị đóng/mở lại hoặc bị unmount/remount ngoài ý muốn.
    const stored = useMarugotoStore((s) =>
        progressKey ? s.vocabDialogProgress[progressKey] : undefined,
    );
    const setStoredProgress = useMarugotoStore((s) => s.setVocabDialogProgress);
    const cardIndex = stored?.cardIndex ?? 0;
    // "Đã ghi âm đạt thẻ cuối" — phản ánh lần ghi âm GẦN NHẤT (không kẹt true
    // mãi sau 1 lần đạt rồi ghi âm lại fail, xem onLastCardPassChange).
    const lastCardPassed = stored?.lastCardPassed ?? false;
    // Patch từng phần qua store (store tự gộp với progress cũ + bỏ qua nếu
    // không đổi) — nhờ vậy 2 hàm này KHÔNG cần đóng gói cardIndex/lastCardPassed,
    // giữ được reference ổn định giữa các lần render. Cần thiết vì FlashcardDeck
    // dùng onLastCardPassChange làm dependency của effect: nếu hàm đổi reference
    // mỗi render sẽ khiến effect chạy lại → gọi lại setState → re-render → lặp vô hạn.
    const setCardIndex = useCallback(
        (index: number) => {
            if (!progressKey) return;
            setStoredProgress(progressKey, { cardIndex: index });
        },
        [progressKey, setStoredProgress],
    );
    const setLastCardPassed = useCallback(
        (passed: boolean) => {
            if (!progressKey) return;
            setStoredProgress(progressKey, { lastCardPassed: passed });
        },
        [progressKey, setStoredProgress],
    );
    // Không có thẻ nào (không hiện FlashcardDeck) thì không có gì để ghi âm nên
    // cho "Hoàn thành" luôn. CHỈ trường hợp này — kể cả đúng 1 thẻ vẫn phải ghi
    // âm đạt thẻ đó (FlashcardDeck tự coi thẻ #1 là thẻ cuối khi total = 1, nên
    // luồng bình thường đã yêu cầu đúng, không cần bypass thêm ở đây).
    const canFinish = lastCardPassed || (!loading && items.length === 0);

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
                        cardIndex={cardIndex}
                        onCardIndexChange={setCardIndex}
                        onLastCardPassChange={setLastCardPassed}
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
