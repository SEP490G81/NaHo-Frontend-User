export type CommunityCategory = "brse" | "it" | "office" | "daily";

export interface CommunityQuestion {
    id: string;
    jp: string;
    furigana: string;
    vi: string;
    category: CommunityCategory;
    contributorName: string;
    contributorLevel: string;
    practiceCount: number;
}

export const COMMUNITY_CATEGORIES: {
    value: CommunityCategory | "all";
    label: string;
}[] = [
    { value: "all", label: "Tất cả" },
    { value: "brse", label: "Phỏng vấn BrSE" },
    { value: "it", label: "Giao tiếp IT" },
    { value: "office", label: "Giao tiếp công sở" },
    { value: "daily", label: "Hỏi đáp đời sống" },
];

export const CATEGORY_LABEL: Record<CommunityCategory, string> = {
    brse: "Phỏng vấn BrSE",
    it: "Giao tiếp IT",
    office: "Giao tiếp công sở",
    daily: "Hỏi đáp đời sống",
};

export const mockCommunityQuestions: CommunityQuestion[] = [
    {
        id: "cm-1",
        jp: "自己紹介をお願いできますか？",
        furigana: "じこしょうかいをおねがいできますか？",
        vi: "Bạn có thể giới thiệu về bản thân được không?",
        category: "brse",
        contributorName: "Nguyễn Hoàng Nam",
        contributorLevel: "N2",
        practiceCount: 128,
    },
    {
        id: "cm-2",
        jp: "なぜブリッジSEになりたいですか？",
        furigana: "なぜブリッジエスイーになりたいですか？",
        vi: "Vì sao bạn muốn trở thành Kỹ sư cầu nối?",
        category: "brse",
        contributorName: "Trần Minh Khôi",
        contributorLevel: "N3",
        practiceCount: 95,
    },
    {
        id: "cm-3",
        jp: "今までで一番難しかったプロジェクトを教えてください。",
        furigana:
            "いままででいちばんむずかしかったプロジェクトをおしえてください。",
        vi: "Hãy kể về dự án khó nhất mà bạn từng tham gia.",
        category: "brse",
        contributorName: "Lê Thị Hà",
        contributorLevel: "N2",
        practiceCount: 76,
    },
    {
        id: "cm-4",
        jp: "このバグの原因について説明してください。",
        furigana: "このバグのげんいんについてせつめいしてください。",
        vi: "Hãy giải thích nguyên nhân của bug này.",
        category: "it",
        contributorName: "Phạm Quốc Đạt",
        contributorLevel: "N3",
        practiceCount: 64,
    },
    {
        id: "cm-5",
        jp: "リリーススケジュールに遅れが出そうです。どう対応しますか？",
        furigana:
            "リリーススケジュールにおくれがでそうです。どうたいおうしますか？",
        vi: "Lịch release có nguy cơ trễ. Bạn sẽ xử lý thế nào?",
        category: "it",
        contributorName: "Đỗ Anh Tuấn",
        contributorLevel: "N2",
        practiceCount: 52,
    },
    {
        id: "cm-6",
        jp: "コードレビューでの指摘の伝え方を教えてください。",
        furigana: "コードレビューでのしてきのつたえかたをおしえてください。",
        vi: "Bạn truyền đạt nhận xét trong code review như thế nào?",
        category: "it",
        contributorName: "Vũ Thị Mai",
        contributorLevel: "N3",
        practiceCount: 41,
    },
    {
        id: "cm-7",
        jp: "お客様への進捗報告メールを口頭で説明してください。",
        furigana:
            "おきゃくさまへのしんちょくほうこくメールをこうとうでせつめいしてください。",
        vi: "Hãy trình bày bằng lời nội dung mail báo cáo tiến độ cho khách hàng.",
        category: "office",
        contributorName: "Hoàng Văn Sơn",
        contributorLevel: "N2",
        practiceCount: 88,
    },
    {
        id: "cm-8",
        jp: "上司に休暇を申請するときの言い方を教えてください。",
        furigana:
            "じょうしにきゅうかをしんせいするときのいいかたをおしえてください。",
        vi: "Cách xin nghỉ phép với cấp trên như thế nào?",
        category: "office",
        contributorName: "Bùi Thu Hằng",
        contributorLevel: "N3",
        practiceCount: 73,
    },
    {
        id: "cm-9",
        jp: "会議に遅れる時、processing どのように連絡しますか？",
        furigana: "かいぎにおくれるとき、どのようにれんらくしますか？",
        vi: "Khi đến muộn cuộc họp, bạn sẽ liên lạc như thế nào?",
        category: "office",
        contributorName: "Ngô Minh Quân",
        contributorLevel: "N3",
        practiceCount: 60,
    },
    {
        id: "cm-10",
        jp: "週末はよく何をしますか？",
        furigana: "しゅうまつはよくなにをしますか？",
        vi: "Cuối tuần bạn thường làm gì?",
        category: "daily",
        contributorName: "Nguyễn Phương Linh",
        contributorLevel: "N4",
        practiceCount: 144,
    },
    {
        id: "cm-11",
        jp: "おすすめの日本料理を教えてください。",
        furigana: "おすすめのにほんりょうりをおしえてください。",
        vi: "Bạn giới thiệu giúp món ăn Nhật mà bạn thích nhé.",
        category: "daily",
        contributorName: "Trịnh Hải Đăng",
        contributorLevel: "N4",
        practiceCount: 112,
    },
    {
        id: "cm-12",
        jp: "最近見た映画について話してください。",
        furigana: "さいきんみたえいがについてはなしてください。",
        vi: "Hãy nói về bộ phim bạn xem gần đây.",
        category: "daily",
        contributorName: "Phan Thị Ngọc",
        contributorLevel: "N3",
        practiceCount: 87,
    },
];
