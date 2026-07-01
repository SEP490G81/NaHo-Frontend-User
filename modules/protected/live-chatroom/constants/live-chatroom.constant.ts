import type { Companion, ChatMessage, AiChatMessage } from "../types/live-chatroom.type";

export const COMPANIONS: Companion[] = [
  {
    id: "sakura",
    name: "Sakura",
    role: "Giảng viên tiếng Nhật",
    description: "Nhẹ nhàng, thân thiện, tập trung giao tiếp hàng ngày và sửa ngữ pháp.",
    level: "Tất cả",
    accent: "bg-bgc-highlight/15 text-bgc-highlight",
  },
  {
    id: "kenji",
    name: "Kenji",
    role: "Kỹ sư phần mềm Senior",
    description: "Chuyên nghiệp, hội thoại kỹ thuật, mô phỏng họp văn phòng Nhật.",
    level: "N3 – N1",
    accent: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
  },
  {
    id: "yuki",
    name: "Yuki",
    role: "Người phỏng vấn tuyển dụng",
    description: "Nghiêm khắc, phỏng vấn chuẩn, hỏi các câu hành vi khó.",
    level: "N2 – N1",
    accent: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  },
  {
    id: "tanaka",
    name: "Tanaka",
    role: "Khách hàng Nhật Bản",
    description: "Keigo trang trọng, mô phỏng đàm phán và thảo luận kinh doanh.",
    level: "N1",
    accent: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
  },
];

export function getCompanion(id: string): Companion {
  return COMPANIONS.find((c) => c.id === id) ?? COMPANIONS[0];
}

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    role: "ai",
    jp: "こんにちは！今日はどんな話をしましょうか？",
    furigana: "こんにちは！きょうはどんなはなしをしましょうか？",
    vi: "Xin chào! Hôm nay chúng ta nói về chủ đề gì nhỉ?",
    grammar: "「〜ましょうか」là cách rủ rê lịch sự, dùng khi đề xuất cùng làm gì đó với người nghe.",
    timestamp: "09:00",
  },
  {
    id: "m2",
    role: "user",
    text: "今日は仕事の話したい。",
    correction: {
      fixedJp: "今日は仕事の話をしたいです。",
      errorVi: "Thiếu trợ từ「を」sau danh từ và thiếu thể lịch sự「です」.",
    },
    timestamp: "09:01",
  },
  {
    id: "m3",
    role: "ai",
    jp: "いいですね！どんなお仕事をされていますか？",
    furigana: "いいですね！どんなおしごとをされていますか？",
    vi: "Hay quá! Bạn đang làm công việc gì vậy?",
    grammar: "「されています」là thể tôn kính (Sonkeigo) của「しています」, dùng khi hỏi về việc của người khác.",
    timestamp: "09:01",
  },
];

export const AI_FOLLOWUPS: AiChatMessage[] = [
  {
    id: "f1",
    role: "ai",
    jp: "なるほど、面白そうですね。もう少し詳しく教えてください。",
    furigana: "なるほど、おもしろそうですね。もうすこしくわしくおしえてください。",
    vi: "Ra vậy, nghe thú vị nhỉ. Bạn có thể kể chi tiết hơn không?",
    grammar: "「〜てください」là cách nhờ lịch sự. Thêm「もう少し」để đề nghị mềm mại hơn.",
    timestamp: "—",
  },
  {
    id: "f2",
    role: "ai",
    jp: "そのプロジェクトはいつから始まりましたか？",
    furigana: "そのプロジェクトはいつからはじまりましたか？",
    vi: "Dự án đó bắt đầu từ khi nào vậy?",
    grammar: "「いつから」+ động từ quá khứ để hỏi mốc thời gian bắt đầu.",
    timestamp: "—",
  },
  {
    id: "f3",
    role: "ai",
    jp: "チームには何人いますか？",
    furigana: "チームにはなんにんいますか？",
    vi: "Trong team có bao nhiêu người?",
    grammar: "「何人」là lượng từ hỏi số lượng người, đi với「います」(có/tồn tại).",
    timestamp: "—",
  },
];

export const DEFAULT_SUGGESTIONS = [
  "はい、わかりました",
  "プロジェクトの進捗について話したいです",
  "自己紹介をさせていただきます",
];

export const MOCK_STT_INPUT = "プロジェクトの進捗はどうですか。";
