export type TopicCategory = "office-it" | "travel-life" | "brse-interview";

export const CATEGORY_LABEL: Record<TopicCategory, string> = {
  "office-it": "Văn phòng IT",
  "travel-life": "Du lịch & Đời sống",
  "brse-interview": "Phỏng vấn BrSE",
};

export interface ModelAnswer {
  jp: string;
  furigana: string;
  vi: string;
  durationSec: number;
}

export interface Question {
  id: string;
  vi: string;
  jp: string;
  /** Furigana reading shown above the JP text (whole-string ruby) */
  furigana: string;
  modelAnswer?: ModelAnswer;
}

export interface Topic {
  id: string;
  title: string;
  jpTitle: string;
  jpFurigana: string;
  category: TopicCategory;
  audience: string;
  description: string;
  objectives: string[];
  /** Short bullet list shown in the topic metadata card */
  goals: string[];
  /** Mock average score across all learners, 0–10 */
  averageScore: number;
  questions: Question[];
}

export const mockTopics: Topic[] = [
  {
    id: "t-office-it",
    title: "Giao tiếp văn phòng IT",
    jpTitle: "IT会社の日常会話",
    jpFurigana: "ITかいしゃのにちじょうかいわ",
    category: "office-it",
    audience: "Kỹ sư BrSE, lập trình viên làm việc với khách hàng Nhật.",
    description:
      "Luyện các mẫu hội thoại thường gặp tại công ty IT Nhật: chào hỏi đầu ngày, trao đổi tiến độ, xin nghỉ phép, báo cáo sự cố.",
    objectives: [
      "Sử dụng kính ngữ (Keigo) phù hợp khi nói chuyện với cấp trên.",
      "Báo cáo tiến độ công việc rõ ràng, ngắn gọn.",
      "Diễn đạt khi gặp khó khăn hoặc cần hỗ trợ.",
    ],
    goals: [
      "Tự tin chào hỏi và trao đổi công việc bằng kính ngữ.",
      "Báo cáo tiến độ và sự cố ngắn gọn, rõ ràng.",
      "Xử lý hội thoại văn phòng IT thường ngày.",
    ],
    averageScore: 8.2,
    questions: [
      {
        id: "q1",
        vi: "Hãy chào buổi sáng với sếp.",
        jp: "おはようございます。",
        furigana: "おはようございます。",
        modelAnswer: {
          jp: "おはようございます。今日もよろしくお願いいたします。",
          furigana: "おはようございます。きょうもよろしくおねがいいたします。",
          vi: "Chào buổi sáng. Hôm nay cũng mong được anh/chị giúp đỡ ạ.",
          durationSec: 6,
        },
      },
      {
        id: "q2",
        vi: "Báo cáo tiến độ task hôm nay.",
        jp: "今日のタスクの進捗を報告してください。",
        furigana: "きょうのタスクのしんちょくをほうこくしてください。",
        modelAnswer: {
          jp: "現在、API連携のタスクは80%完了しており、明日中にリリース可能です。",
          furigana: "げんざい、APIれんけいのタスクは80%かんりょうしており、あしたじゅうにリリースかのうです。",
          vi: "Hiện tại task tích hợp API đã hoàn thành 80%, có thể release trong ngày mai.",
          durationSec: 10,
        },
      },
      {
        id: "q3",
        vi: "Xin nghỉ phép vào ngày mai.",
        jp: "明日休みを取らせていただきたいです。",
        furigana: "あしたやすみをとらせていただきたいです。",
        modelAnswer: {
          jp: "申し訳ございませんが、明日体調不良のため、お休みをいただきたいです。",
          furigana: "もうしわけございませんが、あしたたいちょうふりょうのため、おやすみをいただきたいです。",
          vi: "Xin lỗi vì sự bất tiện, ngày mai do sức khỏe không tốt em xin phép nghỉ ạ.",
          durationSec: 9,
        },
      },
      {
        id: "q4",
        vi: "Báo sếp về một bug khẩn cấp.",
        jp: "緊急のバグが発生しました。",
        furigana: "きんきゅうのバグがはっせいしました。",
        modelAnswer: {
          jp: "本番環境で緊急のバグが発生しました。今すぐ対応いたします。",
          furigana: "ほんばんかんきょうできんきゅうのバグがはっせいしました。いますぐたいおういたします。",
          vi: "Có một bug nghiêm trọng vừa phát sinh trên môi trường production. Em sẽ xử lý ngay.",
          durationSec: 9,
        },
      },
      {
        id: "q5",
        vi: "Cảm ơn đồng nghiệp đã giúp đỡ.",
        jp: "手伝ってくださってありがとうございます。",
        furigana: "てつだってくださってありがとうございます。",
        modelAnswer: {
          jp: "先ほどは手伝ってくださって、本当にありがとうございました。",
          furigana: "さきほどはてつだってくださって、ほんとうにありがとうございました。",
          vi: "Vừa rồi anh/chị đã giúp em, em thật sự rất cảm ơn ạ.",
          durationSec: 7,
        },
      },
    ],
  },
  {
    id: "t-daily-standup",
    title: "Họp Daily Standup",
    jpTitle: "朝会ミーティング",
    jpFurigana: "あさかいミーティング",
    category: "office-it",
    audience: "Thành viên team Agile/Scrum làm việc với PM Nhật.",
    description:
      "Mô phỏng buổi họp standup buổi sáng: nói về việc hôm qua đã làm, hôm nay sẽ làm, và các vấn đề đang gặp.",
    objectives: [
      "Trình bày công việc theo cấu trúc 3 phần (đã làm / sẽ làm / blocker).",
      "Sử dụng từ vựng IT thông dụng trong môi trường Nhật.",
      "Phản hồi nhanh khi PM đặt câu hỏi.",
    ],
    goals: [
      "Trình bày tiến độ theo cấu trúc rõ ràng.",
      "Phản hồi nhanh trước câu hỏi của PM.",
      "Quen với từ vựng IT trong họp Scrum.",
    ],
    averageScore: 7.8,
    questions: [
      {
        id: "q1",
        vi: "Hôm qua bạn đã làm gì?",
        jp: "昨日は何をしましたか？",
        furigana: "きのうはなにをしましたか？",
        modelAnswer: {
          jp: "昨日はログイン機能のテストとバグ修正を行いました。",
          furigana: "きのうはログインきのうのテストとバグしゅうせいをおこないました。",
          vi: "Hôm qua em đã test chức năng đăng nhập và fix bug.",
          durationSec: 8,
        },
      },
      {
        id: "q2",
        vi: "Hôm nay kế hoạch của bạn là gì?",
        jp: "今日の予定は何ですか？",
        furigana: "きょうのよていはなんですか？",
        modelAnswer: {
          jp: "今日はAPIのリファクタリングとレビューを予定しています。",
          furigana: "きょうはAPIのリファクタリングとレビューをよていしています。",
          vi: "Hôm nay em dự định refactor API và review code.",
          durationSec: 8,
        },
      },
      {
        id: "q3",
        vi: "Bạn có gặp vấn đề gì không?",
        jp: "何か問題はありますか？",
        furigana: "なにかもんだいはありますか？",
        modelAnswer: {
          jp: "今のところ問題はありませんが、設計について相談したいです。",
          furigana: "いまのところもんだいはありませんが、せっけいについてそうだんしたいです。",
          vi: "Hiện tại chưa có vấn đề, nhưng em muốn trao đổi thêm về thiết kế.",
          durationSec: 9,
        },
      },
      {
        id: "q4",
        vi: "Bạn cần ai hỗ trợ không?",
        jp: "誰かのサポートが必要ですか？",
        furigana: "だれかのサポートがひつようですか？",
        modelAnswer: {
          jp: "データベース周りで田中さんのサポートをお願いしたいです。",
          furigana: "データベースまわりでたなかさんのサポートをおねがいしたいです。",
          vi: "Em muốn nhờ anh Tanaka hỗ trợ phần database.",
          durationSec: 8,
        },
      },
    ],
  },
  {
    id: "t-office-email",
    title: "Email công sở",
    jpTitle: "ビジネスメール",
    jpFurigana: "ビジネスメール",
    category: "office-it",
    audience: "Người mới đi làm tại công ty Nhật.",
    description:
      "Luyện đọc và diễn đạt các mẫu câu thường dùng khi viết và phản hồi email công sở.",
    objectives: [
      "Mở đầu và kết thúc email đúng phép lịch sự.",
      "Trình bày nội dung gọn gàng, rõ ý.",
      "Trả lời các email yêu cầu, xác nhận lịch họp.",
    ],
    goals: [
      "Sử dụng mẫu mở/đóng email lịch sự.",
      "Xác nhận và đề xuất lịch họp tự nhiên.",
      "Đáp email yêu cầu một cách rõ ràng.",
    ],
    averageScore: 7.5,
    questions: [
      {
        id: "q1",
        vi: "Xác nhận đã nhận email.",
        jp: "メールを受け取りました。",
        furigana: "メールをうけとりました。",
        modelAnswer: {
          jp: "ご連絡ありがとうございます。メールを確かに受け取りました。",
          furigana: "ごれんらくありがとうございます。メールをたしかにうけとりました。",
          vi: "Cảm ơn anh/chị đã liên hệ. Em đã nhận được email ạ.",
          durationSec: 8,
        },
      },
      {
        id: "q2",
        vi: "Đề nghị dời lịch họp.",
        jp: "会議の時間を変更していただけますか？",
        furigana: "かいぎのじかんをへんこうしていただけますか？",
        modelAnswer: {
          jp: "恐れ入りますが、会議の時間を午後3時に変更していただけますでしょうか。",
          furigana: "おそれいりますが、かいぎのじかんをごご3じにへんこうしていただけますでしょうか。",
          vi: "Em xin phép làm phiền, anh/chị có thể dời lịch họp sang 3 giờ chiều được không ạ?",
          durationSec: 10,
        },
      },
      {
        id: "q3",
        vi: "Gửi lời cảm ơn cuối email.",
        jp: "よろしくお願いいたします。",
        furigana: "よろしくおねがいいたします。",
        modelAnswer: {
          jp: "今後ともどうぞよろしくお願いいたします。",
          furigana: "こんごともどうぞよろしくおねがいいたします。",
          vi: "Mong tiếp tục được hợp tác với anh/chị ạ.",
          durationSec: 6,
        },
      },
    ],
  },
  {
    id: "t-travel-japan",
    title: "Đi du lịch Nhật Bản",
    jpTitle: "日本旅行",
    jpFurigana: "にほんりょこう",
    category: "travel-life",
    audience: "Người yêu thích du lịch, học viên N5–N4.",
    description:
      "Các tình huống giao tiếp khi du lịch: hỏi đường, đặt phòng, gọi món, mua sắm.",
    objectives: [
      "Tự tin hỏi đường và xin chỉ dẫn.",
      "Đặt phòng khách sạn và xác nhận thông tin.",
      "Gọi món trong nhà hàng Nhật.",
    ],
    goals: [
      "Hỏi đường, hỏi giờ tàu tự nhiên.",
      "Đặt phòng và xác nhận thông tin.",
      "Gọi món, hỏi giá tự tin.",
    ],
    averageScore: 7.2,
    questions: [
      {
        id: "q1",
        vi: "Hỏi đường đến ga Shinjuku.",
        jp: "新宿駅はどこですか？",
        furigana: "しんじゅくえきはどこですか？",
        modelAnswer: {
          jp: "すみません、新宿駅までの道を教えていただけますか？",
          furigana: "すみません、しんじゅくえきまでのみちをおしえていただけますか？",
          vi: "Xin lỗi, anh/chị có thể chỉ giúp em đường đến ga Shinjuku được không ạ?",
          durationSec: 8,
        },
      },
      {
        id: "q2",
        vi: "Đặt phòng khách sạn cho 2 đêm.",
        jp: "2泊の予約をお願いします。",
        furigana: "にはくのよやくをおねがいします。",
        modelAnswer: {
          jp: "シングルルームで2泊の予約をお願いしたいのですが。",
          furigana: "シングルルームでにはくのよやくをおねがいしたいのですが。",
          vi: "Em muốn đặt một phòng đơn cho 2 đêm ạ.",
          durationSec: 8,
        },
      },
      {
        id: "q3",
        vi: "Hỏi giá món ramen.",
        jp: "このラーメンはいくらですか？",
        furigana: "このラーメンはいくらですか？",
        modelAnswer: {
          jp: "すみません、このラーメンはおいくらですか？",
          furigana: "すみません、このラーメンはおいくらですか？",
          vi: "Xin lỗi, bát ramen này giá bao nhiêu vậy ạ?",
          durationSec: 6,
        },
      },
      {
        id: "q4",
        vi: "Hỏi giờ tàu cuối cùng.",
        jp: "終電は何時ですか？",
        furigana: "しゅうでんはなんじですか？",
        modelAnswer: {
          jp: "すみません、ここから新宿行きの終電は何時ですか？",
          furigana: "すみません、ここからしんじゅくゆきのしゅうでんはなんじですか？",
          vi: "Xin lỗi, chuyến tàu cuối đi Shinjuku từ đây là mấy giờ ạ?",
          durationSec: 9,
        },
      },
    ],
  },
  {
    id: "t-daily-life",
    title: "Hội thoại hằng ngày",
    jpTitle: "日常会話",
    jpFurigana: "にちじょうかいわ",
    category: "travel-life",
    audience: "Mọi học viên trình độ N5–N3.",
    description:
      "Luyện các đoạn hội thoại đơn giản với bạn bè, hàng xóm, đồng nghiệp trong cuộc sống hằng ngày.",
    objectives: [
      "Giới thiệu bản thân tự nhiên.",
      "Hỏi và chia sẻ sở thích, kế hoạch cuối tuần.",
      "Mời và từ chối lời mời lịch sự.",
    ],
    goals: [
      "Giới thiệu bản thân tự nhiên.",
      "Chia sẻ sở thích, kế hoạch cuối tuần.",
      "Mời và từ chối lịch sự.",
    ],
    averageScore: 8.6,
    questions: [
      {
        id: "q1",
        vi: "Giới thiệu bản thân ngắn gọn.",
        jp: "はじめまして、よろしくお願いします。",
        furigana: "はじめまして、よろしくおねがいします。",
        modelAnswer: {
          jp: "はじめまして、グエン・ミン・トゥアンと申します。よろしくお願いします。",
          furigana: "はじめまして、グエン・ミン・トゥアンともうします。よろしくおねがいします。",
          vi: "Xin chào, tôi tên là Nguyễn Minh Tuấn. Rất mong được làm quen.",
          durationSec: 8,
        },
      },
      {
        id: "q2",
        vi: "Cuối tuần bạn thường làm gì?",
        jp: "週末は何をしますか？",
        furigana: "しゅうまつはなにをしますか？",
        modelAnswer: {
          jp: "週末はよくカフェで本を読んだり、友達と出かけたりします。",
          furigana: "しゅうまつはよくカフェでほんをよんだり、ともだちとでかけたりします。",
          vi: "Cuối tuần tôi thường đọc sách ở quán cà phê hoặc đi chơi với bạn.",
          durationSec: 9,
        },
      },
      {
        id: "q3",
        vi: "Mời bạn đi ăn tối.",
        jp: "今晩、一緒に食事しませんか？",
        furigana: "こんばん、いっしょにしょくじしませんか？",
        modelAnswer: {
          jp: "もしよかったら、今晩一緒に夕食を食べませんか？",
          furigana: "もしよかったら、こんばんいっしょにゆうしょくをたべませんか？",
          vi: "Nếu được, tối nay mình cùng đi ăn tối nhé?",
          durationSec: 7,
        },
      },
      {
        id: "q4",
        vi: "Hỏi thăm sức khỏe.",
        jp: "お元気ですか？",
        furigana: "おげんきですか？",
        modelAnswer: {
          jp: "お久しぶりです。お元気にお過ごしですか？",
          furigana: "おひさしぶりです。おげんきにおすごしですか？",
          vi: "Lâu rồi không gặp. Anh/chị vẫn khỏe chứ ạ?",
          durationSec: 6,
        },
      },
      {
        id: "q5",
        vi: "Cảm ơn vì món quà.",
        jp: "プレゼントをありがとうございます。",
        furigana: "プレゼントをありがとうございます。",
        modelAnswer: {
          jp: "素敵なプレゼントを本当にありがとうございます。",
          furigana: "すてきなプレゼントをほんとうにありがとうございます。",
          vi: "Cảm ơn anh/chị rất nhiều vì món quà tuyệt vời này.",
          durationSec: 7,
        },
      },
    ],
  },
  {
    id: "t-brse-interview",
    title: "Phỏng vấn vị trí BrSE",
    jpTitle: "BrSE面接",
    jpFurigana: "BrSEめんせつ",
    category: "brse-interview",
    audience: "Sinh viên BrSE FPTU, ứng viên kỹ sư cầu nối.",
    description:
      "Mô phỏng buổi phỏng vấn xin việc BrSE với nhà tuyển dụng Nhật: giới thiệu bản thân, kinh nghiệm dự án, lý do ứng tuyển.",
    objectives: [
      "Trình bày bản thân chuyên nghiệp bằng tiếng Nhật.",
      "Mô tả kinh nghiệm dự án, vai trò đã đảm nhiệm.",
      "Trả lời câu hỏi về điểm mạnh, điểm yếu và mục tiêu nghề nghiệp.",
    ],
    goals: [
      "Giới thiệu bản thân chuyên nghiệp.",
      "Trình bày kinh nghiệm dự án thuyết phục.",
      "Trả lời câu hỏi về điểm mạnh, mục tiêu.",
    ],
    averageScore: 7.9,
    questions: [
      {
        id: "q1",
        vi: "Hãy giới thiệu bản thân.",
        jp: "自己紹介をお願いします。",
        furigana: "じこしょうかいをおねがいします。",
        modelAnswer: {
          jp: "はじめまして、グエン・ミン・トゥアンと申します。FPT大学のBrSE専攻4年生です。",
          furigana: "はじめまして、グエン・ミン・トゥアンともうします。FPTだいがくのBrSEせんこう4ねんせいです。",
          vi: "Xin chào, tôi là Nguyễn Minh Tuấn, sinh viên năm 4 ngành BrSE tại Đại học FPT.",
          durationSec: 11,
        },
      },
      {
        id: "q2",
        vi: "Tại sao bạn muốn làm BrSE?",
        jp: "なぜBrSEになりたいですか？",
        furigana: "なぜBrSEになりたいですか？",
        modelAnswer: {
          jp: "技術と日本語の両方を活かして、日越をつなぐ橋になりたいからです。",
          furigana: "ぎじゅつとにほんごのりょうほうをいかして、にちえつをつなぐはしになりたいからです。",
          vi: "Vì em muốn vận dụng cả kỹ thuật lẫn tiếng Nhật để trở thành cầu nối giữa Việt Nam và Nhật Bản.",
          durationSec: 10,
        },
      },
      {
        id: "q3",
        vi: "Hãy nói về dự án bạn tâm đắc nhất.",
        jp: "今まで一番印象に残ったプロジェクトを教えてください。",
        furigana: "いままでいちばんいんしょうにのこったプロジェクトをおしえてください。",
        modelAnswer: {
          jp: "ECサイト開発のプロジェクトで、BrSEとして要件定義から関わりました。",
          furigana: "ECサイトかいはつのプロジェクトで、BrSEとしてようけんていぎからかかわりました。",
          vi: "Đó là dự án phát triển website thương mại điện tử, em tham gia với vai trò BrSE từ giai đoạn định nghĩa yêu cầu.",
          durationSec: 11,
        },
      },
      {
        id: "q4",
        vi: "Điểm mạnh của bạn là gì?",
        jp: "あなたの強みは何ですか？",
        furigana: "あなたのつよみはなんですか？",
        modelAnswer: {
          jp: "私の強みは、責任感とコミュニケーション能力です。",
          furigana: "わたしのつよみは、せきにんかんとコミュニケーションのうりょくです。",
          vi: "Điểm mạnh của em là tinh thần trách nhiệm và khả năng giao tiếp.",
          durationSec: 7,
        },
      },
      {
        id: "q5",
        vi: "Bạn có câu hỏi nào không?",
        jp: "何か質問はありますか？",
        furigana: "なにかしつもんはありますか？",
        modelAnswer: {
          jp: "御社の新人研修について、もう少し詳しく教えていただけますか？",
          furigana: "おんしゃのしんじんけんしゅうについて、もうすこしくわしくおしえていただけますか？",
          vi: "Anh/chị có thể chia sẻ thêm về chương trình đào tạo nhân viên mới của công ty được không ạ?",
          durationSec: 10,
        },
      },
      {
        id: "q6",
        vi: "Mức lương mong muốn.",
        jp: "希望の給料を教えてください。",
        furigana: "きぼうのきゅうりょうをおしえてください。",
        modelAnswer: {
          jp: "御社の規定に従いたいと考えておりますが、目安としては月給1500ドルを希望しております。",
          furigana: "おんしゃのきていにしたがいたいとかんがえておりますが、めやすとしてはげっきゅう1500ドルをきぼうしております。",
          vi: "Em mong được theo quy định của công ty, mức tham khảo là khoảng 1500 USD/tháng.",
          durationSec: 12,
        },
      },
    ],
  },
];
