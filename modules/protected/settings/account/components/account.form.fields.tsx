"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { MenuItem, Select } from "@mui/material";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { GenderType } from "../types/account.ui.type";
import { GENDER_OPTIONS } from "../constants/account.constant";

interface AccountFormFieldsProps {
    username: string;
    setUsername: (val: string) => void;
    usernameError: string | null;
    setUsernameError: (val: string | null) => void;

    fullName: string;
    setFullName: (val: string) => void;

    gender: GenderType;
    setGender: (val: GenderType) => void;

    dob: string;
    setDob: (val: string) => void;
    dobError: string | null;
    setDobError: (val: string | null) => void;

    email: string;
}

export function AccountFormFields({
    username,
    setUsername,
    usernameError,
    setUsernameError,
    fullName,
    setFullName,
    gender,
    setGender,
    dob,
    setDob,
    dobError,
    setDobError,
    email,
}: AccountFormFieldsProps) {
    const t = useTranslations("settings.account");

    return (
        <div className="flex flex-col gap-y-4">
            {/* Username & FullName */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div
                    id="setting-username"
                    data-setting-id="setting-username"
                    className="border-bdc-primary/60 bg-bgc-app rounded-xl border p-6 transition-all duration-300"
                >
                    <label className="text-text-contrast mb-1 block text-sm font-semibold">
                        {t("usernameLabel")}
                    </label>
                    <p className="text-text-muted mb-2 text-xs">
                        {t("usernameDesc")}
                    </p>
                    <TextFieldCustom
                        fullWidth
                        variant="filled"
                        value={username}
                        placeholder={t("usernamePlaceholder")}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            if (usernameError) setUsernameError(null);
                        }}
                        error={Boolean(usernameError)}
                        helperText={
                            usernameError ? (
                                <span className="text-text-error font-semibold">
                                    {usernameError}
                                </span>
                            ) : null
                        }
                    />
                </div>

                <div
                    id="setting-fullname"
                    data-setting-id="setting-fullname"
                    className="border-bdc-primary/60 bg-bgc-app rounded-xl border p-6 transition-all duration-300"
                >
                    <label className="text-text-contrast mb-1 block text-sm font-semibold">
                        {t("fullNameLabel")}
                    </label>
                    <p className="text-text-muted mb-2 text-xs">
                        {t("fullNameDesc")}
                    </p>
                    <TextFieldCustom
                        fullWidth
                        variant="filled"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
            </div>

            {/* Gender & Dob */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div
                    id="setting-gender"
                    data-setting-id="setting-gender"
                    className="border-bdc-primary/60 bg-bgc-app rounded-xl border p-6 transition-all duration-300"
                >
                    <label className="text-text-contrast mb-1 block text-sm font-semibold">
                        {t("genderLabel")}
                    </label>
                    <p className="text-text-muted mb-2 text-xs">
                        {t("genderDesc")}
                    </p>
                    <Select
                        fullWidth
                        size="small"
                        value={gender}
                        onChange={(e) =>
                            setGender(e.target.value as GenderType)
                        }
                        displayEmpty
                        sx={{
                            borderRadius: "6px",
                            backgroundColor: "var(--color-bgc-modal)",
                            "& .MuiSelect-select": {
                                paddingTop: "10px",
                                paddingBottom: "10px",
                            },
                        }}
                    >
                        {GENDER_OPTIONS.map((option) => (
                            <MenuItem
                                key={option.value || "unspecified"}
                                value={option.value}
                            >
                                {t(option.labelKey)}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div
                    id="setting-dob"
                    data-setting-id="setting-dob"
                    className="border-bdc-primary/60 bg-bgc-app rounded-xl border p-6 transition-all duration-300"
                >
                    <label className="text-text-contrast mb-1 block text-sm font-semibold">
                        {t("dobLabel")}
                    </label>
                    <p className="text-text-muted mb-2 text-xs">
                        {t("dobDesc")}
                    </p>
                    <TextFieldCustom
                        fullWidth
                        type="date"
                        variant="filled"
                        value={dob}
                        onChange={(e) => {
                            setDob(e.target.value);
                            if (dobError) setDobError(null);
                        }}
                        error={Boolean(dobError)}
                        helperText={
                            dobError ? (
                                <span className="text-text-error font-semibold">
                                    {dobError}
                                </span>
                            ) : null
                        }
                    />
                </div>
            </div>

            {/* Email */}
            <div
                id="setting-email"
                data-setting-id="setting-email"
                className="border-bdc-primary/60 bg-bgc-app rounded-xl border p-6 transition-all duration-300"
            >
                <label className="text-text-contrast mb-1 block text-sm font-semibold">
                    {t("emailLabel")}
                </label>
                <p className="text-text-muted mb-2 text-xs">{t("emailDesc")}</p>
                <TextFieldCustom
                    fullWidth
                    disabled
                    variant="filled"
                    value={email}
                />
            </div>
        </div>
    );
}
