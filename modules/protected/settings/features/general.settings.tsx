"use client";
import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { useColorScheme, Divider } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { routing } from "@/i18n/routing";
import { AppLocale, applyLocale } from "@/libs/locale";
import { useSettingHighlight } from "@/modules/protected/settings/hooks/use.setting.highlight";
import BackButton from "@/components/ui/back.button";

const GeneralSettings = () => {
    const t = useTranslations("settings.general");
    const tLang = useTranslations("common.metadata.language");
    const tCommonRaw = useTranslations("common.metadata");
    const tCommon = tCommonRaw as (key: string) => string;
    const currentLocale = useLocale() as AppLocale;
    const { mode, setMode } = useColorScheme();
    useSettingHighlight();

    const handleThemeChange = (selectedMode: "light" | "dark" | "system") => {
        setMode(selectedMode);
    };

    return (
        <div className="flex flex-col gap-y-6 w-full max-w-5xl mx-auto pb-12">
            {/* Part 1 Header */}
            <div>
                <BackButton label={tCommon("back") || "Quay lại"} className="mb-4 md:hidden" />
                <h1 className="text-2xl font-bold text-text-contrast">
                    {t("title")}
                </h1>
                <p className="mt-1 text-sm text-text-muted">
                    {t("description")}
                </p>
            </div>

            <Divider className="border-bdc-primary/50" />

            {/* Section 1: Appearance (Giao diện) */}
            <div
                id="setting-appearance"
                data-setting-id="setting-appearance"
                className="rounded-xl border border-bdc-primary/60 bg-bgc-app p-6 transition-all duration-300"
            >
                <div className="mb-4">
                    <h2 className="text-base font-bold text-text-contrast">
                        {t("appearanceTitle")}
                    </h2>
                    <p className="text-xs text-text-muted">
                        {t("appearanceDesc")}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Light Mode Card */}
                    <button
                        type="button"
                        onClick={() => handleThemeChange("light")}
                        className={`group relative flex flex-col overflow-hidden rounded-xl border-2 p-3 text-left transition-all duration-200 cursor-pointer ${
                            mode === "light"
                                ? "border-text-highlight bg-pink-50/20 dark:bg-pink-950/20 shadow-md"
                                : "border-bdc-primary hover:border-bdc-muted bg-bgc-modal"
                        }`}
                    >
                        <div className="h-28 w-full overflow-hidden rounded-lg border border-bdc-primary/40 bg-white p-2 flex flex-col justify-between">
                            <div className="h-3 w-full rounded bg-gray-100 flex items-center px-1 gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                            </div>
                            <div className="grid grid-cols-3 gap-1 flex-1 my-1.5">
                                <div className="rounded bg-gray-100" />
                                <div className="rounded bg-gray-50 col-span-2" />
                            </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between px-1">
                            <span className="text-sm font-semibold text-text-contrast">
                                {t("lightMode")}
                            </span>
                            {mode === "light" ? (
                                <CheckCircleRoundedIcon className="text-text-highlight text-xl" />
                            ) : (
                                <RadioButtonUncheckedIcon className="text-text-muted text-xl" />
                            )}
                        </div>
                    </button>

                    {/* Dark Mode Card */}
                    <button
                        type="button"
                        onClick={() => handleThemeChange("dark")}
                        className={`group relative flex flex-col overflow-hidden rounded-xl border-2 p-3 text-left transition-all duration-200 cursor-pointer ${
                            mode === "dark"
                                ? "border-text-highlight bg-pink-50/20 dark:bg-pink-950/20 shadow-md"
                                : "border-bdc-primary hover:border-bdc-muted bg-bgc-modal"
                        }`}
                    >
                        <div className="h-28 w-full overflow-hidden rounded-lg border border-gray-700 bg-gray-900 p-2 flex flex-col justify-between">
                            <div className="h-3 w-full rounded bg-gray-800 flex items-center px-1 gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                            </div>
                            <div className="grid grid-cols-3 gap-1 flex-1 my-1.5">
                                <div className="rounded bg-gray-800" />
                                <div className="rounded bg-gray-850 col-span-2" />
                            </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between px-1">
                            <span className="text-sm font-semibold text-text-contrast">
                                {t("darkMode")}
                            </span>
                            {mode === "dark" ? (
                                <CheckCircleRoundedIcon className="text-text-highlight text-xl" />
                            ) : (
                                <RadioButtonUncheckedIcon className="text-text-muted text-xl" />
                            )}
                        </div>
                    </button>

                    {/* System Mode Card */}
                    <button
                        type="button"
                        onClick={() => handleThemeChange("system")}
                        className={`group relative flex flex-col overflow-hidden rounded-xl border-2 p-3 text-left transition-all duration-200 cursor-pointer ${
                            mode === "system"
                                ? "border-text-highlight bg-pink-50/20 dark:bg-pink-950/20 shadow-md"
                                : "border-bdc-primary hover:border-bdc-muted bg-bgc-modal"
                        }`}
                    >
                        <div className="h-28 w-full overflow-hidden rounded-lg border border-bdc-primary/40 bg-white p-2 flex flex-col justify-between relative">
                            <div className="absolute inset-y-0 right-0 left-1/2 bg-gray-900 border-l border-gray-700" />
                            <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800 z-10 flex items-center px-1 gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-1 flex-1 my-1.5 z-10 opacity-75">
                                <div className="rounded bg-gray-200 dark:bg-gray-800" />
                                <div className="rounded bg-gray-300 dark:bg-gray-700" />
                            </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between px-1">
                            <span className="text-sm font-semibold text-text-contrast">
                                {t("systemMode")}
                            </span>
                            {mode === "system" ? (
                                <CheckCircleRoundedIcon className="text-text-highlight text-xl" />
                            ) : (
                                <RadioButtonUncheckedIcon className="text-text-muted text-xl" />
                            )}
                        </div>
                    </button>
                </div>
            </div>

            <Divider className="border-bdc-primary/50 my-1" />

            {/* Section 2: Language (Ngôn ngữ) */}
            <div
                id="setting-language"
                data-setting-id="setting-language"
                className="rounded-xl border border-bdc-primary/60 bg-bgc-app p-6 transition-all duration-300"
            >
                <div className="mb-4">
                    <h2 className="text-base font-bold text-text-contrast flex items-center gap-2">
                        <LanguageOutlinedIcon fontSize="small" />
                        {t("languageTitle")}
                    </h2>
                    <p className="text-xs text-text-muted">
                        {t("languageDesc")}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {routing.locales.map((locale) => {
                        const isSelected = currentLocale === locale;
                        return (
                            <button
                                key={locale}
                                type="button"
                                onClick={() => applyLocale(locale)}
                                className={`flex items-center justify-between rounded-xl border p-4 transition-all duration-200 cursor-pointer ${
                                    isSelected
                                        ? "border-text-highlight bg-pink-50/20 dark:bg-pink-950/20 text-text-highlight font-bold"
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
        </div>
    );
};

export default GeneralSettings;
