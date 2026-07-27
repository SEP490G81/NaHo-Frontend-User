import React from "react";
import { Skeleton } from "@mui/material";

const DailyMissionLoading = () => {
    return (
        <div className="flex flex-col gap-3 py-2">
            {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton
                    key={i}
                    variant="rounded"
                    height={72}
                    sx={{
                        borderRadius: "16px",
                        bgcolor: "var(--color-hbgc-app)",
                    }}
                />
            ))}
        </div>
    );
};

export default DailyMissionLoading;
