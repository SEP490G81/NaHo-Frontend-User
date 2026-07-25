import { StaticRoute } from "@/i18n/type";
import { Messages } from "next-intl";
import React from "react";

export interface AccountMenuLinkItem {
    id: string;
    titleKey: AccountMenuTitleKey;
    redirectLink: StaticRoute;
    icon: React.ReactNode;
    type: "LINK";
}

export interface AccountMenuStaticItem {
    id: string;
    component: React.ReactNode;
    type: "STATIC";
}

type AccountMenuTitleKey =
    keyof Messages["common"]["layout"]["header"]["accountMenu"];
