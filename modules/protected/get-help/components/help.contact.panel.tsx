"use client";

import ContainerBox from "@/components/ui/container.box";
import { Link } from "@/i18n/navigation";
import { HELP_SUPPORT_EMAIL } from "@/modules/protected/get-help/constants/help.constant";
import { useReportStore } from "@/store/reportStore";
import { ArrowRight, Clock, Flag, Mail, ScrollText } from "lucide-react";
import { useTranslations } from "next-intl";

const cardClass =
    "border-bdc-primary bg-bgc-page flex h-full flex-col rounded-xl border p-5";
const iconWrapClass =
    "bg-bgc-highlight/15 text-bgc-highlight flex h-10 w-10 items-center justify-center rounded-lg";
const titleClass = "text-text-contrast mt-3 text-[15px] font-semibold";
const descriptionClass = "text-text-muted mt-1 text-sm leading-relaxed";
const actionClass =
    "text-bgc-highlight mt-4 inline-flex items-center gap-x-1.5 self-start text-sm font-semibold hover:underline";

const HelpContactPanel = () => {
    const t = useTranslations("help.contact");
    const openReportModal = useReportStore((state) => state.openModal);

    return (
        <ContainerBox as="section">
            <div className="max-w-2xl">
                <h2 className="text-text-contrast text-lg font-bold md:text-xl">
                    {t("title")}
                </h2>
                <p className="text-text-muted mt-1 text-sm">
                    {t("description")}
                </p>
                <p className="text-text-muted mt-3 flex items-center gap-1.5 text-sm">
                    <Clock className="h-4 w-4" />
                    {t("responseTime")}
                </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className={cardClass}>
                    <span className={iconWrapClass}>
                        <Flag className="h-5 w-5" />
                    </span>
                    <h3 className={titleClass}>{t("channels.report.title")}</h3>
                    <p className={descriptionClass}>
                        {t("channels.report.description")}
                    </p>
                    <button
                        type="button"
                        onClick={() => openReportModal("SYSTEM")}
                        className={`${actionClass} cursor-pointer`}
                    >
                        {t("channels.report.action")}
                        <ArrowRight className="h-4 w-4" />
                    </button>
                    <Link
                        href="/reports"
                        className="text-text-muted hover:text-text-highlight mt-2 inline-flex items-center gap-x-1.5 self-start text-sm transition-colors"
                    >
                        {t("channels.report.historyAction")}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className={cardClass}>
                    <span className={iconWrapClass}>
                        <Mail className="h-5 w-5" />
                    </span>
                    <h3 className={titleClass}>{t("channels.email.title")}</h3>
                    <p className={descriptionClass}>
                        {t("channels.email.description")}
                    </p>
                    <a
                        href={`mailto:${HELP_SUPPORT_EMAIL}`}
                        className={actionClass}
                    >
                        {t("channels.email.action")}
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className={cardClass}>
                    <span className={iconWrapClass}>
                        <ScrollText className="h-5 w-5" />
                    </span>
                    <h3 className={titleClass}>{t("channels.legal.title")}</h3>
                    <p className={descriptionClass}>
                        {t("channels.legal.description")}
                    </p>
                    <Link href="/terms" className={actionClass}>
                        {t("channels.legal.action")}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </ContainerBox>
    );
};

export default HelpContactPanel;
