"use client";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface MicVolumeGaugeProps {
    /** Mức âm lượng 0–100 */
    level: number;
    active: boolean;
}

export function MicVolumeGauge({ level, active }: MicVolumeGaugeProps) {
    const t = useTranslations("sandbox");
    const bars = 16;
    const clamped = Math.max(0, Math.min(100, level));

    return (
        <div className="space-y-2">
            <div className="flex h-12 items-end justify-center gap-1 rounded-lg border border-bdc-primary bg-bgc-page p-2">
                {Array.from({ length: bars }).map((_, i) => {
                    const threshold = ((i + 1) / bars) * 100;
                    const lit = active && clamped >= threshold;
                    const heightPct = 20 + ((i + 1) / bars) * 80;
                    return (
                        <span
                            key={i}
                            className={cn(
                                "w-1.5 rounded-sm transition-all duration-150",
                                lit
                                    ? threshold > 80
                                        ? "bg-bgc-error"
                                        : threshold > 55
                                          ? "bg-bgc-highlight"
                                          : "bg-bgc-highlight/80"
                                    : "bg-bdc-muted/50"
                            )}
                            style={{ height: `${heightPct}%` }}
                        />
                    );
                })}
            </div>
            <div className="flex items-center justify-between text-xs text-text-muted">
                <span>{t("micLevel")}</span>
                <span className="font-mono tabular-nums">{Math.round(clamped)}%</span>
            </div>
        </div>
    );
}

export default MicVolumeGauge;
