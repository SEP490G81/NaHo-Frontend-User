import React from "react";
import { Button, Divider } from "@mui/material";
import { useTranslations } from "next-intl";
import GoogleIcon from "@/components/ui/icons/google.icon";
import { Link } from "@/intl/i18n/navigation";

const LoginFormButtons = () => {
    const t = useTranslations();

    return (
        <div className="w-full">
            <Button type="submit" fullWidth color="primary" variant="contained">
                {t("page.login.form.loginButton")}
            </Button>

            <p className="text-text-error mt-1 text-xs font-semibold">
                {t("page.login.form.wrongLoginInfo")}
            </p>

            <Divider textAlign="center" sx={{ my: "12px" }}>
                <p className="text-text-muted text-xs uppercase select-none">
                    {t("common.or")}
                </p>
            </Divider>

            <Button
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<GoogleIcon />}
            >
                {t("page.login.form.loginByGoogle")}
            </Button>

            <div className="mt-5 flex items-center justify-center gap-x-1 text-sm md:mt-8">
                <p className="text-text-muted">
                    {t("page.login.form.noAccount")}
                </p>
                <Link
                    href={"/register"}
                    className="text-text-highlight hover:underline"
                >
                    {t("page.login.form.registerNow")}
                </Link>
            </div>
        </div>
    );
};

export default LoginFormButtons;
