"use client";
import React from "react";
import { useTranslations } from "next-intl";

/** Bong bóng "Bắt đầu" gắn trên node "bạn đang ở đây". */
export function StartBubble() {
    const t = useTranslations("marugoto");
    return (
        <div className="animate-naho-bob text-bgc-highlight relative z-20 mb-1">
            <span className="border-bgc-highlight bg-bgc-app/95 inline-block rounded-full border-2 px-3.5 py-1 text-[11px] font-extrabold tracking-wider uppercase shadow-md backdrop-blur-xs">
                {t("path.startBubble")}
            </span>
            <span className="border-t-bgc-highlight absolute -bottom-[7px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[7px] border-t-[8px] border-x-transparent" />
        </div>
    );
}

export default StartBubble;
