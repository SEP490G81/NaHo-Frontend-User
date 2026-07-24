"use client";
import React from "react";
import { Gift } from "lucide-react";
import { Button, Dialog, DialogContent } from "@mui/material";
import { useTranslations } from "next-intl";
import type { LearningPathNodeDetailResponseChestDetailResponse } from "@/types/responses/learning.response";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    chest: LearningPathNodeDetailResponseChestDetailResponse | null;
    loading?: boolean;
    claimed: boolean;
    onClaim: () => void;
}

/** Hộp thoại rương thưởng: hiện điểm nhận được từ BE và nút nhận thưởng. */
export function ChestDialog({
    open,
    onOpenChange,
    chest,
    loading,
    claimed,
    onClaim,
}: Props) {
    const t = useTranslations("marugoto");
    const point = chest?.point ?? 0;

    return (
        <Dialog
            open={open}
            onClose={() => onOpenChange(false)}
            maxWidth="xs"
            fullWidth
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: "var(--color-bgc-app)",
                    color: "var(--color-text-contrast)",
                    border: "1px solid var(--color-bdc-primary)",
                    borderRadius: "16px",
                },
            }}
        >
            <DialogContent>
                {loading ? (
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
                            <Gift className="h-10 w-10" strokeWidth={2.4} />
                        </span>
                        <h2 className="text-text-contrast mt-2 text-lg font-bold">
                            {chest?.title || t("node.chestTitle")}
                        </h2>
                        {chest?.description && (
                            <p className="text-text-muted text-sm">
                                {chest.description}
                            </p>
                        )}
                        <p className="text-text-highlight text-2xl font-black">
                            {t("node.chestReward", { point })}
                        </p>
                        <Button
                            onClick={onClaim}
                            disabled={claimed}
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 1,
                                textTransform: "none",
                                fontWeight: 700,
                                borderRadius: "12px",
                                backgroundColor: "var(--color-bgc-highlight)",
                                "&:hover": {
                                    backgroundColor: "var(--color-bgc-highlight)",
                                    filter: "brightness(0.95)",
                                },
                            }}
                        >
                            {claimed ? t("node.chestOpened") : t("node.chestClaimBtn")}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ChestDialog;
