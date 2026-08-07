import { Avatar, Chip, Divider, Popover } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { useCurrentUser } from "@/hooks/use.current.user";
import { useMySubscription } from "@/hooks/use.my.subscription";
import {
    getFirstCharacter,
    getUserAvatarUrl,
    getUserFullName,
} from "@/layouts/protected-header/utils/header.util";
import { ACCOUNT_MENU_ITEMS } from "@/layouts/protected-header/constants/protected.header.constant";
import LogoutButton from "@/layouts/protected-header/features/logout.button";
import { useReportStore } from "@/store/reportStore";

const AccountMenu = ({
    anchorEl,
    setAnchorEl,
}: {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement | null>>;
}) => {
    const t = useTranslations();
    const pathname = usePathname();
    const { data: user } = useCurrentUser();
    const { data: subscription } = useMySubscription();
    const openReportModal = useReportStore((s) => s.openModal);

    const tier = subscription?.tier || "FREE";

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            slotProps={{
                paper: {
                    sx: {
                        ml: 1.5,
                        boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                        borderRadius: "16px",
                        border: "1px solid var(--color-bdc-primary)",
                        backgroundColor: "var(--color-bgc-app)",
                    },
                },
            }}
        >
            <div>
                <div className="flex min-w-75 items-center gap-x-3 p-3.5">
                    {tier === "PREMIUM" ? (
                        <div className="relative inline-flex animate-pulse items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 via-[#ff758f] to-yellow-300 p-[2.5px] shadow-[0_0_12px_rgba(255,117,143,0.6)]">
                            <Avatar
                                src={getUserAvatarUrl(user)}
                                sx={{
                                    width: "52px",
                                    height: "52px",
                                    bgcolor: "var(--color-bgc-highlight)",
                                }}
                            >
                                {getFirstCharacter(user)}
                            </Avatar>
                            <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-gradient-to-r from-amber-400 to-amber-500 text-[10px] font-bold text-white shadow-md">
                                👑
                            </div>
                        </div>
                    ) : tier === "BASIC" ? (
                        <div className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                            <Avatar
                                src={getUserAvatarUrl(user)}
                                sx={{
                                    width: "52px",
                                    height: "52px",
                                    bgcolor: "var(--color-bgc-highlight)",
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
                                width: "52px",
                                height: "52px",
                                bgcolor: "var(--color-bgc-highlight)",
                            }}
                        >
                            {getFirstCharacter(user)}
                        </Avatar>
                    )}

                    <div className="min-w-0 flex-1 text-left">
                        <h2 className="text-text-primary truncate text-sm font-semibold">
                            {getUserFullName(user)}
                        </h2>
                        <p className="text-tc-muted mt-0.5 truncate text-xs font-medium">
                            {user ? user.email : ""}
                        </p>
                        {tier === "PREMIUM" && (
                            <div className="mt-1">
                                <Chip
                                    label="PREMIUM 👑"
                                    size="small"
                                    sx={{
                                        height: 18,
                                        fontSize: "9px",
                                        fontWeight: 900,
                                        "& .MuiChip-label": { px: 1, py: 0 },
                                    }}
                                    className="bg-gradient-to-r from-amber-400 to-rose-500 text-white shadow-xs"
                                />
                            </div>
                        )}
                        {tier === "BASIC" && (
                            <div className="mt-1">
                                <Chip
                                    label="BASIC ★"
                                    size="small"
                                    sx={{
                                        height: 18,
                                        fontSize: "9px",
                                        fontWeight: 800,
                                        "& .MuiChip-label": { px: 1, py: 0 },
                                    }}
                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <Divider />

                <div className="flex flex-col gap-y-1 px-1.5 py-2">
                    {ACCOUNT_MENU_ITEMS.map((item) => {
                        if (item.type === "STATIC") {
                            return <div key={item.id}>{item.component}</div>;
                        }

                        const isActive =
                            item.type === "LINK" &&
                            item.redirectLink !== "/" &&
                            (pathname === item.redirectLink ||
                                pathname.startsWith(item.redirectLink + "/"));

                        return (
                            <Link
                                href={item.redirectLink}
                                key={item.id}
                                onClick={handleClose}
                                className={cn(
                                    "group relative flex h-10 items-center justify-start rounded-md px-3.5 transition-all duration-150",
                                    isActive
                                        ? "bg-bgc-highlight/15 text-bgc-highlight font-semibold"
                                        : "text-text-contrast hover:text-text-highlight hover:bg-hbgc-page",
                                )}
                            >
                                <span
                                    className={cn(
                                        "flex h-10 w-8 items-center transition-colors",
                                        isActive
                                            ? "text-bgc-highlight"
                                            : "text-text-muted group-hover:text-text-highlight",
                                    )}
                                >
                                    {item.icon}
                                </span>
                                <p className="text-sm font-semibold whitespace-nowrap">
                                    {t(
                                        `common.layout.header.accountMenu.${item.titleKey}`,
                                    )}
                                </p>
                            </Link>
                        );
                    })}
                </div>

                <Divider />

                <LogoutButton />
            </div>
        </Popover>
    );
};

export default AccountMenu;
