"use client";

import React, { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use.current.user";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@mui/material";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";

export default function SseProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { data: user } = useCurrentUser();
    const queryClient = useQueryClient();
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const t = useTranslations("common");

    useEffect(() => {
        if (!user) return;

        let eventSource: EventSource | null = null;
        let isMounted = true;
        let retryTimeoutId: NodeJS.Timeout;

        const connect = () => {
            if (!isMounted) return;

            console.log("Establishing SSE Connection...");
            eventSource = new EventSource("/api/sse/connect");

            eventSource.addEventListener(
                "FORCE_LOGOUT_EVENT",
                async (event) => {
                    console.log(
                        "Received FORCE_LOGOUT_EVENT event:",
                        event.data,
                    );
                    const rawData = event.data || "";
                    const normalizedData = rawData.replace(/^"|"$/g, "");

                    if (normalizedData === "LOGIN_ON_OTHER_DEVICE") {
                        if (eventSource) {
                            eventSource.close();
                        }

                        // 1. Clear cookies immediately via local endpoint
                        try {
                            await fetch("/api/auth/clear-cookies", {
                                method: "POST",
                            });
                        } catch (error) {
                            console.error("Failed to clear cookies:", error);
                        }

                        // 2. Clear local states
                        queryClient.setQueryData(
                            queryKeys.auth.currentUser,
                            null,
                        );
                        queryClient.clear();
                        useAuthStore.getState().logout();

                        // 3. Show popup
                        setShowModal(true);
                    }
                },
            );

            eventSource.onerror = (error) => {
                console.error("SSE connection error:", error);
                if (eventSource) {
                    eventSource.close();
                }

                // Retry connection after 5 seconds if the user is still logged in
                retryTimeoutId = setTimeout(() => {
                    if (isMounted && user) {
                        connect();
                    }
                }, 5000);
            };
        };

        connect();

        return () => {
            isMounted = false;
            if (eventSource) {
                eventSource.close();
            }
            clearTimeout(retryTimeoutId);
        };
    }, [user, queryClient]);

    const handleGoToLogin = () => {
        setShowModal(false);
        router.replace("/login");
    };

    return (
        <>
            {children}

            {showModal && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity duration-300" />

                    <div className="border-bdc-primary bg-bgc-app relative w-full max-w-sm transform overflow-hidden rounded-2xl border p-6 text-center shadow-2xl transition-all duration-300 ease-out">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500 dark:bg-red-500/20">
                            <span className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-red-500/20 text-red-600 dark:text-red-400">
                                <PrivacyTipOutlinedIcon fontSize="small" />
                            </span>
                        </div>

                        <h3 className="text-text-contrast mt-4 text-lg font-bold tracking-tight">
                            {t("forceLogout.title")}
                        </h3>

                        <p className="text-text-muted mt-3 mb-5 text-sm leading-relaxed">
                            {t("forceLogout.message")}
                        </p>

                        <Button
                            onClick={handleGoToLogin}
                            variant="contained"
                            color="primary"
                            size="small"
                            fullWidth
                        >
                            {t("forceLogout.button")}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
