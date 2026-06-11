import LogoButton from "@/modules/public/login/components/logo.button";
import { useTranslations } from "next-intl";

const HomeFooter = () => {
    const t = useTranslations();
    return (
        <footer className="border-bdc-primary border-t">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-4 md:flex-row md:justify-between md:px-8">
                <LogoButton>
                    <span className="text-text-contrast text-sm font-bold whitespace-nowrap">
                        {t("appName")}
                    </span>
                </LogoButton>
                <p className="text-text-muted text-center text-xs font-semibold md:text-right md:text-sm">
                    {t("copyright")}
                </p>
            </div>
        </footer>
    );
};

export default HomeFooter;
