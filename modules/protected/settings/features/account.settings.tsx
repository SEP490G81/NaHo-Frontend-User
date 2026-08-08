"use client";
import React, { useState, useRef, useEffect } from "react";
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
    IconButton,
    Tooltip,
    Avatar,
    CircularProgress,
} from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useCurrentUser } from "@/hooks/use.current.user";
import {
    getFirstCharacter,
    getUserAvatarUrl,
} from "@/layouts/protected-header/utils/header.util";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { useSettingHighlight } from "@/modules/protected/settings/hooks/use.setting.highlight";
import { updateUserInfoClient, uploadUserAvatarClient } from "@/services/client/user.service";
import { ApiError } from "@/libs/api.error";
import { queryKeys } from "@/libs/query.keys";
import {
    validateUsername,
    validateAge,
} from "@/modules/protected/settings/utils/settings.util";

const AccountSettings = () => {
    const t = useTranslations("settings.account");
    const queryClient = useQueryClient();
    const { userEmail, profile, setProfile } = useAuthStore();
    const { data: user } = useCurrentUser();
    useSettingHighlight();

    // Local form states initialized with profile data or logged in user data
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [level, setLevel] = useState("N5");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAvatarUploading, setIsAvatarUploading] = useState(false);

    // Validation error states
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [dobError, setDobError] = useState<string | null>(null);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync logged in user data to input fields when user query resolves
    useEffect(() => {
        if (user) {
            setUsername(user.username || "");
            setFullName(user.fullName || "");
            setGender(user.gender || "");
            setDob(user.dob || "");
            setLevel(user.jlptLevel || profile?.level || "N5");
        }
    }, [user, profile?.level]);

    const activeAvatarUrl = avatarUrl || getUserAvatarUrl(user);
    const initialChar =
        getFirstCharacter(user) ||
        (fullName ? fullName.charAt(0).toUpperCase() : "U");

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error(t("avatarDesc"));
            return;
        }

        setIsAvatarUploading(true);
        try {
            const updatedUser = await uploadUserAvatarClient(file);
            if (updatedUser.avatarUrl) {
                setAvatarUrl(updatedUser.avatarUrl);
            }
            await queryClient.invalidateQueries({
                queryKey: queryKeys.auth.currentUser,
            });
            toast.success(t("avatarUploadSuccess"));
        } catch (error: unknown) {
            if (error instanceof ApiError) {
                toast.error(error.message);
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Tải lên ảnh đại diện thất bại!");
            }
        } finally {
            setIsAvatarUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemoveAvatar = () => {
        setAvatarUrl(null);
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameError(null);
        setDobError(null);

        let hasError = false;

        const uErrorKey = validateUsername(username);
        if (uErrorKey) {
            setUsernameError(t(uErrorKey));
            hasError = true;
        }

        const dErrorKey = validateAge(dob);
        if (dErrorKey) {
            setDobError(t(dErrorKey));
            hasError = true;
        }

        if (hasError) return;

        setIsSubmitting(true);
        try {
            const payload = {
                username: username.trim() || undefined,
                fullName: fullName.trim() || undefined,
                gender: gender ? (gender as "MALE" | "FEMALE") : null,
                dob: dob || null,
            };

            const updatedUser = await updateUserInfoClient(payload);

            // Synchronize Zustand profile store
            setProfile({
                fullName: updatedUser.fullName || fullName,
                level: updatedUser.jlptLevel || level,
                goal: profile?.goal || "Kaiwa Daily Practice",
            });

            // Invalidate React Query currentUser cache to refetch across app header/menu
            await queryClient.invalidateQueries({
                queryKey: queryKeys.auth.currentUser,
            });

            toast.success(t("profileUpdateSuccess"));
        } catch (error: unknown) {
            if (error instanceof ApiError) {
                if (error.status === 409 || error.errorCode === "USER_A006") {
                    const msg = error.message || t("usernameAlreadyExists");
                    setUsernameError(msg);
                    toast.error(msg);
                } else {
                    toast.error(error.message);
                }
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Cập nhật thông tin thất bại!");
            }
        } finally {
            setIsSubmitting(false);
        }
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
                        <Tooltip title={t("avatarHoverTooltip")} arrow placement="top">
                            <button
                                type="button"
                                onClick={() => setIsPreviewOpen(true)}
                                disabled={isAvatarUploading}
                                className="group relative h-20 w-20 overflow-hidden rounded-full border-2 border-bdc-muted bg-bgc-modal flex items-center justify-center shrink-0 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-bgc-highlight transition-all duration-200 hover:scale-105 disabled:opacity-80"
                            >
                                <Avatar
                                    src={activeAvatarUrl}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        bgcolor: "var(--color-bgc-highlight)",
                                        color: "#ffffff",
                                        fontSize: "1.75rem",
                                        fontWeight: 700,
                                    }}
                                >
                                    {initialChar}
                                </Avatar>
                                {/* Overlay: Uploading Spinner or Zoom Icon */}
                                <div
                                    className={`absolute inset-0 bg-black/40 transition-opacity duration-200 flex items-center justify-center text-white backdrop-blur-[1px] ${
                                        isAvatarUploading
                                            ? "opacity-100"
                                            : "opacity-0 group-hover:opacity-100"
                                    }`}
                                >
                                    {isAvatarUploading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        <ZoomInIcon fontSize="medium" />
                                    )}
                                </div>
                            </button>
                        </Tooltip>
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
                            disabled={isAvatarUploading}
                            onClick={() => fileInputRef.current?.click()}
                            variant="contained"
                            size="small"
                            startIcon={
                                isAvatarUploading ? (
                                    <CircularProgress size={16} color="inherit" />
                                ) : (
                                    <AddAPhotoOutlinedIcon fontSize="small" />
                                )
                            }
                            sx={{
                                backgroundColor: "var(--color-bgc-highlight)",
                                color: "#ffffff",
                                textTransform: "none",
                                fontWeight: 600,
                                borderRadius: "8px",
                                px: 2,
                                py: 0.75,
                                boxShadow: "none",
                                "&:hover": {
                                    opacity: 0.9,
                                    backgroundColor: "var(--color-bgc-highlight)",
                                    boxShadow: "none",
                                },
                                "&.Mui-disabled": {
                                    opacity: 0.7,
                                    color: "#ffffff",
                                },
                            }}
                        >
                            {isAvatarUploading ? "Đang tải..." : t("changeAvatar")}
                        </Button>

                        {avatarUrl && (
                            <Button
                                type="button"
                                disabled={isAvatarUploading}
                                onClick={handleRemoveAvatar}
                                variant="outlined"
                                size="small"
                                color="error"
                                startIcon={<DeleteOutlineOutlinedIcon fontSize="small" />}
                                sx={{ textTransform: "none", borderRadius: "8px" }}
                            >
                                {t("removeAvatar")}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Username & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                        id="setting-username"
                        data-setting-id="setting-username"
                        className="rounded-xl border border-bdc-primary/60 bg-bgc-app p-6 transition-all duration-300"
                    >
                        <label className="block text-sm font-semibold text-text-contrast mb-1">
                            {t("usernameLabel")}
                        </label>
                        <p className="text-xs text-text-muted mb-2">
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
                        id="setting-email"
                        data-setting-id="setting-email"
                        className="rounded-xl border border-bdc-primary/60 bg-bgc-app p-6 transition-all duration-300"
                    >
                        <label className="block text-sm font-semibold text-text-contrast mb-1">
                            {t("emailLabel")}
                        </label>
                        <p className="text-xs text-text-muted mb-2">
                            {t("emailDesc")}
                        </p>
                        <TextFieldCustom
                            fullWidth
                            disabled
                            variant="filled"
                            value={user?.email || userEmail || "user@example.com"}
                        />
                    </div>
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
                            <MenuItem value="">{t("genderUnspecified")}</MenuItem>
                            <MenuItem value="MALE">{t("genderMale")}</MenuItem>
                            <MenuItem value="FEMALE">{t("genderFemale")}</MenuItem>
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

            {/* Avatar Preview Modal */}
            <Dialog
                open={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                maxWidth="xs"
                fullWidth
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            backdropFilter: "blur(8px)",
                        },
                    },
                    paper: {
                        sx: {
                            borderRadius: "24px",
                            backgroundColor: "var(--color-bgc-modal)",
                            color: "var(--color-text-contrast)",
                            boxShadow: "0 24px 48px rgba(0, 0, 0, 0.3)",
                            overflow: "hidden",
                            border: "1px solid var(--color-bdc-primary)",
                        },
                    },
                }}
            >
                <div className="flex items-center justify-between px-6 pt-5 pb-3">
                    <h3 className="text-base font-bold text-text-contrast">
                        {t("avatarPreviewTitle")}
                    </h3>
                    <IconButton
                        onClick={() => setIsPreviewOpen(false)}
                        size="small"
                        sx={{
                            color: "var(--color-text-muted)",
                            "&:hover": {
                                color: "var(--color-text-contrast)",
                                backgroundColor: "var(--color-hbgc-app)",
                            },
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </div>

                <DialogContent className="flex flex-col items-center justify-center p-6 pt-2 pb-6">
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-bgc-highlight/40 shadow-2xl flex items-center justify-center bg-bgc-app ring-4 ring-bgc-highlight/10">
                        <Avatar
                            src={activeAvatarUrl}
                            sx={{
                                width: "100%",
                                height: "100%",
                                bgcolor: "var(--color-bgc-highlight)",
                                color: "#ffffff",
                                fontSize: "4.5rem",
                                fontWeight: 700,
                            }}
                        >
                            {initialChar}
                        </Avatar>
                    </div>
                </DialogContent>

                <DialogActions className="flex items-center justify-between px-6 pb-6 pt-3 bg-bgc-app/40 border-t border-bdc-primary/40 gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            disabled={isAvatarUploading}
                            onClick={() => {
                                fileInputRef.current?.click();
                            }}
                            variant="contained"
                            size="small"
                            startIcon={
                                isAvatarUploading ? (
                                    <CircularProgress size={16} color="inherit" />
                                ) : (
                                    <AddAPhotoOutlinedIcon fontSize="small" />
                                )
                            }
                            sx={{
                                backgroundColor: "var(--color-bgc-highlight)",
                                color: "#ffffff",
                                textTransform: "none",
                                fontWeight: 600,
                                borderRadius: "8px",
                                px: 2,
                                py: 0.75,
                                boxShadow: "none",
                                "&:hover": {
                                    opacity: 0.9,
                                    backgroundColor: "var(--color-bgc-highlight)",
                                    boxShadow: "none",
                                },
                                "&.Mui-disabled": {
                                    opacity: 0.7,
                                    color: "#ffffff",
                                },
                            }}
                        >
                            {isAvatarUploading ? "Đang tải..." : t("changeAvatar")}
                        </Button>
                        {avatarUrl && (
                            <Button
                                type="button"
                                onClick={() => {
                                    handleRemoveAvatar();
                                }}
                                variant="outlined"
                                size="small"
                                color="error"
                                startIcon={<DeleteOutlineOutlinedIcon fontSize="small" />}
                                sx={{ textTransform: "none", borderRadius: "8px" }}
                            >
                                {t("removeAvatar")}
                            </Button>
                        )}
                    </div>
                    <Button
                        onClick={() => setIsPreviewOpen(false)}
                        variant="outlined"
                        size="small"
                        sx={{
                            textTransform: "none",
                            color: "var(--color-text-contrast)",
                            borderColor: "var(--color-bdc-muted)",
                            borderRadius: "8px",
                        }}
                    >
                        {t("closeModal")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AccountSettings;

