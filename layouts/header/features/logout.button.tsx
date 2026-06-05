import React from "react";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = () => {
    const t = useTranslations();

    const handleLogout = async () => {
        try {
        } catch (error) {
            console.error("Logout error:", error);
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
