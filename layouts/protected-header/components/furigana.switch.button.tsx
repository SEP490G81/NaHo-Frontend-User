"use client";
import React from "react";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { useFurigana } from "@/components/providers/app.toggle.furigana.provider";

export const FuriganaSwitchButton = () => {
    const { showFurigana, toggleFurigana } = useFurigana();
    const t = useTranslations("common.layout.header.furiganaSwitchButton");

    return (
        <TooltipCustom
            arrow
            title={showFurigana ? t("hideFurigana") : t("showFurigana")}
        >
            <Button
                onClick={toggleFurigana}
                variant="outlined"
                color="primary"
                sx={{
                    width: "40px",
                    minWidth: "40px",
                    height: "40px",
                    fontFamily: "var(--font-noto-sans-jp), sans-serif",
                    fontWeight: "bold",
                    fontSize: "0.95rem",
                    borderColor: showFurigana
                        ? "var(--color-bgc-highlight)"
                        : "var(--color-bdc-primary)",
                    backgroundColor: showFurigana
                        ? "color-mix(in srgb, var(--color-bgc-highlight) 12%, transparent)"
                        : "transparent",
                    color: showFurigana
                        ? "var(--color-bgc-highlight)"
                        : "var(--color-text-contrast)",
                    "&:hover": {
                        borderColor: "var(--color-bgc-highlight)",
                        backgroundColor:
                            "color-mix(in srgb, var(--color-bgc-highlight) 20%, transparent)",
                    },
                }}
            >
                {showFurigana ? "あ" : "漢"}
            </Button>
        </TooltipCustom>
    );
};

export default FuriganaSwitchButton;
