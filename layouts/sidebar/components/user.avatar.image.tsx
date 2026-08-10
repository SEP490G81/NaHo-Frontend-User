"use client";

import React from "react";
import { Avatar } from "@mui/material";
import {
    getFirstCharacter,
    getUserAvatarUrl,
} from "@/layouts/protected-header/utils/header.util";

interface UserAvatarImageProps {
    user: any;
    tier: string;
    size?: number;
}

export const UserAvatarImage: React.FC<UserAvatarImageProps> = ({
    user,
    tier,
    size = 40,
}) => {
    const sizePx = `${size}px`;

    if (tier === "PREMIUM") {
        return (
            <div className="relative inline-flex shrink-0 animate-pulse items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 via-[#ff758f] to-yellow-300 p-[2.5px] shadow-[0_0_12px_rgba(255,117,143,0.6)]">
                <Avatar
                    src={getUserAvatarUrl(user)}
                    sx={{
                        width: sizePx,
                        height: sizePx,
                        bgcolor: "var(--color-bgc-highlight)",
                    }}
                >
                    {getFirstCharacter(user)}
                </Avatar>
                <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-gradient-to-r from-amber-400 to-amber-500 text-[10px] font-bold text-white shadow-md">
                    👑
                </div>
            </div>
        );
    }

    if (tier === "BASIC") {
        return (
            <div className="relative inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                <Avatar
                    src={getUserAvatarUrl(user)}
                    sx={{
                        width: sizePx,
                        height: sizePx,
                        bgcolor: "var(--color-bgc-highlight)",
                    }}
                >
                    {getFirstCharacter(user)}
                </Avatar>
                <div className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-indigo-600 text-[9px] font-bold text-white shadow">
                    ★
                </div>
            </div>
        );
    }

    return (
        <Avatar
            src={getUserAvatarUrl(user)}
            sx={{
                width: sizePx,
                height: sizePx,
                bgcolor: "var(--color-bgc-highlight)",
            }}
        >
            {getFirstCharacter(user)}
        </Avatar>
    );
};

export default UserAvatarImage;
