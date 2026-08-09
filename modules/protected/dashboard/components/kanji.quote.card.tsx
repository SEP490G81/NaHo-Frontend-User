"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import RefreshIcon from "@mui/icons-material/Refresh";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";

import { ContainerBox } from "@/components/ui/container.box";
import { getRandomQuote } from "@/services/client/quote.service";
import { QuoteItem } from "@/types/responses/quote.response";

const FALLBACK_QUOTE: QuoteItem = {
    id: 0,
    kanji: "継続は力なり",
    hiragana: "けいぞくはちからなり",
    romaji: "Keizoku wa chikara nari",
    translation:
        "Sự kiên trì tạo nên sức mạnh — Luyện tập Kaiwa mỗi ngày từng chút một sẽ mang lại sự tự tin vượt bậc.",
    kanjiDetail: "継続 (Keizoku): Tiếp tục • 力 (Chikara): Sức mạnh",
};

export function KanjiQuoteCard() {
    const t = useTranslations("dashboard");
    const [quote, setQuote] = useState<QuoteItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchQuote = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getRandomQuote();
            setQuote(data);
        } catch (error) {
            console.error("Lỗi khi tải quote ngẫu nhiên:", error);
            if (!quote) {
                setQuote(FALLBACK_QUOTE);
            }
        } finally {
            setLoading(false);
        }
    }, [quote]);

    useEffect(() => {
        fetchQuote();
    }, []);

    const currentQuote = quote || FALLBACK_QUOTE;

    return (
        <ContainerBox className="relative overflow-hidden border border-bdc-primary bg-gradient-to-br from-bgc-card via-bgc-card to-[#ff99ac]/10 p-5 md:p-6">
            {/* Sakura ambient glow circles phủ toàn bộ ContainerBox */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#ff99ac]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#ff758f]/10 blur-2xl" />

            <div className="relative z-10 flex h-full flex-col justify-between space-y-6">
                {/* Header tag & refresh button */}
                <div className="flex items-center justify-between border-b border-bdc-primary/60 pb-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff99ac]/20 text-[#ff758f]">
                            <MenuBookIcon style={{ fontSize: 20 }} />
                        </div>
                        <span className="text-lg font-extrabold text-text-primary">
                            {t("dailyQuoteTitle")}
                        </span>
                    </div>

                    <IconButton
                        size="small"
                        disabled={loading}
                        onClick={fetchQuote}
                        className="text-text-muted transition-transform hover:bg-[#ff99ac]/10 hover:text-[#ff758f]"
                        title={t("nextQuote")}
                    >
                        <RefreshIcon
                            style={{ fontSize: 20 }}
                            className={loading ? "animate-spin" : ""}
                        />
                    </IconButton>
                </div>

                {/* Main Kanji quote display */}
                <div
                    className={`my-auto space-y-4 text-center py-4 transition-opacity duration-300 ${loading ? "opacity-40" : "opacity-100"
                        }`}
                >
                    {/* Chữ Kanji chính */}
                    <h2 className="text-4xl font-black tracking-tighter text-[#ff758f] sm:text-6xl md:text-7xl lg:text-9xl">
                        {currentQuote.kanji}
                    </h2>

                    {/* Nhóm phần tử bên dưới sát nhau */}
                    <div className="space-y-1.5">

                        {currentQuote.hiragana && (
                            <p className="text-sm font-semibold tracking-wider text-text-muted">
                                ({currentQuote.hiragana})
                            </p>

                        )}

                        {/* Kanji detail badge */}
                        {currentQuote.kanjiDetail && (
                            <div className="pt-0.5">
                                <Chip
                                    label={currentQuote.kanjiDetail}
                                    size="small"
                                    className="border border-[#ff99ac]/40 bg-[#ff99ac]/20 text-xs font-bold text-[#ff758f]"
                                />
                            </div>
                        )}

                        {currentQuote.translation && (
                            <p className="text-base font-medium leading-relaxed text-text-primary">
                                {currentQuote.translation}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </ContainerBox>
    );
}

export default KanjiQuoteCard;
