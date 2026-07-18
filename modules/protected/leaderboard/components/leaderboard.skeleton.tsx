import React from "react";
import { LEADERBOARD_TOP_SIZE } from "../constants/leaderboard.constant";

/** Các dòng giả lập dạng thẻ, dùng cho vùng danh sách khi đang tải. */
export function LeaderboardRowsSkeleton() {
    return (
        <div className="space-y-2">
            {Array.from({ length: LEADERBOARD_TOP_SIZE }).map((_, index) => (
                <div
                    key={index}
                    className="bg-bgc-app border-bdc-primary h-16 animate-pulse rounded-2xl border"
                />
            ))}
        </div>
    );
}

/** Skeleton toàn màn khi chưa xác định được hạng để hiển thị. */
export function LeaderboardSkeleton() {
    return (
        <div className="space-y-5">
            <div className="bg-bgc-app border-bdc-primary h-64 animate-pulse rounded-2xl border" />
            <div className="grid gap-4 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-bgc-app border-bdc-primary h-20 animate-pulse rounded-2xl border"
                    />
                ))}
            </div>
            <LeaderboardRowsSkeleton />
        </div>
    );
}

export default LeaderboardSkeleton;
