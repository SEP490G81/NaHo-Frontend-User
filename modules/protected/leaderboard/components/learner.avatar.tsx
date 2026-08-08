import React from "react";
import { Avatar } from "@mui/material";
import { getInitials } from "../utils/leaderboard.util";

interface LearnerAvatarProps {
    fullName: string | null;
    avatarUrl: string | null;
    /** Cạnh avatar tính bằng px; mặc định 36 cho dòng trong bảng. */
    size?: number;
}

export function LearnerAvatar({
    fullName,
    avatarUrl,
    size = 36,
}: LearnerAvatarProps) {
    return (
        <Avatar
            src={avatarUrl || undefined}
            alt={fullName ?? ""}
            sx={{
                width: `${size}px`,
                height: `${size}px`,
                bgcolor: "var(--color-bgc-highlight)",
                color: "#ffffff",
                fontSize: `${Math.round(size * 0.38)}px`,
                fontWeight: 700,
            }}
            className="shrink-0 font-bold shadow-xs"
        >
            {getInitials(fullName)}
        </Avatar>
    );
}

export default LearnerAvatar;
