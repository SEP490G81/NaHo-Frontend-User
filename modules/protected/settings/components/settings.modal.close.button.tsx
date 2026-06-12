"use client";
import React from "react";
import { useRouter } from "@/i18n/navigation";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IconButton } from "@mui/material";

const SettingsModalCloseButton = () => {
    const { push } = useRouter();

    const handleClose = () => {
        const lastPath = sessionStorage.getItem("last_non_settings_path");
        if (lastPath) {
            push(lastPath);
        } else {
            push("/dashboard");
        }
    };

    return (
        <div className="mb-5 flex justify-end">
            <IconButton size="small" onClick={handleClose}>
                <CloseOutlinedIcon fontSize="small" />
            </IconButton>
        </div>
    );
};

export default SettingsModalCloseButton;
