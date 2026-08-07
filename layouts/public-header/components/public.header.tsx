"use client";
import LogoButton from "@/modules/public/login/components/logo.button";
import { useTranslations } from "next-intl";
import LanguageSwitch from "@/components/ui/language.switch";
import ThemeSwitchButton from "@/layouts/public-header/components/theme.switch.button";
import AuthButtons from "@/layouts/public-header/components/auth.buttons";
import PublicHeaderLinks from "@/layouts/public-header/components/public.header.links";
import { useCurrentUser } from "@/hooks/use.current.user";
import UserAvatar from "@/layouts/sidebar/components/user.avatar";

const PublicHeader = () => {
    const t = useTranslations();
    const { data: user } = useCurrentUser();

    return (
        <div className="border-b-bdc-primary bg-bgc-app sticky top-0 left-0 z-10 flex items-center justify-around border-b px-3 py-3.5">
            <LogoButton>
                <h1 className="text-text-contrast text-lg font-bold whitespace-nowrap">
                    {t("common.appName")}
                </h1>
            </LogoButton>

            <PublicHeaderLinks />

            <div className="flex items-center gap-x-3">
                <LanguageSwitch
                    variant="icon-button"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                />
                <ThemeSwitchButton />
                {user ? <UserAvatar /> : <AuthButtons />}
            </div>
        </div>
    );
};

export default PublicHeader;
