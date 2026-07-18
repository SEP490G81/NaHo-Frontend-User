"use client";
import React from "react";
import { useTranslations } from "next-intl";

interface LeaderboardEmptyProps {
    leagueName: string;
}

/**
 * Hạng cao gần như chắc chắn rỗng ở giai đoạn đầu vận hành nên trạng thái này
 * là đường đi chính, không phải ngoại lệ hiếm gặp. Nằm trong panel chung nên
 * không tự vẽ border.
 */
export function LeaderboardEmpty({ leagueName }: LeaderboardEmptyProps) {
    const t = useTranslations("leaderboard");

    return (
        <div className="p-12 text-center">
            <p className="text-text-contrast font-semibold">
                {t("empty.title")}
            </p>
            <p className="text-text-muted mt-1 text-sm">
                {t("empty.description", { league: leagueName })}
            </p>
        </div>
    );
}

export default LeaderboardEmpty;
