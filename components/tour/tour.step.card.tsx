import { X } from "lucide-react";

interface TourStepCardProps {
    style: React.CSSProperties;
    stepLabel: string;
    title: string;
    description: string;
    isLastStep: boolean;
    pointHint: string;
    skipLabel: string;
    finishLabel: string;
    onSkip: () => void;
}

/** Thẻ chỉ dẫn nổi cạnh vùng khoanh sáng: tiêu đề, mô tả và nút thoát/hoàn tất. */
export function TourStepCard({
    style,
    stepLabel,
    title,
    description,
    isLastStep,
    pointHint,
    skipLabel,
    finishLabel,
    onSkip,
}: Readonly<TourStepCardProps>) {
    return (
        <div
            className="border-bdc-primary bg-bgc-app fixed z-[1251] flex flex-col gap-2 rounded-2xl border p-4 shadow-xl"
            style={style}
        >
            <div className="flex items-start justify-between gap-2">
                <span className="bg-bgc-highlight/15 text-bgc-highlight w-fit rounded-full px-2.5 py-0.5 text-[11px] font-bold">
                    {stepLabel}
                </span>
                <button
                    type="button"
                    onClick={onSkip}
                    aria-label={skipLabel}
                    className="text-text-muted hover:text-text-contrast shrink-0 cursor-pointer"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            <h3 className="text-text-contrast text-sm font-bold">{title}</h3>
            <p className="text-text-muted text-xs leading-relaxed">
                {description}
            </p>

            <div className="mt-1 flex items-center justify-between gap-2">
                {isLastStep ? (
                    <button
                        type="button"
                        onClick={onSkip}
                        className="bg-bgc-highlight text-text-pure w-full cursor-pointer rounded-xl px-3 py-2 text-xs font-bold transition-opacity hover:opacity-90"
                    >
                        {finishLabel}
                    </button>
                ) : (
                    <>
                        <span className="text-text-muted text-[11px]">
                            {pointHint}
                        </span>
                        <button
                            type="button"
                            onClick={onSkip}
                            className="text-text-muted hover:text-text-contrast cursor-pointer text-[11px] font-semibold underline"
                        >
                            {skipLabel}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default TourStepCard;
