"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@mui/material/Button";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { ContainerBox } from "@/components/ui/container.box";

export function UpgradeBanner() {
    const t = useTranslations("dashboard");

    return (
        <ContainerBox className="via-bgc-card to-bgc-card relative overflow-hidden border border-[#ff99ac]/50 bg-gradient-to-br from-[#ff99ac]/15">
            <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ff99ac]/40 bg-[#ff99ac]/20 px-3 py-0.5 text-xs font-extrabold tracking-wider text-[#ff758f] uppercase">
                    <AutoAwesomeIcon style={{ fontSize: 13 }} />
                    <span>{t("upgradeBannerTag")}</span>
                </div>

                <h3 className="text-text-primary text-base leading-snug font-extrabold">
                    {t("upgradeBannerTitle")}
                </h3>

                <p className="text-text-muted text-xs leading-relaxed">
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
                        className="rounded-xl bg-[#ff758f] py-2.5 text-xs font-bold text-white shadow-md transition-transform hover:bg-[#ff99ac] active:scale-95"
                    >
                        {t("upgradeBannerBtn")}
                    </Button>
                </div>
            </div>
        </ContainerBox>
    );
}

export default UpgradeBanner;
