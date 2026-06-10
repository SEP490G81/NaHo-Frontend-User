import React from "react";
import { Link } from "@/intl/i18n/navigation";
import { useTranslations } from "next-intl";
import { HEADER_LINK_ITEMS } from "@/layouts/public-header/constants/public.header.constant";

const PublicHeaderLinks = () => {
    const t = useTranslations();
    return (
        <div className="flex items-center gap-x-5">
            {HEADER_LINK_ITEMS.map((item) => {
                return (
                    <Link
                        className="text-text-muted hover:bg-hbgc-page flex h-10 items-center justify-center rounded-md px-2 text-sm font-semibold transition-all duration-150"
                        href={item.redirectLink}
                        key={item.id}
                    >
                        {t(`metadata.title.${item.titleKey}`)}
                    </Link>
                );
            })}
        </div>
    );
};

export default PublicHeaderLinks;
