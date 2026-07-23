"use client";
import React from "react";
import { History, Mic } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@mui/material";

interface WelcomeBannerProps {
    name: string;
    t: any;
}

export function WelcomeBanner({ name, t }: WelcomeBannerProps) {
    return (
        <div className="border-bdc-primary bg-bgc-app flex flex-col gap-4 rounded-2xl border p-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
                <h1 className="text-text-contrast text-2xl font-bold md:text-3xl">
                    {t("welcome", { name })}
                </h1>
                <p className="text-text-muted text-sm">{t("slogan")}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                    component={Link}
                    href="/books"
                    variant="contained"
                    sx={{
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "var(--color-text-pure)",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                            opacity: 0.9,
                        },
                    }}
                    startIcon={<Mic className="h-4 w-4" />}
                >
                    {t("practiceNow")}
                </Button>
                <Button
                    component={Link}
                    href="/history"
                    variant="outlined"
                    sx={{
                        borderColor: "var(--color-bdc-muted)",
                        color: "var(--color-text-contrast)",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                            borderColor: "var(--color-bdc-primary)",
                            backgroundColor: "var(--color-hbgc-app)",
                        },
                    }}
                    startIcon={<History className="h-4 w-4" />}
                >
                    {t("kaiwaHistory")}
                </Button>
            </div>
        </div>
    );
}

export default WelcomeBanner;
