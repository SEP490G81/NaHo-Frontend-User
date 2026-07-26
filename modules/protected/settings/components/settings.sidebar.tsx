"use client";
import React from "react";
import { SETTING_MENU_ITEMS } from "@/modules/protected/settings/constants/settings.constant";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import SettingsSearchBox from "@/modules/protected/settings/components/settings.search.box";
import { Divider } from "@mui/material";

const SettingsSidebar = () => {
    const t = useTranslations();
    const pathname = usePathname();

    return (
        <div className="flex w-full flex-col gap-y-0.5 p-5">
            <SettingsSearchBox />

            <Divider sx={{ marginBlock: "20px" }} />

            {SETTING_MENU_ITEMS.map((item) => {
                const isActive = pathname === item.redirectLink;
                const activeClassName = isActive
                    ? "text-text-highlight bg-hbgc-page"
                    : "hover:text-text-highlight hover:bg-hbgc-page";

                return (
                    <Link
                        href={item.redirectLink}
                        key={item.id}
                        className={`${activeClassName} flex h-10 items-center justify-start rounded-md px-3 transition-all duration-150 cursor-pointer`}
                    >
                        <span className="flex h-10 w-10 items-center">
                            {item.icon}
                        </span>
                        <p className="text-sm font-semibold whitespace-nowrap">
                            {t(`settings.page.${item.titleKey}`)}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
};

export default SettingsSidebar;
