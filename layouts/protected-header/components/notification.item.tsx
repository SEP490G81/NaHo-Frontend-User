"use client";

import React from "react";
import type { NotificationResponse } from "@/types/responses/notification.response";

type NotificationItemProps = Readonly<{
    notification: NotificationResponse;
    onSelect: (notification: NotificationResponse) => void;
}>;

/**
 * Một dòng thông báo trong popover chuông. Đã đọc thì tắt chấm và làm mờ cả
 * dòng để tách hẳn khỏi thông báo chưa đọc; hover thì sáng lại cho dễ đọc.
 */
const NotificationItem = ({
    notification,
    onSelect,
}: NotificationItemProps) => {
    const { isRead, title, content } = notification;

    return (
        <button
            type="button"
            onClick={() => onSelect(notification)}
            className={`border-bdc-primary hover:bg-bgc-page flex w-full cursor-pointer items-start gap-2.5 border-b px-4 py-3 text-left transition-all last:border-0 ${
                isRead ? "opacity-60 hover:opacity-100" : "bg-bgc-highlight/5"
            }`}
        >
            <span
                aria-hidden
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full transition-colors ${
                    isRead ? "bg-transparent" : "bg-bgc-highlight"
                }`}
            />
            <span className="min-w-0 flex-1">
                <span
                    className={`text-text-contrast block text-sm ${
                        isRead ? "font-medium" : "font-semibold"
                    }`}
                >
                    {title}
                </span>
                <span className="text-text-muted mt-0.5 line-clamp-2 block text-xs">
                    {content}
                </span>
            </span>
        </button>
    );
};

export default NotificationItem;
