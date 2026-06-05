"use client";
import AuthButtons from "@/layouts/header/components/auth.buttons";
import ThemeSwitchButton from "@/layouts/header/components/theme.switch.button";
import LogoButton from "@/modules/public/login/components/logo.button";
import UserAvatar from "@/layouts/header/components/user.avatar";
import { useAuth } from "@/features/providers/auth.provider";
import { useTranslations } from "next-intl";

const AppHeader = () => {
    const t = useTranslations();
    const { user } = useAuth();

    return (
        <div className="border-b-bdc-primary bg-bgc-app sticky top-0 left-0 z-10 flex items-center justify-between border-b px-3 py-3.5">
            <LogoButton>
                <h1 className="text-text-contrast text-lg font-bold whitespace-nowrap">
                    {t("appName")}
                </h1>
            </LogoButton>

            <div className="flex items-center gap-x-3">
                <ThemeSwitchButton />
                {user ? <UserAvatar /> : <AuthButtons />}
            </div>
        </div>
    );
};

export default AppHeader;
