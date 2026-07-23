"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@mui/material";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { AllRoute } from "@/i18n/type";

interface SandboxHeaderProps {
    backHref: string;
    accent: string;
}

export function SandboxHeader({ backHref, accent }: SandboxHeaderProps) {
    const t = useTranslations("sandbox");
    return (
        <header className="flex flex-wrap items-center justify-between gap-3">
            <Button
                component={Link}
                href={backHref as AllRoute}
                variant="text"
                startIcon={<ArrowLeft className="h-4 w-4" />}
                sx={{
                    textTransform: "none",
                    color: accent,
                    fontWeight: 600,
                    "&:hover": {
                        backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
                    },
                }}
            >
                {t("backToTopic")}
            </Button>
        </header>
    );
}

export default SandboxHeader;
