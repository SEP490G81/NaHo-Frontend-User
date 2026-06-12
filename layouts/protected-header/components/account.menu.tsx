import { Avatar, Divider, Popover } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useCurrentUser } from "@/hooks/use.current.user";
import {
    getFirstCharacter,
    getUserFullName,
} from "@/layouts/protected-header/utils/header.util";
import { ACCOUNT_MENU_ITEMS } from "@/layouts/protected-header/constants/protected.header.constant";
import LogoutButton from "@/layouts/protected-header/features/logout.button";

const AccountMenu = ({
    anchorEl,
    setAnchorEl,
}: {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement | null>>;
}) => {
    const t = useTranslations();
    const { data: user } = useCurrentUser();

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
                vertical: "top",
                horizontal: "right",
            }}
        >
            <div>
                <div className="flex min-w-75 items-center gap-x-3 p-3.5">
                    <Avatar
                        sx={{
                            width: "56px",
                            height: "56px",
                            bgcolor: "var(--color-bgc-highlight)",
                        }}
                    >
                        {getFirstCharacter(user)}
                    </Avatar>
                    <div className="text-left">
                        <h2 className="text-sm font-semibold">
                            {getUserFullName(user)}
                        </h2>
                        <p className="text-tc-muted text-sm font-semibold">
                            {user ? user.email : ""}
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
                                onClick={handleClose}
                                className="hover:text-text-highlight hover:bg-hbgc-page flex h-10 items-center justify-start rounded-md px-5 transition-all duration-150"
                            >
                                <span className="flex h-10 w-10 items-center">
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
