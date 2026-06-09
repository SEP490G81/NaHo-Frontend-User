import React from "react";
import LoginForm from "@/modules/(public)/login/features/login.form";
import { Link } from "@/intl/i18n/navigation";
import { useTranslations } from "next-intl";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ThemeSwitchButton from "@/layouts/header/components/theme.switch.button";

const RightContent = () => {
    const t = useTranslations();
    return (
        <div className="relative flex w-full items-center justify-center overflow-hidden px-5 py-10 md:w-1/2 md:px-10">
            <div className="bg-bgc-highlight pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full opacity-30 blur-3xl" />
            <div className="bg-bgc-highlight/50 pointer-events-none absolute -bottom-20 left-10 h-72 w-72 rounded-full opacity-20 blur-3xl" />

            <div className="absolute top-5 right-5">
                <ThemeSwitchButton />
            </div>

            <div className="border-bdc-primary bg-bgc-app/70 relative w-full max-w-md rounded-2xl border px-6 py-5 shadow-xl backdrop-blur-xl md:px-8 md:py-10">
                <Link
                    href={"/introduction"}
                    className="text-text-muted hover:text-text-highlight mb-5 flex items-center justify-start gap-x-1 text-sm"
                >
                    <KeyboardBackspaceIcon fontSize="small" />
                    {t("page.login.backToIntroductionPage")}
                </Link>

                <div className="my-5 md:my-8">
                    <h1 className="text-3xl leading-tight font-bold">
                        {t("page.login.welcome")}
                    </h1>
                    <p className="text-text-muted mt-2 mb-5 text-sm">
                        {t("page.login.loginDescription")}
                    </p>
                </div>

                <LoginForm />
            </div>
        </div>
    );
};

export default RightContent;
