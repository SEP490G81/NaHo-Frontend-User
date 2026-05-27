"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/intl/i18n/navigation";

const LogoButton = () => {
    const t = useTranslations();

    return (
        <div className="mb-3 flex items-center justify-center">
            <Link
                href={"/introduction"}
                className="flex items-center gap-x-3 select-none"
            >
                <Image
                    src={"/logo.png"}
                    alt="app-logo"
                    width={40}
                    height={40}
                />
                <h1 className="text-text-pure dark:text-text-contrast text-2xl font-bold whitespace-nowrap">
                    {t("appName")}
                </h1>
            </Link>
        </div>
    );
};

export default LogoButton;
