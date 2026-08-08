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

const SecuritySettings = () => {
    const t = useTranslations("settings.security");
    useSettingHighlight();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error(t("passwordMatchError"));
            return;
        }

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success(t("passwordUpdateSuccess"));
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
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
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
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
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
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        {t("updatePasswordBtn")}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SecuritySettings;
