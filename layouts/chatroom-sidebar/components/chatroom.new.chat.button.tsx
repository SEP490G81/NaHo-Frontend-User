"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import EditIcon from "@/components/ui/icons/edit.icon";

interface Props {
    readonly isCollapsed?: boolean;
    readonly onClick?: () => void;
}

const ChatroomNewChatButton = ({
    isCollapsed = false,
    onClick,
}: Readonly<Props>) => {
    const t = useTranslations("common.layout.chatroomSidebar");

    if (isCollapsed) {
        return (
            <div className="flex justify-center px-1.5 pt-2.5 pb-1">
                <TooltipCustom title={t("newChat")} placement="right" arrow>
                    <Link
                        href="/dialogue-setup"
                        onClick={onClick}
                        className="text-text-contrast hover:bg-hbgc-app flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-colors duration-150 active:scale-95"
                    >
                        <EditIcon className="h-5 w-5" />
                    </Link>
                </TooltipCustom>
            </div>
        );
    }

    return (
        <div className="px-2 pt-2.5 pb-1">
            <Link
                href="/dialogue-setup"
                onClick={onClick}
                className="group hover:bg-hbgc-app text-text-contrast flex w-full cursor-pointer items-center gap-x-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 active:scale-[0.99]"
            >
                <EditIcon className="text-text-contrast h-4.5 w-4.5 shrink-0" />
                <span className="truncate">{t("newChat")}</span>
            </Link>
        </div>
    );
};

export default ChatroomNewChatButton;
