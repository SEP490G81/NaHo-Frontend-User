import React from "react";
import Image from "next/image";
import { Gem } from "lucide-react";
import { cn } from "@/libs/utils";
import { LeagueResponse } from "@/types/responses/league.response";
import { getLeagueIconSrc, getLeagueTheme } from "../utils/leaderboard.util";

interface LeagueIconProps {
    league: LeagueResponse;
    label: string;
    size: number;
    className?: string;
}

/**
 * Icon huy hiệu của hạng. Lấy ảnh SVG từ CDN của BE; nếu BE chưa có (vd mock
 * offline) thì hiện placeholder hình viên ngọc tô theo màu hạng — không cần
 * asset local. `unoptimized` vì nguồn là SVG/CDN, qua optimizer không lợi ích.
 */
export function LeagueIcon({
    league,
    label,
    size,
    className,
}: LeagueIconProps) {
    const src = getLeagueIconSrc(league);

    if (!src) {
        const theme = getLeagueTheme(league.name);
        return (
            <Gem
                aria-label={label}
                style={{ width: size, height: size }}
                className={cn("shrink-0", theme.text, className)}
            />
        );
    }

    return (
        <Image
            src={src}
            alt={label}
            width={size}
            height={size}
            unoptimized
            className={cn("shrink-0 select-none", className)}
        />
    );
}

export default LeagueIcon;
