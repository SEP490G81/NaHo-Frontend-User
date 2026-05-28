import React from "react";
import { Button } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { logout } from "@/services/user.service";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import { getPathname } from "@/intl/i18n/navigation";

const LogoutButton = () => {
    const t = useTranslations();

    const locale = useLocale();

    const localizedLogin = getPathname({
        href: "/login",
        locale,
    });

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            await signOut({
                redirect: true,
                redirectTo: localizedLogin,
            });
        }
    };

    return (
        <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            fullWidth
            sx={{
                columnGap: "12px",
            }}
        >
            <LogoutIcon fontSize="small" />
            {t("layout.header.logoutButton")}
        </Button>
    );
};

export default LogoutButton;
