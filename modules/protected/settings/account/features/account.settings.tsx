"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button, CircularProgress, Divider } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useAccountSettings } from "../hooks/useAccountSettings";
import { AccountAvatarSection } from "../components/account.avatar.section";
import { AccountAvatarPreviewModal } from "../components/account.avatar.preview.modal";
import { AccountFormFields } from "../components/account.form.fields";

const AccountSettings = () => {
    const t = useTranslations("settings.account");
    const {
        user,
        userEmail,
        username,
        setUsername,
        fullName,
        setFullName,
        gender,
        setGender,
        dob,
        setDob,
        activeAvatarUrl,
        initialChar,
        isSubmitting,
        isAvatarUploading,
        usernameError,
        setUsernameError,
        dobError,
        setDobError,
        isPreviewOpen,
        setIsPreviewOpen,
        fileInputRef,
        handleAvatarChange,
        handleUpdateProfile,
    } = useAccountSettings();

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-y-6 pb-12">
            {/* Part 2 Header */}
            <div>
                <h1 className="text-text-contrast text-2xl font-bold">
                    {t("title")}
                </h1>
                <p className="text-text-muted mt-1 text-sm">
                    {t("description")}
                </p>
            </div>

            <Divider className="border-bdc-primary/50" />

            {/* Section 1: Thông tin cá nhân (Profile Information) */}
            <form
                onSubmit={handleUpdateProfile}
                className="flex flex-col gap-y-6"
            >
                <div className="mb-2">
                    <h2 className="text-text-contrast text-base font-bold">
                        {t("profileTitle")}
                    </h2>
                    <p className="text-text-muted text-xs">
                        {t("profileDesc")}
                    </p>
                </div>

                {/* Avatar Field Section */}
                <AccountAvatarSection
                    activeAvatarUrl={activeAvatarUrl}
                    initialChar={initialChar}
                    isAvatarUploading={isAvatarUploading}
                    onOpenPreview={() => setIsPreviewOpen(true)}
                    onAvatarChange={handleAvatarChange}
                    fileInputRef={fileInputRef}
                />

                {/* Form Inputs (Username, FullName, Gender, Dob, Email) */}
                <AccountFormFields
                    username={username}
                    setUsername={setUsername}
                    usernameError={usernameError}
                    setUsernameError={setUsernameError}
                    fullName={fullName}
                    setFullName={setFullName}
                    gender={gender}
                    setGender={setGender}
                    dob={dob}
                    setDob={setDob}
                    dobError={dobError}
                    setDobError={setDobError}
                    email={user?.email || userEmail || "user@example.com"}
                />

                {/* Submit Update Profile Button */}
                <div
                    id="setting-update-profile"
                    data-setting-id="setting-update-profile"
                    className="flex justify-end pt-2"
                >
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        startIcon={
                            isSubmitting ? (
                                <CircularProgress size={18} color="inherit" />
                            ) : (
                                <SaveOutlinedIcon fontSize="small" />
                            )
                        }
                        sx={{
                            backgroundColor: "var(--color-bgc-highlight)",
                            color: "#ffffff",
                            textTransform: "none",
                            fontWeight: 600,
                            paddingInline: "24px",
                            paddingBlock: "8px",
                            borderRadius: "8px",
                            "&:hover": {
                                opacity: 0.9,
                                backgroundColor: "var(--color-bgc-highlight)",
                            },
                            "&.Mui-disabled": {
                                opacity: 0.7,
                                color: "#ffffff",
                            },
                        }}
                    >
                        {isSubmitting ? "Đang xử lý..." : t("updateProfileBtn")}
                    </Button>
                </div>
            </form>

            {/* Avatar Preview Modal */}
            <AccountAvatarPreviewModal
                open={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                activeAvatarUrl={activeAvatarUrl}
                initialChar={initialChar}
                isAvatarUploading={isAvatarUploading}
                fileInputRef={fileInputRef}
            />
        </div>
    );
};

export default AccountSettings;
