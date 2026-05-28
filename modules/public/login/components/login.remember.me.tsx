import React, { Dispatch, SetStateAction } from "react";
import { Link } from "@/intl/i18n/navigation";
import { Checkbox } from "@mui/material";
import { useTranslations } from "next-intl";

const LoginRememberMe = ({
    rememberMe,
    setRememberMe,
}: {
    rememberMe: boolean;
    setRememberMe: Dispatch<SetStateAction<boolean>>;
}) => {
    const t = useTranslations();
    return (
        <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-x-1.5">
                <Checkbox
                    id="rememberMe"
                    size="small"
                    sx={{ padding: 0 }}
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                />
                <label
                    htmlFor="rememberMe"
                    className="cursor-pointer text-sm select-none"
                >
                    {t("page.login.form.rememberLogin")}
                </label>
            </div>
            <Link
                href={"/forgot-password"}
                className="text-text-highlight text-sm select-none hover:underline"
            >
                {t("page.login.form.forgotPassword")}
            </Link>
        </div>
    );
};

export default LoginRememberMe;
