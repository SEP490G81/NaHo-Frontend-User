"use client";
import { useFormatter, useTranslations } from "next-intl";
import { LeagueResponse } from "@/types/responses/league.response";
import { toLeagueSlug } from "./leaderboard.util";

/**
 * Nhãn hiển thị của hạng.
 * BE lưu `name`/`description` bằng tiếng Việt cứng nên FE chỉ dùng `name`
 * làm khóa, còn chữ hiển thị lấy từ file dịch để chạy được cả 3 ngôn ngữ.
 */
export function useLeagueLabel() {
    const t = useTranslations("leaderboard");
    const format = useFormatter();

    const name = (league: LeagueResponse) =>
        t(`leagueNames.${toLeagueSlug(league.name)}`);

    const description = (league: LeagueResponse) =>
        t(`leagueDescriptions.${toLeagueSlug(league.name)}`);

    const pointRange = (league: LeagueResponse) =>
        league.maxPoint === null
            ? t("pointRangeOpen", { min: format.number(league.minPoint) })
            : t("pointRange", {
                  min: format.number(league.minPoint),
                  max: format.number(league.maxPoint),
              });

    return { name, description, pointRange };
}
