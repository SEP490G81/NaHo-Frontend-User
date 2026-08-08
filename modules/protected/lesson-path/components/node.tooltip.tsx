import React from "react";

/**
 * Khung tooltip hiện khi rê chuột vào mốc trên lộ trình (cờ Bài/Can-do & node).
 * Đặt trong phần tử cha có class `group` để `group-hover` kích hoạt.
 */
export function NodeTooltip({ children }: { children: React.ReactNode }) {
    return (
        <div className="pointer-events-none absolute bottom-full z-30 mb-2 flex flex-col items-center opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <div className="border-bdc-primary bg-bgc-app min-w-[190px] max-w-xs rounded-xl border p-3 text-center shadow-lg">
                {children}
            </div>
            <div className="border-bdc-primary bg-bgc-app -mt-1 h-2 w-2 rotate-45 border-r border-b" />
        </div>
    );
}

export default NodeTooltip;
