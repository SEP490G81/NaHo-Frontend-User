"use client";
import React from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface Props {
    totalActivities: number;
}

/** Hero cho màn lịch sử nhận điểm (tiêu đề + tổng số hoạt động). */
export function PointHistoryHeader({ totalActivities }: Props) {
    const t = useTranslations("pointHistory");

    return (
        <div
            className="overflow-hidden rounded-2xl border shadow-sm"
            style={{
                borderColor:
                    "color-mix(in srgb, var(--color-bgc-highlight) 26%, var(--color-bdc-primary))",
                background:
                    "linear-gradient(180deg, color-mix(in srgb, var(--color-bgc-highlight) 10%, var(--color-bgc-app)) 0%, var(--color-bgc-app) 60%)",
            }}
        >
            <div className="flex flex-col gap-4 p-6">
                <Link
                    href="/books"
                    className="text-text-muted hover:text-text-contrast inline-flex w-fit items-center gap-1.5 text-sm font-medium"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t("back")}
                </Link>

                <div className="flex items-center gap-3">
                    <span className="bg-bgc-highlight/15 text-bgc-highlight flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                        <Sparkles className="h-6 w-6" />
                    </span>
                    <div>
                        <h1 className="text-text-contrast text-2xl leading-tight font-bold md:text-3xl">
                            {t("title")}
                        </h1>
                        <p className="text-text-muted text-sm">
                            {t("subtitle")} ·{" "}
                            {t("totalLabel", { count: totalActivities })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PointHistoryHeader;
