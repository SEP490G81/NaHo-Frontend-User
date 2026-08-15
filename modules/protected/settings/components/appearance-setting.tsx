"use client";

import React from "react";
import { useColorScheme } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useTranslations } from "next-intl";

export function AppearanceSetting() {
    const t = useTranslations("settings.general");
    const { mode, setMode } = useColorScheme();

    const handleThemeChange = (selectedMode: "light" | "dark" | "system") => {
        setMode(selectedMode);
    };

    return (
        <div
            id="setting-appearance"
            data-setting-id="setting-appearance"
            className="border-bdc-primary/60 bg-bgc-app rounded-xl border p-6 transition-all duration-300"
        >
            <div className="mb-4">
                <h2 className="text-text-contrast text-base font-bold">
                    {t("appearanceTitle")}
                </h2>
                <p className="text-text-muted text-xs">
                    {t("appearanceDesc")}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Light Mode Card */}
                <button
                    type="button"
                    onClick={() => handleThemeChange("light")}
                    className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 p-3 text-left transition-all duration-200 ${
                        mode === "light"
                            ? "border-text-highlight bg-pink-50/20 shadow-md dark:bg-pink-950/20"
                            : "border-bdc-primary hover:border-bdc-muted bg-bgc-modal"
                    }`}
                >
                    <div className="border-bdc-primary/40 flex h-28 w-full flex-col justify-between overflow-hidden rounded-lg border bg-white p-2">
                        <div className="flex h-3 w-full items-center gap-1 rounded bg-gray-100 px-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        </div>
                        <div className="my-1.5 grid flex-1 grid-cols-3 gap-1">
                            <div className="rounded bg-gray-100" />
                            <div className="col-span-2 rounded bg-gray-50" />
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between px-1">
                        <span className="text-text-contrast text-sm font-semibold">
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
                    className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 p-3 text-left transition-all duration-200 ${
                        mode === "dark"
                            ? "border-text-highlight bg-pink-50/20 shadow-md dark:bg-pink-950/20"
                            : "border-bdc-primary hover:border-bdc-muted bg-bgc-modal"
                    }`}
                >
                    <div className="flex h-28 w-full flex-col justify-between overflow-hidden rounded-lg border border-gray-700 bg-gray-900 p-2">
                        <div className="flex h-3 w-full items-center gap-1 rounded bg-gray-800 px-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        </div>
                        <div className="my-1.5 grid flex-1 grid-cols-3 gap-1">
                            <div className="rounded bg-gray-800" />
                            <div className="bg-gray-850 col-span-2 rounded" />
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between px-1">
                        <span className="text-text-contrast text-sm font-semibold">
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
                    className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 p-3 text-left transition-all duration-200 ${
                        mode === "system"
                            ? "border-text-highlight bg-pink-50/20 shadow-md dark:bg-pink-950/20"
                            : "border-bdc-primary hover:border-bdc-muted bg-bgc-modal"
                    }`}
                >
                    <div className="border-bdc-primary/40 relative flex h-28 w-full flex-col justify-between overflow-hidden rounded-lg border bg-white p-2">
                        <div className="absolute inset-y-0 right-0 left-1/2 border-l border-gray-700 bg-gray-900" />
                        <div className="z-10 flex h-3 w-full items-center gap-1 rounded bg-gray-200 px-1 dark:bg-gray-800">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        </div>
                        <div className="z-10 my-1.5 grid flex-1 grid-cols-2 gap-1 opacity-75">
                            <div className="rounded bg-gray-200 dark:bg-gray-800" />
                            <div className="rounded bg-gray-300 dark:bg-gray-700" />
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between px-1">
                        <span className="text-text-contrast text-sm font-semibold">
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
    );
}

export default AppearanceSetting;
