"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { RotateCcw, Save } from "lucide-react";
import { Button } from "@mui/material";
import CustomQuestionCard from "./custom.question.card";
import HistoryDetailOverview from "@/modules/protected/history-detail/components/history.detail.overview";
import HistoryDetailTabs from "@/modules/protected/history-detail/components/history.detail.tabs";

interface SandboxStep4Props {
  questionJp: string;
  hintVi?: string;
  showFurigana: boolean;
  practiceAgain: () => void;
  saveToHistory: () => void;
}

export function SandboxStep4({
  questionJp,
  hintVi,
  showFurigana,
  practiceAgain,
  saveToHistory,
}: SandboxStep4Props) {
  const t = useTranslations("sandboxCustom");
  const tHistoryDetail = useTranslations("historyDetail");

  // Mock report matched with what HistoryDetailOverview and HistoryDetailTabs expect
  const report = React.useMemo(() => {
    return {
      average: 8.0,
      scores: {
        pronunciation: 8.5,
        vocabulary: 7.5,
        grammar: 7.8,
        naturalness: 8.2,
      },
      userTranscript: [
        { text: "申し訳ありませんが、私は" },
        {
          text: "日本語が上手ではありません",
          error: {
            type: "Kính ngữ / Sự tự nhiên",
            explanation: "Cần cải thiện cấu trúc khiêm nhường ngữ khi giao tiếp với đối tác/khách hàng.",
            suggestion: "日本語がまだ十分ではございません",
          },
        },
        { text: "ので、ゆっくり話していただけますか。" },
      ],
      aiSuggestion: {
        jp: "申し訳ありませんが、日本語がまだ十分ではございませんので、ゆっくり話していただけますでしょうか。",
        furigana: "もうしわけありませんが、にほんごがまだじゅうぶんではございませんので、ゆっくりはなしていただけますでしょうか。",
        vi: "Xin lỗi vì sự phiền hà, nhưng khả năng tiếng Nhật của tôi vẫn chưa đủ tốt, vì vậy quý khách có thể nói chậm lại một chút được không ạ?",
        explanation: "Sử dụng kính ngữ 「ございません」 thay cho 「ありません」 và nghi vấn thể lịch sự 「でしょうか」 thay cho 「ですか」 để thể hiện sự trang trọng, lịch sự cao hơn khi giao tiếp với đối tác hoặc khách hàng.",
      },
      pronunciation: [
        { word: "申し訳ありません", score: 85, feedback: "Phát âm tốt, ngữ điệu tự nhiên." },
        { word: "日本語", score: 80, feedback: "Phát âm rõ ràng, đúng trọng âm." },
        { word: "上手", score: 55, feedback: "Chú ý trường âm và cao độ âm 'jo'." },
        { word: "ゆっくり", score: 90, feedback: "Phát âm chuẩn xác." },
        { word: "話して", score: 75, feedback: "Phát âm gần đúng, chú ý âm gió 'shi'." }
      ],
      pronunciationNote: "Chú ý nhấn rõ trường âm (âm dài) và trọng âm ở các từ màu đỏ/cam để câu nói tự nhiên hơn.",
      expressions: [
        {
          jp: "恐れ入りますが、もう一度ご確認いただけますでしょうか。",
          furigana: "おそれいりますが、もういちどごかくにんいただけますでしょうか。",
          vi: "Xin lỗi vì sự phiền hà, anh/chị có thể xác nhận lại giúp em một lần nữa được không ạ?",
          note: "Mẫu kính ngữ lịch sự khi nhờ cấp trên kiểm tra lại.",
        },
        {
          jp: "現状をご報告させていただきます。",
          furigana: "げんじょうをごほうこくさせていただきます。",
          vi: "Em xin phép báo cáo tình hình hiện tại.",
          note: "Mở đầu báo cáo chuyên nghiệp trong môi trường công ty Nhật.",
        }
      ],
      itVocab: [
        {
          jp: "進捗",
          furigana: "しんちょく",
          romaji: "shinchoku",
          vi: "Tiến độ công việc",
          en: "Progress"
        },
        {
          jp: "仕様書",
          furigana: "しようしょ",
          romaji: "shiyousho",
          vi: "Tài liệu đặc tả",
          en: "Specification"
        }
      ]
    };
  }, []);

  return (
    <section className="space-y-6 animate-fade-in pb-8">
      <CustomQuestionCard
        jp={questionJp}
        vi={hintVi}
        showFurigana={showFurigana}
      />

      {/* AI Score Overview section */}
      <HistoryDetailOverview report={report} t={tHistoryDetail} />

      {/* Detailed tabs section */}
      <div className="rounded-2xl border border-bdc-primary bg-bgc-app p-5 md:p-6 shadow-sm">
        <HistoryDetailTabs
          report={report}
          showFurigana={showFurigana}
          t={tHistoryDetail}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        <Button
          onClick={practiceAgain}
          variant="outlined"
          startIcon={<RotateCcw className="h-4 w-4" />}
          sx={{
            textTransform: "none",
            borderColor: "var(--color-bdc-muted)",
            color: "var(--color-text-contrast)",
            fontWeight: "semibold",
            "&:hover": {
              borderColor: "var(--color-bdc-primary)",
              backgroundColor: "var(--color-hbgc-app)",
            },
          }}
        >
          {t("practiceAgain")}
        </Button>
        <Button
          onClick={saveToHistory}
          variant="contained"
          startIcon={<Save className="h-4 w-4" />}
          sx={{
            textTransform: "none",
            backgroundColor: "var(--color-bgc-highlight)",
            color: "var(--color-text-pure)",
            fontWeight: "bold",
            "&:hover": { opacity: 0.9 },
          }}
        >
          {t("saveToHistory")}
        </Button>
      </div>
    </section>
  );
}

export default SandboxStep4;
