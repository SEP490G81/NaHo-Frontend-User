"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@mui/material/Button";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export function UpgradeBanner() {
    const t = useTranslations("dashboard");

    return (
        <div className="relative overflow-hidden rounded-2xl border border-[#ff99ac]/50 bg-gradient-to-br from-[#ff99ac]/15 via-bgc-card to-bgc-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff99ac]/20 px-3 py-0.5 text-xs font-extrabold uppercase tracking-wider border border-[#ff99ac]/40 text-[#ff758f]">
                    <AutoAwesomeIcon style={{ fontSize: 13 }} />
                    <span>{t("upgradeBannerTag")}</span>
                </div>

                <h3 className="text-base font-extrabold text-text-primary leading-snug">
                    {t("upgradeBannerTitle")}
                </h3>

                <p className="text-xs text-text-muted leading-relaxed">
                    {t("upgradeBannerSubtitle")}
                </p>

                <div className="pt-1">
                    <Button
                        component={Link}
                        href="/settings/billing"
                        variant="contained"
                        fullWidth
                        size="medium"
                        startIcon={<WorkspacePremiumIcon fontSize="small" />}
                        endIcon={<ArrowForwardIcon fontSize="small" />}
                        className="bg-[#ff758f] hover:bg-[#ff99ac] font-bold text-white shadow-md transition-transform active:scale-95 py-2.5 rounded-xl text-xs"
                    >
                        {t("upgradeBannerBtn")}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UpgradeBanner;
