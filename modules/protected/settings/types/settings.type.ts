import { StaticRoute } from "@/intl/type";
import { Messages } from "next-intl";
import React from "react";

export interface SettingsMenuItem {
    id: string;
    titleKey: SettingsMenuTitleKey;
    redirectLink: StaticRoute;
    icon: React.ReactNode;
}

type SettingsMenuTitleKey = keyof Messages["page"]["settings"]["title"];
