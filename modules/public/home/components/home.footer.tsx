import LogoButton from "@/modules/public/login/components/logo.button";
import { FOOTER_LEGAL_LINKS } from "@/modules/public/home/constants/home.constant";
import { HEADER_LINK_ITEMS } from "@/layouts/public-header/constants/public.header.constant";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const HomeFooter = () => {
    const t = useTranslations();
    return (
        <footer className="border-bdc-primary bg-bgc-app/60 border-t">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-12 sm:grid-cols-3 md:px-8">
                <div className="flex flex-col gap-3 sm:col-span-1">
                    <LogoButton>
                        <span className="text-text-contrast text-sm font-bold whitespace-nowrap">
                            {t("common.appName")}
                        </span>
                    </LogoButton>
                    <p className="text-text-muted max-w-xs text-sm leading-relaxed">
                        {t("home.footer.tagline")}
                    </p>
                </div>

                <div>
                    <h3 className="text-text-contrast text-sm font-bold">
                        {t("home.footer.productTitle")}
                    </h3>
                    <ul className="mt-3 flex flex-col gap-2">
                        {HEADER_LINK_ITEMS.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.redirectLink}
                                    className="text-text-muted hover:text-text-highlight text-sm transition-colors"
                                >
                                    {t(
                                        `common.metadata.title.${item.titleKey}`,
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-text-contrast text-sm font-bold">
                        {t("home.footer.legalTitle")}
                    </h3>
                    <ul className="mt-3 flex flex-col gap-2">
                        {FOOTER_LEGAL_LINKS.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.redirectLink}
                                    className="text-text-muted hover:text-text-highlight text-sm transition-colors"
                                >
                                    {t(
                                        `common.metadata.title.${item.titleKey}`,
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="border-bdc-primary border-t">
                <div className="mx-auto max-w-6xl px-5 py-4 md:px-8">
                    <p className="text-text-muted text-center text-xs font-semibold md:text-sm">
                        {t("common.copyright")}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default HomeFooter;
