"use client";
import React from "react";
import { useRouter } from "@/intl/i18n/navigation";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IconButton } from "@mui/material";

const SettingsModalCloseButton = () => {
    const router = useRouter();

    const handleClose = () => {
        const stackStr = sessionStorage.getItem("settings_history_stack");
        const stack: string[] = stackStr ? JSON.parse(stackStr) : [];
        if (stack.length > 0) {
            window.history.go(-stack.length);
        } else {
            const lastPath = sessionStorage.getItem("last_non_settings_path");
            if (lastPath) {
                router.push(lastPath as Parameters<typeof router.push>[0]);
            } else {
                router.push("/dashboard");
            }
        }
    };

    return (
        <span className="absolute top-5 right-5">
            <IconButton size="small" onClick={handleClose}>
                <CloseOutlinedIcon fontSize="small" />
            </IconButton>
        </span>
    );
};

export default SettingsModalCloseButton;
