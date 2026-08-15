"use client";
import React, { useState } from "react";
import { Badge, Button, CircularProgress, Popover } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";
import NotificationItem from "@/layouts/protected-header/components/notification.item";
import { useNotificationStream } from "@/layouts/protected-header/hooks/use.notification.stream";
import { useNotifications } from "@/layouts/protected-header/hooks/use.notifications";
import type { NotificationResponse } from "@/types/responses/notification.response";

const NotificationButton = () => {
    const t = useTranslations("common.layout.header");
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    // Realtime: BE đẩy event NOTIFICATION qua SSE, hook tự cập nhật cache.
    const { hasNewNotification, clearNewNotification } =
        useNotificationStream();
    const { items, unreadCount, isLoading, markRead, markAllRead } =
        useNotifications(open);

    const onItemClick = (n: NotificationResponse) => {
        if (!n.isRead) markRead.mutate(n.id);
        setAnchorEl(null);
        if (n.targetUrl) router.push(n.targetUrl as AllRoute);
    };

    return (
        <>
            <Button
                variant="outlined"
                color="primary"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ width: "40px", minWidth: "40px", height: "40px" }}
            >
                <Badge badgeContent={unreadCount} color="error" max={99}>
                    <span
                        onAnimationEnd={clearNewNotification}
                        className={`inline-flex origin-top ${
                            hasNewNotification ? "animate-naho-bell-ring" : ""
                        }`}
                    >
                        <NotificationsNoneOutlinedIcon />
                    </span>
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
                    {unreadCount > 0 && (
                        <button
                            type="button"
                            disabled={markAllRead.isPending}
                            onClick={() => markAllRead.mutate()}
                            className="text-bgc-highlight flex cursor-pointer items-center gap-1.5 text-xs font-semibold hover:underline disabled:cursor-default disabled:opacity-60"
                        >
                            {markAllRead.isPending && (
                                <CircularProgress size={12} color="inherit" />
                            )}
                            {t("markAllRead")}
                        </button>
                    )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <CircularProgress size={22} />
                        </div>
                    ) : items.length === 0 ? (
                        <p className="text-text-muted py-8 text-center text-sm">
                            {t("noNotifications")}
                        </p>
                    ) : (
                        items.map((n) => (
                            <NotificationItem
                                key={n.id}
                                notification={n}
                                onSelect={onItemClick}
                            />
                        ))
                    )}
                </div>
            </Popover>
        </>
    );
};

export default NotificationButton;
