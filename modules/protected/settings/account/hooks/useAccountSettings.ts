"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import { useCurrentUser } from "@/hooks/use.current.user";
import {
    updateUserInfoClient,
    uploadUserAvatarClient,
} from "@/services/client/user.service";
import { ApiError } from "@/libs/api.error";
import { queryKeys } from "@/libs/query.keys";
import { useSettingHighlight } from "@/modules/protected/settings/hooks/use.setting.highlight";
import { GenderType } from "../types/account.ui.type";
import {
    validateAge,
    validateUsername,
    getFirstCharacter,
    getUserAvatarUrl,
} from "../utils/account.util";
import { MAX_AVATAR_SIZE_BYTES } from "../constants/account.constant";

export function useAccountSettings() {
    const t = useTranslations("settings.account");
    const queryClient = useQueryClient();
    const { userEmail, profile, setProfile } = useAuthStore();
    const { data: user } = useCurrentUser();
    useSettingHighlight();

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [gender, setGender] = useState<GenderType>("");
    const [dob, setDob] = useState("");
    const [level, setLevel] = useState("N5");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAvatarUploading, setIsAvatarUploading] = useState(false);

    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [dobError, setDobError] = useState<string | null>(null);

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user) {
            setUsername(user.username || "");
            setFullName(user.fullName || "");
            setGender((user.gender as GenderType) || "");
            setDob(user.dob || "");
            setLevel(user.jlptLevel || profile?.level || "N5");
        }
    }, [user, profile?.level]);

    const activeAvatarUrl = avatarUrl || getUserAvatarUrl(user);
    const initialChar =
        getFirstCharacter(user) ||
        (fullName ? fullName.charAt(0).toUpperCase() : "U");

    const handleAvatarChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_AVATAR_SIZE_BYTES) {
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

            setProfile({
                fullName: updatedUser.fullName || fullName,
                level: updatedUser.jlptLevel || level,
                goal: profile?.goal || "Kaiwa Daily Practice",
            });

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

    return {
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
    };
}
