"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { useTranslations } from "next-intl";

interface Props {
    readonly isCollapsed?: boolean;
    readonly children?: ReactNode;
}

const ChatroomLogoButton = ({ isCollapsed = false, children }: Readonly<Props>) => {
    const t = useTranslations("common.layout.chatroomSidebar");

    return (
        <TooltipCustom
            title={isCollapsed ? t("brandTitle") : ""}
            placement="right"
            arrow
        >
            <div className="flex items-center justify-center">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-x-3 select-none transition-transform hover:opacity-90 active:scale-95"
                >
                    <Image
                        src="/logo.png"
                        alt="app-logo"
                        width={38}
                        height={38}
                        priority
                        className="h-[38px] w-[38px] object-contain drop-shadow-xs"
                    />
                    {!isCollapsed && (
                        children || (
                            <div className="flex flex-col">
                                <span className="text-text-contrast text-lg font-bold tracking-tight">
                                    NaHo
                                </span>
                            </div>
                        )
                    )}
                </Link>
            </div>
        </TooltipCustom>
    );
};

export default ChatroomLogoButton;
