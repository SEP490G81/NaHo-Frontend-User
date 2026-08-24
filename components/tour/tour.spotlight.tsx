"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { X } from "lucide-react";
import { useTourStore } from "@/store/tourStore";
import { TourStepDef } from "./tour.types";
import { useTourTargetRect } from "./hooks/use.tour.target.rect";
import { TourStepCard } from "./tour.step.card";

interface TourSpotlightProps {
    tourId: string;
    steps: TourStepDef[];
    /** Namespace next-intl chứa {stepId}.title / {stepId}.description của tour này. */
    i18nNamespace: string;
}

const SPOTLIGHT_PADDING = 8;
const CARD_WIDTH = 300;
const CARD_MARGIN = 12;

/**
 * Tour "khoanh sáng" phần tử thật trên trang: bám theo pathname để tự nhận ra
 * đang ở bước nào. Người dùng tiến bằng cách tự bấm vào phần tử thật (không có
 * nút Next điều hướng hộ) — khi bước kế cùng trang (vd mở dialog, không đổi URL)
 * thì tự tiến khi bấm đúng phần tử đang khoanh sáng; khi bước kế khác trang thì
 * việc đổi pathname (do chính cú bấm đó gây ra) tự khiến bước được nhận diện lại.
 */
export function TourSpotlight({
    tourId,
    steps,
    i18nNamespace,
}: Readonly<TourSpotlightProps>) {
    const t = useTranslations(
        i18nNamespace as Parameters<typeof useTranslations>[0],
    );
    const tCommon = useTranslations("userGuide.tour");
    const pathname = usePathname();
    const activeTourId = useTourStore((s) => s.activeTourId);
    const stopTour = useTourStore((s) => s.stopTour);
    const isActive = activeTourId === tourId;

    // Lazy init: nếu tour đang chạy dở (activeTourId sống sót qua F5 nhờ persist)
    // thì phải nhận đúng bước theo pathname thật ngay từ lần render đầu, không
    // phải luôn bắt đầu lại từ bước 0.
    const [stepIndex, setStepIndex] = useState(() => {
        const idx = steps.findIndex((s) => s.routeTest.test(pathname));
        return idx >= 0 ? idx : 0;
    });
    const [trackedPathname, setTrackedPathname] = useState(pathname);

    // Route đổi (kể cả do chính cú bấm bước trước gây ra) → tìm bước khớp gần
    // nhất theo hướng tiến tới trước, không lùi về bước cũ nếu URL trùng nhiều bước.
    // Điều chỉnh state ngay trong lúc render (không dùng effect) theo khuyến nghị
    // của React cho việc "đồng bộ state theo một giá trị bên ngoài vừa đổi".
    if (isActive && pathname !== trackedPathname) {
        setTrackedPathname(pathname);
        const forward = steps.findIndex(
            (s, i) => i >= stepIndex && s.routeTest.test(pathname),
        );
        const resolved =
            forward >= 0
                ? forward
                : steps.findIndex((s) => s.routeTest.test(pathname));
        setStepIndex(resolved >= 0 ? resolved : stepIndex);
    }

    const step = steps[stepIndex];
    const onCurrentRoute = !!step && step.routeTest.test(pathname);
    const rect = useTourTargetRect(
        isActive && onCurrentRoute ? step.targetId : "",
    );
    const hasRect = rect != null;

    // Nhiều bước có thể cùng nằm trên 1 route (vd mở dialog không đổi URL) —
    // khi bước kế cũng cùng route, tự tiến ngay lúc người dùng bấm phần tử đang
    // khoanh sáng thay vì chờ đổi pathname (vốn sẽ không xảy ra trong trường hợp này).
    // Phụ thuộc vào `hasRect` (boolean) thay vì `rect` (object đổi mỗi lần
    // scroll/resize) để không tháo/gắn lại listener liên tục khi cuộn trang.
    useEffect(() => {
        if (!isActive || !hasRect || !step) return;
        const next = steps[stepIndex + 1];
        if (!next || !next.routeTest.test(pathname)) return;
        const el = document.querySelector<HTMLElement>(
            `[data-tour-id="${step.targetId}"]`,
        );
        if (!el) return;
        const handleClick = () => setStepIndex((i) => i + 1);
        el.addEventListener("click", handleClick);
        return () => el.removeEventListener("click", handleClick);
    }, [isActive, hasRect, step, steps, stepIndex, pathname]);

    if (!isActive) return null;

    if (!onCurrentRoute || !rect) {
        // Chưa tìm thấy đúng trang/phần tử (đang tải, hoặc user rời khỏi luồng
        // tour) — vẫn phải cho người dùng cách thoát tour, không được im lặng
        // giữ activeTourId vô thời hạn mà không có UI nào để tắt.
        return (
            <button
                type="button"
                onClick={stopTour}
                className="border-bdc-primary bg-bgc-app text-text-muted hover:text-text-contrast fixed right-4 bottom-4 z-[1251] flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-lg"
            >
                <X className="h-3.5 w-3.5" />
                {tCommon("skip")}
            </button>
        );
    }

    const isLastStep = stepIndex === steps.length - 1;
    const spotlightRect = {
        top: rect.top - SPOTLIGHT_PADDING,
        left: rect.left - SPOTLIGHT_PADDING,
        width: rect.width + SPOTLIGHT_PADDING * 2,
        height: rect.height + SPOTLIGHT_PADDING * 2,
    };

    const spaceBelow = window.innerHeight - rect.bottom;
    const showCardBelow = spaceBelow > 180 || rect.top < 180;
    const cardTop = showCardBelow
        ? spotlightRect.top + spotlightRect.height + CARD_MARGIN
        : spotlightRect.top - CARD_MARGIN;
    const cardLeft = Math.min(
        Math.max(rect.left, CARD_MARGIN),
        window.innerWidth - CARD_WIDTH - CARD_MARGIN,
    );

    return (
        <>
            <div
                className="pointer-events-none fixed z-[1250] rounded-2xl transition-all duration-300"
                style={{
                    top: spotlightRect.top,
                    left: spotlightRect.left,
                    width: spotlightRect.width,
                    height: spotlightRect.height,
                    boxShadow:
                        "0 0 0 3px var(--color-bgc-highlight), 0 0 0 9999px rgba(15, 23, 42, 0.6)",
                }}
            />

            <TourStepCard
                style={{
                    width: CARD_WIDTH,
                    left: cardLeft,
                    top: showCardBelow ? cardTop : undefined,
                    bottom: showCardBelow
                        ? undefined
                        : window.innerHeight - cardTop,
                }}
                stepLabel={tCommon("stepCounter", {
                    current: stepIndex + 1,
                    total: steps.length,
                })}
                title={t(`${step.id}.title`)}
                description={t(`${step.id}.description`)}
                isLastStep={isLastStep}
                pointHint={tCommon("pointHint")}
                skipLabel={tCommon("skip")}
                finishLabel={tCommon("finish")}
                onSkip={stopTour}
            />
        </>
    );
}

export default TourSpotlight;
