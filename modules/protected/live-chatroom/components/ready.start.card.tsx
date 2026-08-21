"use client";
import React from "react";
import { Avatar, Button } from "@mui/material";
import { Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Companion } from "../types/live.chatroom.type";
import { getInitials } from "../utils/get.initials";

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
                <div className="from-primary/30 absolute -inset-2 animate-pulse rounded-full bg-linear-to-r to-amber-500/30 opacity-70 blur-lg" />
                <Avatar
                    className={`relative h-20 w-20 sm:h-24 sm:w-24 ${companion.accent} text-2xl font-bold sm:text-3xl shadow-lg border-2 border-white/20`}
                >
                    {getInitials(companion.name)}
                </Avatar>
            </div>

            <div className="max-w-md space-y-2">
                <h3 className="text-text-contrast text-xl font-bold tracking-tight sm:text-2xl">
                    {t("readyTitle")}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed sm:text-base">
                    {t("readyDescription")}
                </p>
                {companion.role && (
                    <div className="bg-bgc-page text-text-muted border-bdc-primary/50 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
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
                    className="h-13! rounded-2xl! px-8! text-base! font-bold! text-white shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
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
