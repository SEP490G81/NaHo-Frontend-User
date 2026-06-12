import { StaticRoute } from "@/i18n/type";
import { Messages } from "next-intl";
import React from "react";

export interface SettingsMenuItem {
    id: string;
    titleKey: SettingsMenuTitleKey;
    redirectLink: StaticRoute;
    icon: React.ReactNode;
}

export interface SettingSearchItem {
    id: string;
    title: string;
    keywords: string[];
    route: string;
    targetId: string;
}

type SettingsMenuTitleKey = keyof Messages["settings"]["page"];
