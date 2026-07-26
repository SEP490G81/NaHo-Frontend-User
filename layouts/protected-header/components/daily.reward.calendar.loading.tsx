import React from "react";
import { Skeleton } from "@mui/material";

const DailyRewardCalendarLoading = () => {
    return (
        <div className="grid grid-cols-7 gap-1.5 py-2 sm:gap-2">
            {Array.from({ length: 31 }).map((_, i) => (
                <Skeleton
                    key={i}
                    variant="rounded"
                    height={84}
                    sx={{
                        borderRadius: "12px",
                        bgcolor: "var(--color-hbgc-app)",
                    }}
                />
            ))}
        </div>
    );
};

export default DailyRewardCalendarLoading;
