"use client";
import React, { useState } from "react";
import { Badge, Button, CircularProgress, Popover } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";
import {
    getNotifications,
    getUnreadCount,
    markAllNotificationsRead,
    markNotificationRead,
} from "@/services/client/notification.service";
import type { NotificationResponse } from "@/types/responses/notification.response";

const NotificationButton = () => {
    const t = useTranslations("common.layout.header");
    const qc = useQueryClient();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    // Badge chưa đọc: poll định kỳ (BE có SSE nhưng chưa rõ tên event noti → poll).
    const unreadQ = useQuery({
        queryKey: ["notifications-unread"],
        queryFn: getUnreadCount,
        refetchInterval: 45000,
        staleTime: 30000,
    });
    const listQ = useQuery({
        queryKey: ["notifications-list"],
        queryFn: () => getNotifications(15, 0),
        enabled: open,
    });

    const refresh = () => {
        qc.invalidateQueries({ queryKey: ["notifications-unread"] });
        qc.invalidateQueries({ queryKey: ["notifications-list"] });
    };
    const readM = useMutation({
        mutationFn: (id: number) => markNotificationRead(id),
        onSuccess: refresh,
    });
    const readAllM = useMutation({
        mutationFn: () => markAllNotificationsRead(),
        onSuccess: refresh,
    });

    const onItemClick = (n: NotificationResponse) => {
        if (!n.isRead) readM.mutate(n.id);
        setAnchorEl(null);
        if (n.targetUrl) router.push(n.targetUrl as AllRoute);
    };

    const items = listQ.data ?? [];
    const unread = unreadQ.data ?? 0;

    return (
        <>
            <Button
                variant="outlined"
                color="primary"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ width: "40px", minWidth: "40px", height: "40px" }}
            >
                <Badge badgeContent={unread} color="error" max={99}>
                    <NotificationsNoneOutlinedIcon />
                </Badge>
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            width: 360,
                            maxWidth: "90vw",
                            borderRadius: "14px",
                            bgcolor: "var(--color-bgc-app)",
                            backgroundImage: "none",
                            border: "1px solid var(--color-bdc-primary)",
                        },
                    },
                }}
            >
                <div className="border-bdc-primary flex items-center justify-between border-b px-4 py-3">
                    <span className="text-text-contrast text-sm font-bold">
                        {t("notifications")}
                    </span>
                    {unread > 0 && (
                        <button
                            type="button"
                            onClick={() => readAllM.mutate()}
                            className="text-bgc-highlight cursor-pointer text-xs font-semibold hover:underline"
                        >
                            {t("markAllRead")}
                        </button>
                    )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {listQ.isLoading ? (
                        <div className="flex justify-center py-8">
                            <CircularProgress size={22} />
                        </div>
                    ) : items.length === 0 ? (
                        <p className="text-text-muted py-8 text-center text-sm">
                            {t("noNotifications")}
                        </p>
                    ) : (
                        items.map((n) => (
                            <button
                                key={n.id}
                                type="button"
                                onClick={() => onItemClick(n)}
                                className={`border-bdc-primary hover:bg-bgc-page flex w-full items-start gap-2.5 border-b px-4 py-3 text-left transition-colors last:border-0 ${
                                    n.isRead ? "" : "bg-bgc-highlight/5"
                                }`}
                            >
                                <span
                                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                                        n.isRead
                                            ? "bg-transparent"
                                            : "bg-bgc-highlight"
                                    }`}
                                />
                                <span className="min-w-0 flex-1">
                                    <span className="text-text-contrast block text-sm font-semibold">
                                        {n.title}
                                    </span>
                                    <span className="text-text-muted mt-0.5 line-clamp-2 block text-xs">
                                        {n.content}
                                    </span>
                                </span>
                            </button>
                        ))
                    )}
                </div>
            </Popover>
        </>
    );
};

export default NotificationButton;
