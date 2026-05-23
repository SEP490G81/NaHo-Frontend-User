"use client";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { Button, useColorScheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";

const ThemeSwitchButton = () => {
    const { mode, setMode } = useColorScheme();
    const t = useTranslations("layout.header.themeSwitchButton");
    if (!mode) {
        return null;
    }

    const handleChangeMode = () => {
        if (mode === "light") setMode("dark");
        if (mode === "dark") setMode("light");
    };

    return (
        <TooltipCustom
            arrow
            title={mode === "light" ? t("darkMode") : t("lightMode")}
        >
            <Button
                onClick={handleChangeMode}
                variant="text"
                color="primary"
                sx={{
                    width: "40px",
                    minWidth: "40px",
                    height: "40px",
                    borderRadius: "50%",
                }}
            >
                {mode === "light" ? (
                    <DarkModeOutlinedIcon />
                ) : (
                    <LightModeOutlinedIcon />
                )}
            </Button>
        </TooltipCustom>
    );
};

export default ThemeSwitchButton;
