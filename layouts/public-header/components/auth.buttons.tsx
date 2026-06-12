import React from "react";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const AuthButtons = () => {
    const t = useTranslations();
    return (
        <div className="flex items-center justify-end gap-x-3">
            <Link href={"/login"}>
                <Button variant="outlined" color="primary" size="small">
                    {t("common.layout.header.loginButton")}
                </Button>
            </Link>
            <Link
                href={"/register"}
                className="transition-all duration-300 hover:scale-105"
            >
                <Button variant="contained" color="primary" size="small">
                    {t("common.layout.header.registerButton")}
                </Button>
            </Link>
        </div>
    );
};

export default AuthButtons;
