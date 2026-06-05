import { Avatar, Divider, Popover } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import LogoutButton from "@/layouts/header/features/logout.button";
import { ACCOUNT_MENU_ITEMS } from "@/layouts/header/constants/header.constant";
import { Link } from "@/intl/i18n/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/features/providers/auth.provider";

const AccountMenu = ({
    anchorEl,
    setAnchorEl,
}: {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement | null>>;
}) => {
    const t = useTranslations();
    const { user } = useAuth();

    const initials = user?.firstName ? user.firstName.charAt(0).toUpperCase() : "U";
    const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "";

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <div>
                <div className="flex items-center gap-x-3 p-3.5">
                    <Avatar
                        src={user?.avatarFileUrl || undefined}
                        sx={{
                            width: "56px",
                            height: "56px",
                            bgcolor: "var(--color-bgc-highlight)",
                        }}
                    >
                        {initials}
                    </Avatar>
                    <div className="text-left">
                        <h2 className="text-sm font-semibold">
                            {fullName}
                        </h2>
                        <p className="text-tc-muted text-sm font-semibold">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <Divider />

                <div className="flex flex-col gap-y-1 px-1 py-2">
                    {ACCOUNT_MENU_ITEMS.map((item) => {
                        if (item.type === "STATIC") {
                            return <div key={item.id}>{item.component}</div>;
                        }
                        return (
                            <Link
                                href={item.redirectLink}
                                key={item.id}
                                className="hover:text-text-highlight hover:bg-hbgc-page flex h-10 items-center justify-start rounded-md px-5 transition-all duration-150"
                            >
                                <span className="flex h-10 w-10 items-center">
                                    {item.icon}
                                </span>
                                <p className="text-sm font-semibold whitespace-nowrap">
                                    {t(
                                        `layout.header.accountMenu.${item.titleKey}`,
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
