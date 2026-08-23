"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Chip } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { SuggestedRepliesProps } from "../types/live.chatroom.type";

const SuggestedRepliesComponent = ({
    suggestions,
    onSelectSuggestion,
    isVisible = true,
}: SuggestedRepliesProps) => {
    const t = useTranslations("liveChatroom");

    if (!suggestions || suggestions.length === 0 || !isVisible) {
        return null;
    }

    return (
        <div className="mb-2 space-y-1.5 px-1">
            <p className="text-text-muted text-[11px] font-medium flex items-center gap-1">
                <LightbulbOutlinedIcon sx={{ fontSize: 14 }} className="text-amber-500" />
                {t("suggestionLabel")}
            </p>
            <div className="flex flex-wrap gap-1.5">
                {suggestions.map((item, index) => (
                    <Chip
                        key={`${item}-${index}`}
                        label={item}
                        size="small"
                        onClick={() => onSelectSuggestion(item)}
                        sx={{
                            fontSize: "12px",
                            height: "26px",
                            borderRadius: "8px",
                            backgroundColor: "var(--color-bgc-secondary)",
                            color: "var(--color-text-contrast)",
                            border: "1px solid var(--color-bdc-primary)",
                            "&:hover": {
                                backgroundColor: "var(--color-bgc-highlight)",
                                color: "#ffffff",
                                borderColor: "var(--color-bgc-highlight)",
                            },
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default SuggestedRepliesComponent;
