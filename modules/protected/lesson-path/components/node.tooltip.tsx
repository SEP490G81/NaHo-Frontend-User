"use client";
import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
    /** Nội dung tooltip hiển thị khi rê chuột. */
    tip: React.ReactNode;
    /** Trigger — mốc trên lộ trình (cờ Bài/Can-do hoặc node). */
    children: React.ReactNode;
    /** Tắt tooltip (vd node đang khóa). */
    enabled?: boolean;
    /** Gọi khi bắt đầu hover (để nạp lười đề bài). */
    onOpen?: () => void;
}

/**
 * Tooltip cho mốc lộ trình. Render qua PORTAL ra `body` + `position: fixed` để
 * KHÔNG bị Hero (thanh sticky) hay stacking-context của item (transform) che.
 */
export function NodeTooltip({ tip, children, enabled = true, onOpen }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

    const open = () => {
        if (!enabled) return;
        const r = ref.current?.getBoundingClientRect();
        if (r) setPos({ x: r.left + r.width / 2, y: r.top });
        onOpen?.();
    };

    return (
        <div
            ref={ref}
            className="group relative flex flex-col items-center"
            onMouseEnter={open}
            onMouseLeave={() => setPos(null)}
        >
            {children}
            {pos !== null &&
                createPortal(
                    <div
                        className="pointer-events-none fixed z-[100] flex -translate-x-1/2 -translate-y-full flex-col items-center pb-1"
                        style={{ left: pos.x, top: pos.y }}
                    >
                        <div className="border-bdc-primary bg-bgc-app min-w-[190px] max-w-xs rounded-xl border p-3 text-center shadow-lg">
                            {tip}
                        </div>
                        <div className="border-bdc-primary bg-bgc-app -mt-1 h-2 w-2 rotate-45 border-r border-b" />
                    </div>,
                    document.body,
                )}
        </div>
    );
}

export default NodeTooltip;
