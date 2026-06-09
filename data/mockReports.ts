import type { QuestionHistoryEntry } from "@/data/mockHistory";
import type { Question, Topic, TopicCategory } from "@/data/mockTopics";

export interface TranscriptError {
  type: string;
  explanation: string;
  suggestion: string;
}

export interface TranscriptSegment {
  text: string;
  error?: TranscriptError;
}

export interface PronSegment {
  text: string;
  furigana?: string;
  severity: "ok" | "warn" | "bad";
  note?: string;
}

export interface ExpressionHint {
  jp: string;
  furigana: string;
  vi: string;
  note: string;
}

export interface VocabHint {
  term: string;
  reading: string;
  meaning: string;
}

export interface ReportDetail {
  scores: {
    pronunciation: number;
    vocabulary: number;
    grammar: number;
    naturalness: number;
  };
  average: number;
  userTranscript: TranscriptSegment[];
  aiSuggestion: { jp: string; furigana: string; vi: string };
  pronunciation: PronSegment[];
  pronunciationNote: string;
  expressions: ExpressionHint[];
  itVocab: VocabHint[];
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function clamp(n: number, lo = 0, hi = 10) {
  return Math.max(lo, Math.min(hi, n));
}

function deriveScores(historyId: string, avg: number) {
  const h = hash(historyId);
  // Four offsets centered around 0, sum ≈ 0
  const raw = [
    ((h & 0xff) / 255) * 1.6 - 0.8,
    (((h >> 8) & 0xff) / 255) * 1.6 - 0.8,
    (((h >> 16) & 0xff) / 255) * 1.6 - 0.8,
  ];
  const last = -(raw[0] + raw[1] + raw[2]);
  const offsets = [...raw, last];
  const [p, v, g, n] = offsets.map((o) =>
    Math.round(clamp(avg + o) * 10) / 10,
  );
  return { pronunciation: p, vocabulary: v, grammar: g, naturalness: n };
}

const EXPRESSIONS_BY_CATEGORY: Record<TopicCategory, ExpressionHint[]> = {
  "office-it": [
    {
      jp: "恐れ入りますが、もう一度ご確認いただけますでしょうか。",
      furigana:
        "おそれいりますが、もういちどごかくにんいただけますでしょうか。",
      vi: "Xin lỗi vì sự phiền hà, anh/chị có thể xác nhận lại giúp em một lần nữa được không ạ?",
      note: "Mẫu kính ngữ lịch sự khi nhờ cấp trên kiểm tra lại.",
    },
    {
      jp: "現状をご報告させていただきます。",
      furigana: "げんじょうをごほうこくさせていただきます。",
      vi: "Em xin phép báo cáo tình hình hiện tại.",
      note: "Mở đầu báo cáo chuyên nghiệp trong môi trường công ty Nhật.",
    },
    {
      jp: "念のため、ダブルチェックをお願いできますでしょうか。",
      furigana: "ねんのため、ダブルチェックをおねがいできますでしょうか。",
      vi: "Để chắc chắn, anh/chị có thể double-check giúp em được không ạ?",
      note: "Dùng khi cần đồng nghiệp review chéo task quan trọng.",
    },
  ],
  "travel-life": [
    {
      jp: "すみません、ちょっとお伺いしてもよろしいでしょうか。",
      furigana: "すみません、ちょっとおうかがいしてもよろしいでしょうか。",
      vi: "Xin lỗi, em có thể hỏi một chút được không ạ?",
      note: "Mẫu lịch sự để bắt chuyện với người lạ khi du lịch.",
    },
    {
      jp: "おすすめのお店はありますか？",
      furigana: "おすすめのおみせはありますか？",
      vi: "Có quán nào anh/chị muốn giới thiệu không ạ?",
      note: "Câu hỏi tự nhiên khi muốn xin gợi ý địa điểm.",
    },
    {
      jp: "とても助かりました。ありがとうございました。",
      furigana: "とてもたすかりました。ありがとうございました。",
      vi: "Anh/chị giúp em rất nhiều, em cảm ơn ạ.",
      note: "Cách cảm ơn ấm áp, tự nhiên hơn so với chỉ nói ありがとう.",
    },
  ],
  "brse-interview": [
    {
      jp: "御社の開発体制について教えていただけますか。",
      furigana: "おんしゃのかいはつたいせいについておしえていただけますか。",
      vi: "Anh/chị có thể chia sẻ về cơ cấu phát triển của quý công ty được không ạ?",
      note: "Câu hỏi phỏng vấn ngược thể hiện sự quan tâm chuyên môn.",
    },
    {
      jp: "前職ではブリッジSEとして要件定義を担当しておりました。",
      furigana:
        "ぜんしょくではブリッジSEとしてようけんていぎをたんとうしておりました。",
      vi: "Ở công ty cũ em phụ trách phần phân tích yêu cầu với vai trò BrSE.",
      note: "Cách giới thiệu kinh nghiệm BrSE bằng kính ngữ khiêm tốn.",
    },
    {
      jp: "今後はチームをリードできるエンジニアを目指しております。",
      furigana:
        "こんごはチームをリードできるエンジニアをめざしております。",
      vi: "Tương lai em hướng tới trở thành kỹ sư có thể lead team.",
      note: "Trả lời câu hỏi về định hướng phát triển nghề nghiệp.",
    },
  ],
};

const VOCAB_BY_CATEGORY: Record<TopicCategory, VocabHint[]> = {
  "office-it": [
    { term: "進捗", reading: "しんちょく", meaning: "Tiến độ công việc" },
    { term: "仕様書", reading: "しようしょ", meaning: "Tài liệu đặc tả" },
    { term: "不具合", reading: "ふぐあい", meaning: "Bug / sự cố hệ thống" },
    { term: "リリース", reading: "りりーす", meaning: "Phát hành (release)" },
    { term: "対応", reading: "たいおう", meaning: "Xử lý / phản hồi" },
  ],
  "travel-life": [
    { term: "予約", reading: "よやく", meaning: "Đặt chỗ / đặt phòng" },
    { term: "観光地", reading: "かんこうち", meaning: "Địa điểm tham quan" },
    { term: "両替", reading: "りょうがえ", meaning: "Đổi tiền" },
    { term: "切符", reading: "きっぷ", meaning: "Vé (tàu, xe)" },
    { term: "おすすめ", reading: "おすすめ", meaning: "Đề xuất / khuyên dùng" },
  ],
  "brse-interview": [
    { term: "要件定義", reading: "ようけんていぎ", meaning: "Phân tích yêu cầu" },
    { term: "設計書", reading: "せっけいしょ", meaning: "Tài liệu thiết kế" },
    { term: "顧客", reading: "こきゃく", meaning: "Khách hàng" },
    { term: "納期", reading: "のうき", meaning: "Hạn giao hàng / deadline" },
    { term: "改善", reading: "かいぜん", meaning: "Cải tiến (kaizen)" },
  ],
};

function buildUserTranscript(
  historyId: string,
  question: Question,
): { segs: TranscriptSegment[]; hasError: boolean } {
  const base =
    question.modelAnswer?.jp ??
    question.jp ??
    "すみません、もう一度お願いします。";
  const h = hash(historyId);
  // Roughly split into 3 segments by punctuation
  const parts = base.split(/(?<=[。、])/).filter(Boolean);
  if (parts.length < 2) {
    return {
      segs: [
        { text: base },
        {
          text: "です。",
          error: {
            type: "Ngữ pháp",
            explanation:
              "Đuôi câu chưa phù hợp với động từ phía trước — gây cảm giác thiếu tự nhiên.",
            suggestion: "Hãy dùng dạng ます hoặc bỏ です để câu chuẩn hơn.",
          },
        },
      ],
      hasError: true,
    };
  }
  // Pick one segment to mark as error based on hash
  const errIdx = h % parts.length;
  const segs: TranscriptSegment[] = parts.map((p, i) =>
    i === errIdx
      ? {
          text: p,
          error: {
            type: "Phát âm / Ngữ pháp",
            explanation:
              "Đoạn này có lỗi nhỏ về trật tự từ hoặc trợ từ, khiến câu nói nghe chưa tự nhiên.",
            suggestion:
              "Tham khảo câu mẫu của AI bên dưới để chỉnh lại trợ từ và ngữ điệu.",
          },
        }
      : { text: p },
  );
  return { segs, hasError: true };
}

function buildPronunciation(
  historyId: string,
  question: Question,
): { items: PronSegment[]; note: string } {
  const base = question.modelAnswer ?? {
    jp: question.jp,
    furigana: question.furigana,
  };
  const tokens = base.jp.split(/(?<=[。、 ])|(?=[。、 ])/).filter(Boolean);
  const h = hash(historyId + ":pron");
  const items: PronSegment[] = tokens.map((tok, i) => {
    const r = (h >> (i % 16)) & 0x7;
    let severity: PronSegment["severity"] = "ok";
    let note: string | undefined;
    if (r === 0) {
      severity = "bad";
      note = "Trọng âm cao thấp chưa đúng — cần luyện lại nhịp.";
    } else if (r === 1 || r === 2) {
      severity = "warn";
      note = "Phát âm gần đúng nhưng độ dài âm chưa chuẩn.";
    }
    return { text: tok, severity, note };
  });
  return {
    items,
    note: "Chú ý nhấn rõ trường âm (âm dài) và trọng âm ở các từ được tô màu để câu nói tự nhiên hơn.",
  };
}

export function getReportForHistory(
  entry: QuestionHistoryEntry,
  _topic: Topic,
  question: Question,
): ReportDetail {
  const scores = deriveScores(entry.historyId, entry.score);
  const average =
    Math.round(
      ((scores.pronunciation +
        scores.vocabulary +
        scores.grammar +
        scores.naturalness) /
        4) *
        10,
    ) / 10;

  const { segs } = buildUserTranscript(entry.historyId, question);
  const pron = buildPronunciation(entry.historyId, question);

  const model = question.modelAnswer ?? {
    jp: question.jp,
    furigana: question.furigana,
    vi: question.vi,
    durationSec: 6,
  };

  return {
    scores,
    average,
    userTranscript: segs,
    aiSuggestion: { jp: model.jp, furigana: model.furigana, vi: model.vi },
    pronunciation: pron.items,
    pronunciationNote: pron.note,
    expressions: EXPRESSIONS_BY_CATEGORY[_topic.category],
    itVocab: VOCAB_BY_CATEGORY[_topic.category],
  };
}
