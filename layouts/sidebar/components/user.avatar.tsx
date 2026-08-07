"use client";
import { Avatar, Chip } from "@mui/material";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use.current.user";
import { useMySubscription } from "@/hooks/use.my.subscription";
import {
    getFirstCharacter,
    getUserAvatarUrl,
    getUserFullName,
} from "@/layouts/protected-header/utils/header.util";
import AccountMenu from "@/layouts/sidebar/components/account.menu";
import { cn } from "@/libs/utils";

interface Props {
    isCollapsed?: boolean;
}

const UserAvatar = ({ isCollapsed = false }: Props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { data: user } = useCurrentUser();
    const { data: subscription } = useMySubscription();

    const tier = subscription?.tier || "FREE";
    const name = getUserFullName(user) || user?.username || user?.email || "";

    const renderAvatar = () => {
        if (tier === "PREMIUM") {
            return (
                <div className="relative inline-flex shrink-0 animate-pulse items-center justify-center rounded-full bg-linear-to-tr from-amber-400 via-[#ff758f] to-yellow-300 p-1 shadow-[0_0_14px_rgba(255,117,143,0.75)]">
                    <Avatar
                        src={getUserAvatarUrl(user)}
                        sx={{
                            bgcolor: "var(--color-bgc-highlight)",
                            width: "40px",
                            height: "40px",
                        }}
                    >
                        {getFirstCharacter(user)}
                    </Avatar>
                    <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-gradient-to-r from-amber-400 to-amber-500 text-[10px] font-black shadow-md">
                        👑
                    </div>
                </div>
            );
        }
        if (tier === "BASIC") {
            return (
                <div className="relative inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-[0_0_10px_rgba(99,102,241,0.6)]">
                    <Avatar
                        src={getUserAvatarUrl(user)}
                        sx={{
                            bgcolor: "var(--color-bgc-highlight)",
                            width: "40px",
                            height: "40px",
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
                    bgcolor: "var(--color-bgc-highlight)",
                    width: "40px",
                    height: "40px",
                }}
            >
                {getFirstCharacter(user)}
            </Avatar>
        );
    };

    return (
        <div className="w-full">
            <button
                type="button"
                className={cn(
                    "group hover:bg-hbgc-app hover:border-bdc-primary flex w-full cursor-pointer items-center border border-transparent px-2.5 py-3.5 text-left transition-colors",
                    isCollapsed ? "justify-center" : "justify-start gap-3",
                )}
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                {renderAvatar()}

                {!isCollapsed && (
                    <div className="min-w-0 flex-1">
                        <p className="text-text-contrast truncate text-sm leading-tight font-bold">
                            {name}
                        </p>
                        <div className="mt-1">
                            {tier === "PREMIUM" ? (
                                <Chip
                                    label="PREMIUM 👑"
                                    size="small"
                                    sx={{
                                        height: 16,
                                        fontSize: "8.5px",
                                        fontWeight: 900,
                                        "& .MuiChip-label": { px: 1, py: 0 },
                                    }}
                                    className="bg-linear-to-r from-amber-400 to-rose-500 text-white shadow-xs"
                                />
                            ) : tier === "BASIC" ? (
                                <Chip
                                    label="BASIC ★"
                                    size="small"
                                    sx={{
                                        height: 16,
                                        fontSize: "8.5px",
                                        fontWeight: 800,
                                        "& .MuiChip-label": { px: 1, py: 0 },
                                    }}
                                    className="bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-xs"
                                />
                            ) : (
                                <Chip
                                    label="FREE"
                                    size="small"
                                    sx={{
                                        height: 16,
                                        fontSize: "8.5px",
                                        fontWeight: 700,
                                        "& .MuiChip-label": { px: 1, py: 0 },
                                    }}
                                    className="border-bdc-primary bg-bgc-modal text-text-muted border"
                                />
                            )}
                        </div>
                    </div>
                )}
            </button>

            <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </div>
    );
};

export default UserAvatar;
