"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Divider, IconButton, InputAdornment } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { toast } from "react-toastify";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { useSettingHighlight } from "@/modules/protected/settings/hooks/use.setting.highlight";
import { changePassword } from "@/services/client/user.service";
import { ApiError } from "@/libs/api.error";
import { validateChangePassword } from "@/modules/protected/settings/utils/settings.util";

const SecuritySettings = () => {
    const t = useTranslations("settings.security");
    useSettingHighlight();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [currentPasswordError, setCurrentPasswordError] = useState<
        string | null
    >(null);
    const [newPasswordError, setNewPasswordError] = useState<string | null>(
        null,
    );
    const [confirmPasswordError, setConfirmPasswordError] = useState<
        string | null
    >(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        setCurrentPasswordError(null);
        setNewPasswordError(null);
        setConfirmPasswordError(null);

        const {
            currentPasswordErrorKey,
            newPasswordErrorKey,
            confirmPasswordErrorKey,
            isValid,
        } = validateChangePassword(
            currentPassword,
            newPassword,
            confirmPassword,
        );

        if (currentPasswordErrorKey) {
            setCurrentPasswordError(t(currentPasswordErrorKey));
        }
        if (newPasswordErrorKey) {
            setNewPasswordError(t(newPasswordErrorKey));
        }
        if (confirmPasswordErrorKey) {
            setConfirmPasswordError(t(confirmPasswordErrorKey));
        }

        if (!isValid) return;

        setIsLoading(true);
        try {
            await changePassword({
                oldPassword: currentPassword,
                newPassword,
                confirmPassword,
            });

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            toast.success(t("passwordUpdateSuccess"));
        } catch (err: unknown) {
            if (err instanceof ApiError) {
                if (err.errorCode === "USER_A018") {
                    setCurrentPasswordError(t("oldPasswordIncorrect"));
                } else if (err.errorCode === "USER_A017") {
                    setNewPasswordError(t("passwordSameAsOldError"));
                } else {
                    toast.error(
                        err.message || "Đã xảy ra lỗi khi đổi mật khẩu.",
                    );
                }
            } else if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Đã xảy ra lỗi không xác định.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-y-6 pb-12">
            {/* Part 3 Header */}
            <div>
                <h1 className="text-text-contrast text-2xl font-bold">
                    {t("title")}
                </h1>
                <p className="text-text-muted mt-1 text-sm">
                    {t("description")}
                </p>
            </div>

            <Divider className="border-bdc-primary/50" />

            {/* Section 1: Đổi mật khẩu (Change Password) */}
            <form
                onSubmit={handleUpdatePassword}
                className="flex flex-col gap-y-6"
            >
                <div
                    id="setting-change-password"
                    data-setting-id="setting-change-password"
                    className="border-bdc-primary/60 bg-bgc-app flex flex-col gap-y-5 rounded-xl border p-6 transition-all duration-300"
                >
                    <div>
                        <h2 className="text-text-contrast flex items-center gap-2 text-base font-bold">
                            <LockOutlinedIcon fontSize="small" />
                            {t("changePasswordTitle")}
                        </h2>
                        <p className="text-text-muted mt-1 text-xs">
                            {t("changePasswordDesc")}
                        </p>
                    </div>

                    <Divider className="border-bdc-primary/40 my-1" />

                    {/* Current Password Field */}
                    <div>
                        <label className="text-text-contrast mb-2 block text-sm font-semibold">
                            {t("currentPassword")}
                        </label>
                        <TextFieldCustom
                            fullWidth
                            variant="filled"
                            placeholder="••••••••"
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => {
                                setCurrentPassword(e.target.value);
                                if (currentPasswordError)
                                    setCurrentPasswordError(null);
                            }}
                            error={Boolean(currentPasswordError)}
                            helperText={
                                currentPasswordError ? (
                                    <span className="text-text-error font-semibold">
                                        {currentPasswordError}
                                    </span>
                                ) : null
                            }
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowCurrentPassword(
                                                        (prev) => !prev,
                                                    )
                                                }
                                                edge="end"
                                                size="small"
                                            >
                                                {showCurrentPassword ? (
                                                    <VisibilityOffOutlinedIcon fontSize="small" />
                                                ) : (
                                                    <VisibilityOutlinedIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </div>

                    {/* New Password Field */}
                    <div>
                        <label className="text-text-contrast mb-2 block text-sm font-semibold">
                            {t("newPassword")}
                        </label>
                        <TextFieldCustom
                            fullWidth
                            variant="filled"
                            placeholder="••••••••"
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                if (newPasswordError) setNewPasswordError(null);
                            }}
                            error={Boolean(newPasswordError)}
                            helperText={
                                newPasswordError ? (
                                    <span className="text-text-error font-semibold">
                                        {newPasswordError}
                                    </span>
                                ) : null
                            }
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowNewPassword(
                                                        (prev) => !prev,
                                                    )
                                                }
                                                edge="end"
                                                size="small"
                                            >
                                                {showNewPassword ? (
                                                    <VisibilityOffOutlinedIcon fontSize="small" />
                                                ) : (
                                                    <VisibilityOutlinedIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </div>

                    {/* Confirm New Password Field */}
                    <div>
                        <label className="text-text-contrast mb-2 block text-sm font-semibold">
                            {t("confirmPassword")}
                        </label>
                        <TextFieldCustom
                            fullWidth
                            variant="filled"
                            placeholder="••••••••"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if (confirmPasswordError)
                                    setConfirmPasswordError(null);
                            }}
                            error={Boolean(confirmPasswordError)}
                            helperText={
                                confirmPasswordError ? (
                                    <span className="text-text-error font-semibold">
                                        {confirmPasswordError}
                                    </span>
                                ) : null
                            }
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        (prev) => !prev,
                                                    )
                                                }
                                                edge="end"
                                                size="small"
                                            >
                                                {showConfirmPassword ? (
                                                    <VisibilityOffOutlinedIcon fontSize="small" />
                                                ) : (
                                                    <VisibilityOutlinedIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Submit Update Password Button */}
                <div className="flex justify-end pt-2">
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
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
                            "&.Mui-disabled": {
                                opacity: 0.6,
                                color: "#ffffff",
                                backgroundColor: "var(--color-bgc-highlight)",
                            },
                        }}
                    >
                        {t("updatePasswordBtn")}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SecuritySettings;
