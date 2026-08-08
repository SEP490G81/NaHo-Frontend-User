"use client";
import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import {
    Divider,
    Button,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { useSettingHighlight } from "@/modules/protected/settings/hooks/use.setting.highlight";

const AccountSettings = () => {
    const t = useTranslations("settings.account");
    const { userEmail, profile, setProfile } = useAuthStore();
    useSettingHighlight();

    // Local form states initialized with profile data or fallback
    const [fullName, setFullName] = useState(profile?.fullName || "Nguyễn Văn A");
    const [gender, setGender] = useState("male");
    const [dob, setDob] = useState("1998-05-20");
    const [level, setLevel] = useState(profile?.level || "N3");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error(t("avatarDesc"));
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAvatar = () => {
        setAvatarUrl(null);
    };

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setProfile({
            fullName,
            level,
            goal: profile?.goal || "Kaiwa Daily Practice",
        });
        toast.success(t("profileUpdateSuccess"));
    };

    const handleDeleteAccount = () => {
        setIsDeleteDialogOpen(false);
        toast.success(t("deleteSuccess"));
    };

    return (
        <div className="flex flex-col gap-y-6 w-full max-w-5xl mx-auto pb-12">
            {/* Part 2 Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-contrast">
                    {t("title")}
                </h1>
                <p className="mt-1 text-sm text-text-muted">
                    {t("description")}
                </p>
            </div>

            <Divider className="border-bdc-primary/50" />

            {/* Section 1: Thông tin cá nhân (Profile Information) */}
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-y-6">
                <div className="mb-2">
                    <h2 className="text-base font-bold text-text-contrast">
                        {t("profileTitle")}
                    </h2>
                    <p className="text-xs text-text-muted">
                        {t("profileDesc")}
                    </p>
                </div>

                {/* Avatar Field */}
                <div
                    id="setting-avatar"
                    data-setting-id="setting-avatar"
                    className="rounded-xl border border-bdc-primary/60 bg-bgc-app p-6 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-bdc-muted bg-bgc-modal flex items-center justify-center shrink-0">
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt="Avatar"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-2xl font-bold text-text-highlight">
                                    {fullName ? fullName.charAt(0).toUpperCase() : "U"}
                                </span>
                            )}
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-text-contrast">
                                {t("avatarTitle")}
                            </h3>
                            <p className="text-xs text-text-muted mt-0.5">
                                {t("avatarDesc")}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <Button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            variant="contained"
                            size="small"
                            startIcon={<AddAPhotoOutlinedIcon fontSize="small" />}
                            sx={{
                                backgroundColor: "var(--color-text-contrast)",
                                color: "var(--color-bgc-app)",
                                textTransform: "none",
                                "&:hover": {
                                    opacity: 0.9,
                                },
                            }}
                        >
                            {t("changeAvatar")}
                        </Button>

                        {avatarUrl && (
                            <Button
                                type="button"
                                onClick={handleRemoveAvatar}
                                variant="outlined"
                                size="small"
                                color="error"
                                startIcon={<DeleteOutlineOutlinedIcon fontSize="small" />}
                                sx={{ textTransform: "none" }}
                            >
                                {t("removeAvatar")}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Email Field (Read-only) */}
                <div
                    id="setting-email"
                    data-setting-id="setting-email"
                    className="rounded-xl border border-bdc-primary/60 bg-bgc-app p-6 transition-all duration-300"
                >
                    <label className="block text-sm font-semibold text-text-contrast mb-1">
                        {t("emailLabel")}
                    </label>
                    <p className="text-xs text-text-muted mb-3">
                        {t("emailDesc")}
                    </p>
                    <TextFieldCustom
                        fullWidth
                        disabled
                        variant="filled"
                        value={userEmail || "user@example.com"}
                    />
                </div>

                {/* Full Name & Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                        id="setting-fullname"
                        data-setting-id="setting-fullname"
                        className="rounded-xl border border-bdc-primary/60 bg-bgc-app p-6 transition-all duration-300"
                    >
                        <label className="block text-sm font-semibold text-text-contrast mb-2">
                            {t("fullNameLabel")}
                        </label>
                        <TextFieldCustom
                            fullWidth
                            variant="filled"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div
                        id="setting-gender"
                        data-setting-id="setting-gender"
                        className="rounded-xl border border-bdc-primary/60 bg-bgc-app p-6 transition-all duration-300"
                    >
                        <label className="block text-sm font-semibold text-text-contrast mb-2">
                            {t("genderLabel")}
                        </label>
                        <Select
                            fullWidth
                            size="small"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            sx={{
                                borderRadius: "6px",
                                backgroundColor: "var(--color-bgc-modal)",
                                "& .MuiSelect-select": {
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                },
                            }}
                        >
                            <MenuItem value="male">{t("genderMale")}</MenuItem>
                            <MenuItem value="female">{t("genderFemale")}</MenuItem>
                            <MenuItem value="other">{t("genderOther")}</MenuItem>
                        </Select>
                    </div>
                </div>

                {/* Date of Birth & JLPT Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                        id="setting-dob"
                        data-setting-id="setting-dob"
                        className="rounded-xl border border-bdc-primary/60 bg-bgc-app p-6 transition-all duration-300"
                    >
                        <label className="block text-sm font-semibold text-text-contrast mb-2">
                            {t("dobLabel")}
                        </label>
                        <TextFieldCustom
                            fullWidth
                            type="date"
                            variant="filled"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>

                    <div
                        id="setting-jlpt"
                        data-setting-id="setting-jlpt"
                        className="rounded-xl border border-bdc-primary/60 bg-bgc-app p-6 transition-all duration-300"
                    >
                        <label className="block text-sm font-semibold text-text-contrast mb-1">
                            {t("jlptLabel")}
                        </label>
                        <p className="text-xs text-text-muted mb-2">
                            {t("jlptDesc")}
                        </p>
                        <Select
                            fullWidth
                            size="small"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            sx={{
                                borderRadius: "6px",
                                backgroundColor: "var(--color-bgc-modal)",
                                "& .MuiSelect-select": {
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                },
                            }}
                        >
                            <MenuItem value="N5">N5 (Sơ cấp 1)</MenuItem>
                            <MenuItem value="N4">N4 (Sơ cấp 2)</MenuItem>
                            <MenuItem value="N3">N3 (Trung cấp)</MenuItem>
                            <MenuItem value="N2">N2 (Thượng cấp 1)</MenuItem>
                            <MenuItem value="N1">N1 (Thượng cấp 2)</MenuItem>
                        </Select>
                    </div>
                </div>

                {/* Update Profile Button */}
                <div
                    id="setting-update-profile"
                    data-setting-id="setting-update-profile"
                    className="flex justify-end pt-2"
                >
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveOutlinedIcon fontSize="small" />}
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
                        }}
                    >
                        {t("updateProfileBtn")}
                    </Button>
                </div>
            </form>

            <Divider className="border-bdc-primary/50 my-2" />

            {/* Section 2: Danger Zone / Delete Account */}
            <div
                id="setting-delete-account"
                data-setting-id="setting-delete-account"
                className="rounded-xl border border-red-200 dark:border-red-950/80 bg-red-50/20 dark:bg-red-950/10 p-6 transition-all duration-300"
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-base font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                            <WarningAmberOutlinedIcon fontSize="small" />
                            {t("deleteAccountTitle")}
                        </h2>
                        <p className="text-xs text-text-muted mt-1">
                            {t("deleteAccountDesc")}
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={() => setIsDeleteDialogOpen(true)}
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteOutlineOutlinedIcon fontSize="small" />}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: "8px",
                        }}
                    >
                        {t("deleteAccountBtn")}
                    </Button>
                </div>
            </div>

            {/* Delete Account Confirmation Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: "16px",
                            backgroundColor: "var(--color-bgc-modal)",
                            padding: "8px",
                        },
                    },
                }}
            >
                <DialogTitle className="text-lg font-bold text-text-contrast flex items-center gap-2">
                    <WarningAmberOutlinedIcon color="error" />
                    {t("confirmDeleteTitle")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className="text-sm text-text-muted">
                        {t("confirmDeleteMessage")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="gap-2 px-6 pb-4">
                    <Button
                        onClick={() => setIsDeleteDialogOpen(false)}
                        variant="outlined"
                        sx={{ textTransform: "none", color: "var(--color-text-contrast)" }}
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleDeleteAccount}
                        variant="contained"
                        color="error"
                        sx={{ textTransform: "none", fontWeight: 600 }}
                    >
                        {t("deleteAccountBtn")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AccountSettings;
