"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import RefreshIcon from "@mui/icons-material/Refresh";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";

interface QuoteItem {
    kanji: string;
    romaji: string;
    translation: string;
    kanjiDetail: string;
}

const QUOTES: QuoteItem[] = [
    {
        kanji: "継続は力なり",
        romaji: "Keizoku wa chikara nari",
        translation: "Sự kiên trì tạo nên sức mạnh — Luyện tập Kaiwa mỗi ngày từng chút một sẽ mang lại sự tự tin vượt bậc.",
        kanjiDetail: "継続 (Keizoku): Tiếp tục • 力 (Chikara): Sức mạnh",
    },
    {
        kanji: "七転び八起き",
        romaji: "Nanakorobi yaoki",
        translation: "Vấp ngã 7 lần, đứng dậy 8 lần — Đừng ngại phát âm sai, mỗi bài học sẽ hoàn thiện kỹ năng giao tiếp của bạn.",
        kanjiDetail: "七転 (Nanakorobi): 7 lần ngã • 八起 (Yaoki): 8 lần đứng dậy",
    },
    {
        kanji: "一期一会",
        romaji: "Ichigo ichie",
        translation: "Nhất kỳ nhất hội — Trân trọng từng cuộc hội thoại Kaiwa và khoảnh khắc học tập quý giá.",
        kanjiDetail: "一期 (Ichigo): Một đời • Một lần gặp gỡ",
    },
    {
        kanji: "塵も積もれば山となる",
        romaji: "Chiri mo tsumoreba yama to naru",
        translation: "Tích tiểu thành đại — Mỗi từ vựng tích lũy hôm nay là nền tảng vững chắc cho tương lai.",
        kanjiDetail: "塵 (Chiri): Hạt bụi nhỏ • 山 (Yama): Ngọn núi lớn",
    },
    {
        kanji: "初心忘るべからず",
        romaji: "Shoshin wasurubekarazu",
        translation: "Không quên ý nguyện ban đầu — Giữ vững đam mê chinh phục tiếng Nhật Kaiwa giao tiếp tự nhiên.",
        kanjiDetail: "初心 (Shoshin): Sơ tâm, tâm thế ban đầu",
    },
];

export function KanjiQuoteCard() {
    const t = useTranslations("dashboard");
    const [index, setIndex] = useState(0);

    const quote = QUOTES[index];

    const handleNextQuote = () => {
        setIndex((prev) => (prev + 1) % QUOTES.length);
    };

    return (
        <div className="relative overflow-hidden rounded-2xl border border-bdc-primary bg-bgc-card p-6 shadow-sm transition-all hover:shadow-md">

            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                {/* Header tag & refresh button */}
                <div className="flex items-center justify-between pb-3 border-b border-bdc-primary/60">
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
                        onClick={handleNextQuote}
                        className="text-text-muted hover:text-[#ff758f] hover:bg-[#ff99ac]/10 transition-transform active:rotate-180"
                        title={t("nextQuote")}
                    >
                        <RefreshIcon style={{ fontSize: 20 }} />
                    </IconButton>
                </div>

                {/* Main Kanji quote display */}
                <div className="my-2 space-y-2">
                    <h2 className="text-3xl font-black tracking-wide text-[#ff758f] sm:text-4xl">
                        {quote.kanji}
                    </h2>
                    <p className="text-xs font-semibold text-text-muted">
                        ({quote.romaji})
                    </p>
                    <p className="text-sm font-medium text-text-primary leading-relaxed pt-1">
                        {quote.translation}
                    </p>
                </div>

                {/* Kanji detail badge */}
                <div className="pt-3 border-t border-bdc-primary/60 flex flex-wrap items-center gap-2">
                    <Chip
                        label={quote.kanjiDetail}
                        size="small"
                        className="bg-[#ff99ac]/20 text-[#ff758f] font-bold border border-[#ff99ac]/40 text-xs"
                    />
                </div>
            </div>
        </div>
    );
}

export default KanjiQuoteCard;
