"use client";
import React from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { Link } from "@/i18n/navigation";

const SettingsButton = () => {
    const t = useTranslations("common.metadata.title");

    return (
        <TooltipCustom arrow title={t("settings")}>
            <Button
                component={Link}
                href="/settings"
                variant="outlined"
                color="primary"
                sx={{
                    width: "40px",
                    minWidth: "40px",
                    height: "40px",
                }}
            >
                <SettingsOutlinedIcon fontSize="small" />
            </Button>
        </TooltipCustom>
    );
};

export default SettingsButton;
