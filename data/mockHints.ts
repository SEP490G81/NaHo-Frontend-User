export interface VocabHint {
  jp: string;
  furigana: string;
  vi: string;
}
export interface StructureHint {
  jp: string;
  vi: string;
}
export interface QuestionHints {
  vocab: VocabHint[];
  structures: StructureHint[];
}

const DEFAULT_HINTS: QuestionHints = {
  vocab: [
    { jp: "すみません", furigana: "すみません", vi: "Xin lỗi / Cảm phiền" },
    { jp: "お願いします", furigana: "おねがいします", vi: "Xin nhờ / Làm ơn" },
    { jp: "ありがとうございます", furigana: "ありがとうございます", vi: "Cảm ơn" },
  ],
  structures: [
    { jp: "〜ていただけますか？", vi: "Lịch sự nhờ ai đó làm gì." },
    { jp: "〜たいと思います。", vi: "Tôi muốn / dự định làm gì." },
  ],
};

const HINT_MAP: Record<string, QuestionHints> = {
  // Văn phòng IT
  "t-office-it/q1": {
    vocab: [
      { jp: "おはようございます", furigana: "おはようございます", vi: "Chào buổi sáng (lịch sự)" },
      { jp: "今日も", furigana: "きょうも", vi: "Hôm nay cũng…" },
      { jp: "よろしくお願いいたします", furigana: "よろしくおねがいいたします", vi: "Mong được giúp đỡ" },
    ],
    structures: [
      { jp: "〜もよろしくお願いいたします。", vi: "Mẫu chào lịch sự đầu ngày." },
      { jp: "本日は〜です。", vi: "Hôm nay là …" },
    ],
  },
  "t-office-it/q2": {
    vocab: [
      { jp: "進捗", furigana: "しんちょく", vi: "Tiến độ" },
      { jp: "完了", furigana: "かんりょう", vi: "Hoàn thành" },
      { jp: "リリース", furigana: "リリース", vi: "Release" },
    ],
    structures: [
      { jp: "現在、〜は〇〇%完了しております。", vi: "Báo cáo tiến độ phần trăm." },
      { jp: "明日中に〜可能です。", vi: "Có thể … trong ngày mai." },
    ],
  },
  "t-office-it/q3": {
    vocab: [
      { jp: "休み", furigana: "やすみ", vi: "Nghỉ phép" },
      { jp: "体調不良", furigana: "たいちょうふりょう", vi: "Sức khoẻ không tốt" },
      { jp: "申し訳ございません", furigana: "もうしわけございません", vi: "Xin lỗi (rất kính ngữ)" },
    ],
    structures: [
      { jp: "申し訳ございませんが、〜たいです。", vi: "Xin lỗi và đề nghị điều gì đó." },
      { jp: "〜のため、お休みをいただきたいです。", vi: "Vì lý do… xin được nghỉ." },
    ],
  },
  "t-office-it/q4": {
    vocab: [
      { jp: "緊急", furigana: "きんきゅう", vi: "Khẩn cấp" },
      { jp: "本番環境", furigana: "ほんばんかんきょう", vi: "Môi trường production" },
      { jp: "対応", furigana: "たいおう", vi: "Xử lý / ứng phó" },
    ],
    structures: [
      { jp: "〜で緊急のバグが発生しました。", vi: "Báo có bug khẩn cấp ở …" },
      { jp: "今すぐ対応いたします。", vi: "Em sẽ xử lý ngay." },
    ],
  },
  "t-office-it/q5": {
    vocab: [
      { jp: "手伝う", furigana: "てつだう", vi: "Giúp đỡ" },
      { jp: "本当に", furigana: "ほんとうに", vi: "Thật sự" },
      { jp: "助かりました", furigana: "たすかりました", vi: "Đã được giúp đỡ" },
    ],
    structures: [
      { jp: "先ほどは〜くださって、ありがとうございました。", vi: "Cảm ơn vì việc vừa rồi." },
      { jp: "おかげさまで〜できました。", vi: "Nhờ có anh/chị mà em đã…" },
    ],
  },

  // Daily standup
  "t-daily-standup/q1": {
    vocab: [
      { jp: "昨日", furigana: "きのう", vi: "Hôm qua" },
      { jp: "テスト", furigana: "テスト", vi: "Kiểm thử" },
      { jp: "バグ修正", furigana: "バグしゅうせい", vi: "Sửa bug" },
    ],
    structures: [
      { jp: "昨日は〜を行いました。", vi: "Hôm qua tôi đã làm…" },
      { jp: "〜と〜をしました。", vi: "Liệt kê 2 việc đã làm." },
    ],
  },
  "t-daily-standup/q2": {
    vocab: [
      { jp: "予定", furigana: "よてい", vi: "Kế hoạch" },
      { jp: "リファクタリング", furigana: "リファクタリング", vi: "Refactor" },
      { jp: "レビュー", furigana: "レビュー", vi: "Review code" },
    ],
    structures: [
      { jp: "今日は〜を予定しています。", vi: "Hôm nay tôi dự định …" },
      { jp: "午後は〜に取り組みます。", vi: "Buổi chiều sẽ làm …" },
    ],
  },
  "t-daily-standup/q3": {
    vocab: [
      { jp: "問題", furigana: "もんだい", vi: "Vấn đề" },
      { jp: "相談", furigana: "そうだん", vi: "Trao đổi / xin ý kiến" },
      { jp: "設計", furigana: "せっけい", vi: "Thiết kế" },
    ],
    structures: [
      { jp: "今のところ〜はありません。", vi: "Hiện chưa có …" },
      { jp: "〜について相談したいです。", vi: "Em muốn trao đổi về …" },
    ],
  },
  "t-daily-standup/q4": {
    vocab: [
      { jp: "サポート", furigana: "サポート", vi: "Hỗ trợ" },
      { jp: "必要", furigana: "ひつよう", vi: "Cần thiết" },
      { jp: "お願いしたい", furigana: "おねがいしたい", vi: "Muốn nhờ" },
    ],
    structures: [
      { jp: "〜さんのサポートをお願いしたいです。", vi: "Muốn nhờ ai đó hỗ trợ." },
      { jp: "〜周りで助けが必要です。", vi: "Cần giúp ở mảng …" },
    ],
  },

  // Email
  "t-office-email/q1": {
    vocab: [
      { jp: "受け取る", furigana: "うけとる", vi: "Nhận được" },
      { jp: "確かに", furigana: "たしかに", vi: "Chắc chắn" },
      { jp: "ご連絡", furigana: "ごれんらく", vi: "Liên hệ (kính ngữ)" },
    ],
    structures: [
      { jp: "ご連絡ありがとうございます。", vi: "Cảm ơn vì đã liên hệ." },
      { jp: "メールを確かに受け取りました。", vi: "Đã nhận được email." },
    ],
  },
  "t-office-email/q2": {
    vocab: [
      { jp: "会議", furigana: "かいぎ", vi: "Cuộc họp" },
      { jp: "変更", furigana: "へんこう", vi: "Thay đổi" },
      { jp: "恐れ入りますが", furigana: "おそれいりますが", vi: "Xin phép làm phiền" },
    ],
    structures: [
      { jp: "恐れ入りますが、〜していただけますか。", vi: "Lịch sự nhờ đổi/thay đổi gì đó." },
      { jp: "〜時に変更していただけますでしょうか。", vi: "Đề nghị đổi sang giờ …" },
    ],
  },
  "t-office-email/q3": {
    vocab: [
      { jp: "今後とも", furigana: "こんごとも", vi: "Từ nay về sau" },
      { jp: "よろしく", furigana: "よろしく", vi: "Mong được tốt đẹp" },
      { jp: "お願いいたします", furigana: "おねがいいたします", vi: "Xin nhờ (kính ngữ)" },
    ],
    structures: [
      { jp: "今後ともよろしくお願いいたします。", vi: "Mẫu kết email tiêu chuẩn." },
      { jp: "引き続きよろしくお願いいたします。", vi: "Mong tiếp tục hợp tác." },
    ],
  },

  // Travel
  "t-travel-japan/q1": {
    vocab: [
      { jp: "新宿駅", furigana: "しんじゅくえき", vi: "Ga Shinjuku" },
      { jp: "道", furigana: "みち", vi: "Đường" },
      { jp: "教える", furigana: "おしえる", vi: "Chỉ / dạy" },
    ],
    structures: [
      { jp: "すみません、〜までの道を教えていただけますか？", vi: "Hỏi đường lịch sự." },
      { jp: "〜はどこですか？", vi: "… ở đâu vậy?" },
    ],
  },
  "t-travel-japan/q2": {
    vocab: [
      { jp: "予約", furigana: "よやく", vi: "Đặt chỗ" },
      { jp: "シングルルーム", furigana: "シングルルーム", vi: "Phòng đơn" },
      { jp: "2泊", furigana: "にはく", vi: "2 đêm" },
    ],
    structures: [
      { jp: "〜で〇泊の予約をお願いしたいのですが。", vi: "Đặt phòng X đêm." },
      { jp: "〜から〜まで泊まりたいです。", vi: "Muốn ở từ ngày … đến …" },
    ],
  },
  "t-travel-japan/q3": {
    vocab: [
      { jp: "ラーメン", furigana: "ラーメン", vi: "Mì ramen" },
      { jp: "いくら", furigana: "いくら", vi: "Bao nhiêu tiền" },
      { jp: "おいくら", furigana: "おいくら", vi: "Bao nhiêu (lịch sự)" },
    ],
    structures: [
      { jp: "この〜はおいくらですか？", vi: "Cái này giá bao nhiêu?" },
      { jp: "一番安いのはどれですか？", vi: "Cái nào rẻ nhất?" },
    ],
  },
  "t-travel-japan/q4": {
    vocab: [
      { jp: "終電", furigana: "しゅうでん", vi: "Tàu cuối" },
      { jp: "何時", furigana: "なんじ", vi: "Mấy giờ" },
      { jp: "行き", furigana: "ゆき", vi: "Đi tới…" },
    ],
    structures: [
      { jp: "〜行きの終電は何時ですか？", vi: "Tàu cuối đi … là mấy giờ?" },
      { jp: "次の電車は何時ですか？", vi: "Chuyến tàu kế tiếp mấy giờ?" },
    ],
  },

  // Daily life
  "t-daily-life/q1": {
    vocab: [
      { jp: "はじめまして", furigana: "はじめまして", vi: "Lần đầu gặp" },
      { jp: "申します", furigana: "もうします", vi: "Tôi tên là (lịch sự)" },
      { jp: "よろしく", furigana: "よろしく", vi: "Mong được làm quen" },
    ],
    structures: [
      { jp: "はじめまして、〜と申します。", vi: "Lần đầu gặp, tôi là …" },
      { jp: "どうぞよろしくお願いします。", vi: "Rất mong được giúp đỡ." },
    ],
  },
  "t-daily-life/q2": {
    vocab: [
      { jp: "週末", furigana: "しゅうまつ", vi: "Cuối tuần" },
      { jp: "カフェ", furigana: "カフェ", vi: "Quán cà phê" },
      { jp: "出かける", furigana: "でかける", vi: "Đi ra ngoài" },
    ],
    structures: [
      { jp: "〜たり、〜たりします。", vi: "Liệt kê các việc thường làm." },
      { jp: "よく〜に行きます。", vi: "Thường hay đi …" },
    ],
  },
  "t-daily-life/q3": {
    vocab: [
      { jp: "今晩", furigana: "こんばん", vi: "Tối nay" },
      { jp: "一緒に", furigana: "いっしょに", vi: "Cùng nhau" },
      { jp: "夕食", furigana: "ゆうしょく", vi: "Bữa tối" },
    ],
    structures: [
      { jp: "もしよかったら、〜ませんか？", vi: "Nếu được thì cùng … nhé?" },
      { jp: "一緒に〜しましょう。", vi: "Cùng nhau … nào." },
    ],
  },
  "t-daily-life/q4": {
    vocab: [
      { jp: "お久しぶり", furigana: "おひさしぶり", vi: "Lâu rồi không gặp" },
      { jp: "元気", furigana: "げんき", vi: "Khoẻ" },
      { jp: "過ごす", furigana: "すごす", vi: "Trải qua" },
    ],
    structures: [
      { jp: "お久しぶりです。お元気ですか？", vi: "Lâu rồi không gặp, anh/chị khoẻ chứ?" },
      { jp: "最近どうですか？", vi: "Dạo này thế nào?" },
    ],
  },
  "t-daily-life/q5": {
    vocab: [
      { jp: "プレゼント", furigana: "プレゼント", vi: "Quà tặng" },
      { jp: "素敵", furigana: "すてき", vi: "Tuyệt vời" },
      { jp: "本当に", furigana: "ほんとうに", vi: "Thật sự" },
    ],
    structures: [
      { jp: "素敵な〜を本当にありがとうございます。", vi: "Cảm ơn vì món … tuyệt vời." },
      { jp: "とても気に入りました。", vi: "Tôi rất thích nó." },
    ],
  },

  // BrSE Interview
  "t-brse-interview/q1": {
    vocab: [
      { jp: "自己紹介", furigana: "じこしょうかい", vi: "Giới thiệu bản thân" },
      { jp: "専攻", furigana: "せんこう", vi: "Chuyên ngành" },
      { jp: "大学", furigana: "だいがく", vi: "Đại học" },
    ],
    structures: [
      { jp: "はじめまして、〜と申します。", vi: "Mở đầu phỏng vấn." },
      { jp: "〜大学の〜専攻〇年生です。", vi: "Giới thiệu trường và năm học." },
    ],
  },
  "t-brse-interview/q2": {
    vocab: [
      { jp: "技術", furigana: "ぎじゅつ", vi: "Kỹ thuật" },
      { jp: "活かす", furigana: "いかす", vi: "Vận dụng" },
      { jp: "橋", furigana: "はし", vi: "Cầu nối" },
    ],
    structures: [
      { jp: "〜を活かして、〜になりたいです。", vi: "Vận dụng … để trở thành …" },
      { jp: "〜をつなぐ橋になりたいです。", vi: "Muốn làm cầu nối giữa …" },
    ],
  },
  "t-brse-interview/q3": {
    vocab: [
      { jp: "印象", furigana: "いんしょう", vi: "Ấn tượng" },
      { jp: "プロジェクト", furigana: "プロジェクト", vi: "Dự án" },
      { jp: "要件定義", furigana: "ようけんていぎ", vi: "Định nghĩa yêu cầu" },
    ],
    structures: [
      { jp: "〜のプロジェクトで、BrSEとして〜から関わりました。", vi: "Tham gia dự án … với vai trò …" },
      { jp: "最も印象に残ったのは〜です。", vi: "Ấn tượng nhất là …" },
    ],
  },
  "t-brse-interview/q4": {
    vocab: [
      { jp: "強み", furigana: "つよみ", vi: "Điểm mạnh" },
      { jp: "責任感", furigana: "せきにんかん", vi: "Tinh thần trách nhiệm" },
      { jp: "コミュニケーション", furigana: "コミュニケーション", vi: "Giao tiếp" },
    ],
    structures: [
      { jp: "私の強みは〜と〜です。", vi: "Điểm mạnh của tôi là … và …" },
      { jp: "〜を活かして貢献できます。", vi: "Có thể đóng góp bằng …" },
    ],
  },
  "t-brse-interview/q5": {
    vocab: [
      { jp: "御社", furigana: "おんしゃ", vi: "Quý công ty" },
      { jp: "新人研修", furigana: "しんじんけんしゅう", vi: "Đào tạo nhân viên mới" },
      { jp: "詳しく", furigana: "くわしく", vi: "Chi tiết" },
    ],
    structures: [
      { jp: "〜について、もう少し詳しく教えていただけますか？", vi: "Xin được nghe chi tiết hơn về …" },
      { jp: "御社の〜はどのような〜ですか？", vi: "Công ty có chế độ … thế nào?" },
    ],
  },
  "t-brse-interview/q6": {
    vocab: [
      { jp: "希望", furigana: "きぼう", vi: "Mong muốn" },
      { jp: "給料", furigana: "きゅうりょう", vi: "Lương" },
      { jp: "規定", furigana: "きてい", vi: "Quy định" },
    ],
    structures: [
      { jp: "御社の規定に従いたいと考えております。", vi: "Theo quy định của công ty." },
      { jp: "目安としては〇〇を希望しております。", vi: "Mức tham khảo là …" },
    ],
  },
};

export function getQuestionHints(topicId: string, questionId: string): QuestionHints {
  return HINT_MAP[`${topicId}/${questionId}`] ?? DEFAULT_HINTS;
}
