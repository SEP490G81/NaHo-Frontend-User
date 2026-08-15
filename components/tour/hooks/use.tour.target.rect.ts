import { useEffect, useState } from "react";

const POLL_INTERVAL_MS = 250;

function findTargetRect(targetId: string): DOMRect | null {
    if (!targetId || typeof document === "undefined") return null;
    const el = document.querySelector<HTMLElement>(
        `[data-tour-id="${targetId}"]`,
    );
    return el ? el.getBoundingClientRect() : null;
}

/**
 * Theo dõi vị trí (bounding rect) của phần tử thật mang `data-tour-id={targetId}`.
 * Phần tử có thể chưa tồn tại ngay khi đổi bước (đang chờ API) nên poll tới khi
 * tìm thấy rồi tự dừng; khi đã tìm thấy thì bám theo resize/scroll để luôn đúng vị trí.
 * `targetId` rỗng (không có bước nào cần khoanh sáng) → không đo, không poll gì cả.
 */
export function useTourTargetRect(targetId: string): DOMRect | null {
    const [rect, setRect] = useState<DOMRect | null>(() =>
        findTargetRect(targetId),
    );
    const [trackedTargetId, setTrackedTargetId] = useState(targetId);

    // targetId đổi (chuyển bước) → đo lại ngay trong lúc render, theo khuyến nghị
    // của React cho việc "đồng bộ state theo một giá trị bên ngoài vừa đổi" thay
    // vì gọi setState đồng bộ trong effect.
    if (targetId !== trackedTargetId) {
        setTrackedTargetId(targetId);
        setRect(findTargetRect(targetId));
    }

    useEffect(() => {
        if (!targetId) return;

        let pollTimer: ReturnType<typeof setInterval> | null = null;
        const measure = () => {
            const found = findTargetRect(targetId);
            setRect(found);
            if (found && pollTimer) {
                clearInterval(pollTimer);
                pollTimer = null;
            }
        };

        pollTimer = setInterval(measure, POLL_INTERVAL_MS);
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", measure, true);

        return () => {
            if (pollTimer) clearInterval(pollTimer);
            window.removeEventListener("resize", measure);
            window.removeEventListener("scroll", measure, true);
        };
    }, [targetId]);

    return rect;
}
