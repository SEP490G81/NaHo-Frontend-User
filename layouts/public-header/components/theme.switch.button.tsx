"use client";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { Button, useColorScheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";

const ThemeSwitchButton = () => {
    const { mode, setMode, systemMode } = useColorScheme();
    const t = useTranslations("common.layout.header.themeSwitchButton");

    const currentMode = mode === "system" ? systemMode : mode;

    const handleChangeMode = () => {
        if (currentMode === "dark") {
            setMode("light");
        } else {
            setMode("dark");
        }
    };

    return (
        <TooltipCustom
            arrow
            title={currentMode === "light" ? t("darkMode") : t("lightMode")}
        >
            <Button
                onClick={handleChangeMode}
                variant="outlined"
                color="primary"
                sx={{
                    width: "40px",
                    minWidth: "40px",
                    height: "40px",
                }}
            >
                {currentMode === "light" ? (
                    <DarkModeOutlinedIcon fontSize="small" />
                ) : (
                    <LightModeOutlinedIcon fontSize="small" />
                )}
            </Button>
        </TooltipCustom>
    );
};

export default ThemeSwitchButton;
