"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ChatSidebarLogoProps {
    readonly isCollapsed?: boolean;
}

const ChatSidebarLogo = ({ isCollapsed = false }: ChatSidebarLogoProps) => {
    const t = useTranslations("common.layout.chatroomSidebar");

    return (
        <div className="flex items-center justify-center">
            <Link
                href="/dashboard"
                className="flex items-center gap-x-2.5 transition-transform select-none hover:scale-[1.02]"
            >
                <Image
                    src="/logo.png"
                    alt="app-logo"
                    width={38}
                    height={38}
                    priority
                />
                {!isCollapsed && (
                    <div className="flex flex-col">
                        <h1 className="text-text-contrast text-lg leading-tight font-bold tracking-wider">
                            {t("brandTitle")}
                        </h1>
                    </div>
                )}
            </Link>
        </div>
    );
};

export default ChatSidebarLogo;
