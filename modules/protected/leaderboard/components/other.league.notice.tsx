"use client";
import React from "react";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";

interface OtherLeagueNoticeProps {
    myLeagueName: string;
}

export function OtherLeagueNotice({
    myLeagueName,
}: Readonly<OtherLeagueNoticeProps>) {
    const t = useTranslations("leaderboard");

    return (
        <div className="border-bdc-primary bg-bgc-app text-text-muted flex items-center gap-2 rounded-2xl border px-5 py-3 text-xs">
            <Info className="h-4 w-4 shrink-0" />
            {t("otherLeagueNotice", { league: myLeagueName })}
        </div>
    );
}

export default OtherLeagueNotice;
