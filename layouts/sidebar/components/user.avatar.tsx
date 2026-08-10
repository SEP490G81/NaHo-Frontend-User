"use client";
import { Button, Chip } from "@mui/material";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use.current.user";
import { useMySubscription } from "@/hooks/use.my.subscription";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { getUserFullName } from "@/layouts/protected-header/utils/header.util";
import AccountMenu from "@/layouts/sidebar/components/account.menu";
import { cn } from "@/libs/utils";
import UserAvatarImage from "./user.avatar.image";

interface Props {
    isCollapsed?: boolean;
}

const UserAvatar = ({ isCollapsed = false }: Props) => {
    const t = useTranslations("dashboard");
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { data: user } = useCurrentUser();
    const { data: subscription } = useMySubscription();

    const subAny = subscription as any;
    const planObj = subAny?.plan || subAny;
    const tier = planObj?.tier || subAny?.tier || "FREE";
    const isPremium = tier === "PREMIUM";
    const name = getUserFullName(user) || user?.username || user?.email || "";

    return (
        <div className="w-full">
            <div
                className={cn(
                    "group hover:bg-hbgc-app hover:border-bdc-primary flex w-full cursor-pointer items-center border border-transparent px-2.5 py-3.5 text-left transition-colors",
                    isCollapsed ? "justify-center" : "justify-start gap-3",
                )}
                onClick={(event) => setAnchorEl(event.currentTarget as any)}
            >
                <UserAvatarImage user={user} tier={tier} size={40} />

                {!isCollapsed && (
                    <div className="min-w-0 flex-1">
                        <p className="text-text-contrast truncate text-sm leading-tight font-bold">
                            {name}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 flex-wrap">
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
                                        color: "#ffffff !important",
                                        "& .MuiChip-label": { px: 1, py: 0, color: "#ffffff !important" },
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

                            {!isPremium && (
                                <Button
                                    component={Link}
                                    href="/settings/billing"
                                    onClick={(e) => e.stopPropagation()}
                                    size="small"
                                    variant="outlined"
                                    startIcon={
                                        <AutoAwesomeIcon
                                            style={{ fontSize: 10 }}
                                            className="text-[#ff758f]"
                                        />
                                    }
                                    sx={{
                                        height: 16,
                                        minWidth: "auto",
                                        px: 0.8,
                                        py: 0,
                                        fontSize: "8.5px",
                                        fontWeight: 800,
                                        lineHeight: 1,
                                        borderRadius: "6px",
                                        borderColor: "rgba(255, 153, 172, 0.6)",
                                        backgroundColor: "rgba(255, 153, 172, 0.1)",
                                        color: "#ff758f",
                                        textTransform: "none",
                                        "& .MuiButton-startIcon": { mr: 0.3, ml: 0 },
                                        "&:hover": {
                                            borderColor: "#ff758f",
                                            backgroundColor: "rgba(255, 153, 172, 0.2)",
                                        },
                                    }}
                                >
                                    {t("upgrade")}
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </div>
    );
};

export default UserAvatar;
