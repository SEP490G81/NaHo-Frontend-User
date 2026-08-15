"use client";
import React from "react";
import { Avatar, Button } from "@mui/material";
import { Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Companion } from "../types/live-chatroom.type";
import { getInitials } from "../utils/get-initials";

interface ReadyStartCardProps {
    companion: Companion;
    onReady: () => void;
    loading?: boolean;
}

export function ReadyStartCard({
    companion,
    onReady,
    loading = false,
}: Readonly<ReadyStartCardProps>) {
    const t = useTranslations("liveChatroom");

    return (
        <div className="my-auto flex flex-col items-center justify-center px-4 py-8 text-center sm:py-12">
            <div className="relative mb-6">
                <div className="absolute -inset-2 rounded-full bg-linear-to-r from-primary/30 to-amber-500/30 blur-lg opacity-70 animate-pulse" />
                <Avatar
                    className={`relative h-20 w-20 sm:h-24 sm:w-24 ${companion.accent} text-2xl sm:text-3xl font-bold shadow-lg border-2 border-white/20`}
                >
                    {getInitials(companion.name)}
                </Avatar>
            </div>

            <div className="max-w-md space-y-2">
                <h3 className="text-text-contrast text-xl sm:text-2xl font-bold tracking-tight">
                    {t("readyTitle")}
                </h3>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                    {t("readyDescription")}
                </p>
                {companion.role && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-bgc-page text-text-muted border border-bdc-primary/50">
                        <span>{companion.name}</span>
                        <span>•</span>
                        <span>{companion.role}</span>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <Button
                    onClick={onReady}
                    disabled={loading}
                    variant="contained"
                    color="primary"
                    className="!h-13 !px-8 !rounded-2xl !font-bold text-white !text-base shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    startIcon={
                        loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <Sparkles className="h-5 w-5" />
                        )
                    }
                >
                    {loading ? t("readyLoading") : t("readyButton")}
                </Button>
            </div>
        </div>
    );
}

export default ReadyStartCard;
