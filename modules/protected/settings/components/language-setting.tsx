"use client";

import React from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { AppLocale, applyLocale } from "@/libs/locale";

export function LanguageSetting() {
    const t = useTranslations("settings.general");
    const tLang = useTranslations("common.metadata.language");
    const currentLocale = useLocale() as AppLocale;

    return (
        <div
            id="setting-language"
            data-setting-id="setting-language"
            className="border-bdc-primary/60 bg-bgc-app rounded-xl border p-6 transition-all duration-300"
        >
            <div className="mb-4">
                <h2 className="text-text-contrast flex items-center gap-2 text-base font-bold">
                    <LanguageOutlinedIcon fontSize="small" />
                    {t("languageTitle")}
                </h2>
                <p className="text-text-muted text-xs">{t("languageDesc")}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {routing.locales.map((locale) => {
                    const isSelected = currentLocale === locale;
                    return (
                        <button
                            key={locale}
                            type="button"
                            onClick={() => applyLocale(locale)}
                            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all duration-200 ${
                                isSelected
                                    ? "border-text-highlight text-text-highlight bg-pink-50/20 font-bold dark:bg-pink-950/20"
                                    : "border-bdc-primary hover:border-bdc-muted bg-bgc-modal text-text-contrast font-medium"
                            }`}
                        >
                            <span className="text-sm">
                                {tLang(locale as "vi" | "en" | "jp")}
                            </span>
                            {isSelected ? (
                                <CheckCircleRoundedIcon className="text-text-highlight text-lg" />
                            ) : (
                                <RadioButtonUncheckedIcon className="text-text-muted text-lg" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default LanguageSetting;
