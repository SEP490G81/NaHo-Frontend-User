"use client";
import { useTranslations } from "next-intl";

const ACCENT = "var(--book-accent, var(--color-bgc-highlight))";

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
            <div className="border-bdc-primary bg-bgc-page flex h-12 items-end justify-center gap-1 rounded-lg border p-2">
                {Array.from({ length: bars }).map((_, i) => {
                    const threshold = ((i + 1) / bars) * 100;
                    const lit = active && clamped >= threshold;
                    const heightPct = 20 + ((i + 1) / bars) * 80;
                    // Bar sáng theo màu sách; ngưỡng cao (>80%) giữ màu đỏ cảnh báo.
                    const background = !lit
                        ? "color-mix(in srgb, var(--color-bdc-muted) 50%, transparent)"
                        : threshold > 80
                          ? "var(--color-bgc-error)"
                          : threshold > 55
                            ? ACCENT
                            : `color-mix(in srgb, ${ACCENT} 80%, transparent)`;
                    return (
                        <span
                            key={i}
                            className="w-1.5 rounded-sm transition-all duration-150"
                            style={{ height: `${heightPct}%`, background }}
                        />
                    );
                })}
            </div>
            <div className="text-text-muted flex items-center justify-between text-xs">
                <span>{t("micLevel")}</span>
                <span className="font-mono tabular-nums">
                    {Math.round(clamped)}%
                </span>
            </div>
        </div>
    );
}

export default MicVolumeGauge;
