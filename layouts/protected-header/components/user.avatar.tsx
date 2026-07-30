import { Avatar } from "@mui/material";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use.current.user";
import { useMySubscription } from "@/hooks/use.my.subscription";
import {
    getFirstCharacter,
    getUserAvatarUrl,
} from "@/layouts/protected-header/utils/header.util";
import AccountMenu from "@/layouts/protected-header/components/account.menu";

const UserAvatar = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { data: user } = useCurrentUser();
    const { data: subscription } = useMySubscription();

    const tier = subscription?.plan?.tier || "FREE";

    return (
        <>
            <button
                className="border-l-bdc-muted group flex cursor-pointer items-center justify-center"
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                {tier === "PREMIUM" ? (
                    <div className="relative inline-flex animate-pulse items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 via-[#ff758f] to-yellow-300 p-[2.5px] shadow-[0_0_14px_rgba(255,117,143,0.75)]">
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
                ) : tier === "BASIC" ? (
                    <div className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-[0_0_10px_rgba(99,102,241,0.6)]">
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
                ) : (
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
                )}
            </button>

            <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </>
    );
};

export default UserAvatar;
