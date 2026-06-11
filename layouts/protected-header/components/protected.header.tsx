"use client";
import React, { useEffect } from "react";
import { Link, usePathname } from "@/intl/i18n/navigation";
import { useTranslations } from "next-intl";
import NotificationButton from "@/layouts/protected-header/features/notification.button";
import LanguageSwitch from "@/components/ui/language.switch";
import ThemeSwitchButton from "@/layouts/public-header/components/theme.switch.button";
import UserAvatar from "@/layouts/protected-header/components/user.avatar";

const ProtectedHeader = () => {
    const t = useTranslations();
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname.includes("/settings")) {
            sessionStorage.setItem("last_non_settings_path", pathname);
        }
    }, [pathname]);

    return (
        <div className="border-b-bdc-primary bg-bgc-app sticky top-0 left-0 z-10 flex items-center justify-between border-b px-3 py-3.5">
            <Link href={"/dashboard"}>{t("appName")}</Link>
            <div className="flex items-center gap-x-3">
                <NotificationButton />
                <LanguageSwitch
                    variant="icon-button"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                />
                <ThemeSwitchButton />
                <UserAvatar />
            </div>
        </div>
    );
};

export default ProtectedHeader;
