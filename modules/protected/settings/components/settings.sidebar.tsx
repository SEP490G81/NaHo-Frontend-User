"use client";
import React from "react";
import { SETTING_MENU_ITEMS } from "@/modules/protected/settings/constants/settings.constant";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import SettingsSearchBox from "@/modules/protected/settings/components/settings.search.box";
import { Divider } from "@mui/material";
import BackButton from "@/components/ui/back.button";
import { cn } from "@/libs/utils";

const SettingsSidebar = () => {
    const tRaw = useTranslations();
    const t = tRaw as (key: string) => string;
    const pathname = usePathname();

    return (
        <div className="flex w-full flex-col">
            <div className="mb-3">
                <BackButton label={t("common.metadata.back") || "Quay lại"} />
            </div>

            <SettingsSearchBox />

            <Divider sx={{ marginBlock: "20px" }} />

            <div className="flex flex-col gap-y-1.5">
                {SETTING_MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.redirectLink;

                    return (
                        <Link
                            href={item.redirectLink}
                            key={item.id}
                            className={cn(
                                "relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ease-in-out",
                                isActive
                                    ? "bg-bgc-highlight/15 text-bgc-highlight font-semibold"
                                    : "text-text-contrast hover:bg-hbgc-app hover:translate-x-1",
                            )}
                        >
                            {isActive && (
                                <span className="bg-bgc-highlight absolute top-1/4 left-0 h-1/2 w-1 rounded-r-md" />
                            )}
                            <span
                                className={cn(
                                    "flex h-4.5 w-4.5 shrink-0 items-center justify-center transition-transform duration-200",
                                    isActive
                                        ? "text-bgc-highlight"
                                        : "text-text-muted",
                                )}
                            >
                                {item.icon}
                            </span>
                            <span
                                className={cn(
                                    "flex-1 truncate text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "text-bgc-highlight font-semibold"
                                        : "text-text-contrast",
                                )}
                            >
                                {t(`settings.page.${item.titleKey}`)}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default SettingsSidebar;
