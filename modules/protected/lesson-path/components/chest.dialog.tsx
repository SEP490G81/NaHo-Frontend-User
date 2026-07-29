"use client";
import React from "react";
import { Check, Gift } from "lucide-react";
import { Button, Dialog, DialogContent } from "@mui/material";
import { useTranslations } from "next-intl";
import type { LearningPathNodeDetailResponseChestDetailResponse } from "@/types/responses/learning.response";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    chest: LearningPathNodeDetailResponseChestDetailResponse | null;
    loading?: boolean;
    claimed: boolean;
    /** Điểm thực nhận sau khi mở (reveal ngay trong dialog); null = chưa mở. */
    earned?: number | null;
    onClaim: () => void;
    accent: string;
}

const ACCENT = "var(--book-accent, var(--color-bgc-highlight))";

/** Hộp thoại rương thưởng: khoe khoảng điểm trước khi mở, hiện điểm thật sau khi mở. */
export function ChestDialog({
    open,
    onOpenChange,
    chest,
    loading,
    claimed,
    earned,
    onClaim,
    accent,
}: Props) {
    const t = useTranslations("marugoto");
    const revealed = earned != null;

    // Khoảng điểm ngẫu nhiên rút từ mô tả của BE (vd "…từ 30 đến 50 điểm").
    const nums = chest?.description?.match(/\d+/g)?.map(Number) ?? [];
    const hasRange = nums.length >= 2;

    return (
        <Dialog
            open={open}
            onClose={() => onOpenChange(false)}
            maxWidth="xs"
            fullWidth
            sx={{
                "& .MuiPaper-root": {
                    "--book-accent": accent,
                    backgroundColor: "var(--color-bgc-app)",
                    color: "var(--color-text-contrast)",
                    border: "1px solid var(--color-bdc-primary)",
                    borderRadius: "16px",
                },
            }}
        >
            <DialogContent>
                {loading && !revealed ? (
                    <div className="bg-bgc-page h-40 animate-pulse rounded-xl" />
                ) : (
                    <div className="flex flex-col items-center gap-3 py-2 text-center">
                        <span
                            className="flex h-20 w-20 items-center justify-center rounded-full text-white"
                            style={{
                                background:
                                    "radial-gradient(120% 120% at 50% 22%, #f8d67a 0%, #f4b740 46%, #d8931f 100%)",
                                boxShadow: "0 8px 0 0 #b9791a",
                            }}
                        >
                            {revealed ? (
                                <Check
                                    className="h-10 w-10"
                                    strokeWidth={2.6}
                                />
                            ) : (
                                <Gift className="h-10 w-10" strokeWidth={2.4} />
                            )}
                        </span>
                        <h2 className="text-text-contrast mt-2 text-lg font-bold">
                            {chest?.title || t("node.chestTitle")}
                        </h2>

                        {revealed ? (
                            <>
                                <p className="text-text-muted text-sm">
                                    {t("node.chestGotLabel")}
                                </p>
                                <p
                                    className="text-3xl font-black"
                                    style={{ color: ACCENT }}
                                >
                                    {t("node.chestReward", {
                                        point: earned ?? 0,
                                    })}
                                </p>
                                <Button
                                    onClick={() => onOpenChange(false)}
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        mt: 1,
                                        textTransform: "none",
                                        fontWeight: 700,
                                        borderRadius: "12px",
                                        backgroundColor: ACCENT,
                                        color: "var(--color-text-pure)",
                                        "&:hover": {
                                            backgroundColor: ACCENT,
                                            opacity: 0.92,
                                        },
                                    }}
                                >
                                    {t("vocab.close")}
                                </Button>
                            </>
                        ) : claimed ? (
                            <>
                                <p className="text-text-muted text-2xl font-black">
                                    {t("node.chestOpened")}
                                </p>
                                <Button
                                    disabled
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        mt: 1,
                                        textTransform: "none",
                                        fontWeight: 700,
                                        borderRadius: "12px",
                                    }}
                                >
                                    {t("node.chestOpened")}
                                </Button>
                            </>
                        ) : (
                            <>
                                <p className="text-text-muted text-sm">
                                    {t("node.chestRangeHint")}
                                </p>
                                <p
                                    className="text-3xl font-black"
                                    style={{ color: ACCENT }}
                                >
                                    {hasRange
                                        ? t("node.chestRange", {
                                              min: nums[0],
                                              max: nums[1],
                                          })
                                        : t("node.chestMystery")}
                                </p>
                                <Button
                                    onClick={onClaim}
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        mt: 1,
                                        textTransform: "none",
                                        fontWeight: 700,
                                        borderRadius: "12px",
                                        backgroundColor: ACCENT,
                                        color: "var(--color-text-pure)",
                                        "&:hover": {
                                            backgroundColor: ACCENT,
                                            opacity: 0.92,
                                        },
                                    }}
                                >
                                    {t("node.chestClaimBtn")}
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ChestDialog;
