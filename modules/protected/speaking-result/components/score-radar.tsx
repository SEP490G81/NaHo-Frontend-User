"use client";
import {
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart,
    ResponsiveContainer,
} from "recharts";

interface Props {
    data: { label: string; value: number }[];
}

/** Radar 7 chiều điểm. Import động (ssr:false) ở parent để tránh lệch hydrate. */
export function ScoreRadar({ data }: Readonly<Props>) {
    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height={256} minWidth={0}>
                <RadarChart data={data} outerRadius="70%">
                    <PolarGrid
                        stroke="currentColor"
                        className="text-bdc-primary"
                    />
                    <PolarAngleAxis
                        dataKey="label"
                        tick={{ fontSize: 11, fill: "currentColor" }}
                        className="text-text-muted"
                    />
                    <Radar
                        dataKey="value"
                        stroke="var(--color-bgc-highlight)"
                        fill="var(--color-bgc-highlight)"
                        fillOpacity={0.35}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ScoreRadar;
