### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Thêm cho tôi nút kết thúc hội thoại:

+ Backend API: `endSession`
+ URL: `http://localhost:8386/api/v1/speaking/session/end/{sessionCode}`
+ Method: `POST`
+ Response:

```
public record SpeakingSessionAssessmentResponse(
        Long id,
        Long speakingSessionId,

        String summary,
        String strengths,
        String weaknesses,

        String feedbackFluency,
        String feedbackPronunciation,
        String feedbackGrammar,
        String feedbackVocabulary,
        String feedbackInteraction,
        String feedbackNaturalness,
        String feedbackCoherence,

        String studyFocusArea,
        String studyReason,
        String studyRecommendation,
        String studyEncouragement
) {
}
```

```
- Giải thích các thuộc tính:
{
  "summary": "<2-4 câu tiếng Việt — tóm tắt tổng quan năng lực giao tiếp trong phiên thoại, nêu rõ vấn đề nếu rơi vào unhappy case>",
  "strengths": [
    "<điểm mạnh cụ thể kèm dẫn chứng từ transcript, tiếng Việt>",
    "<điểm mạnh cụ thể khác, tiếng Việt>"
  ],
  "weaknesses": [
    "<điểm yếu / điểm cần cải thiện cụ thể kèm dẫn chứng từ transcript, tiếng Việt>",
    "<điểm yếu khác, tiếng Việt>"
  ],
  "feedback": {
    "fluency": "<nhận xét chi tiết về độ trôi chảy, ngập ngừng, tốc độ nói (tiếng Việt)>",
    "pronunciation": "<nhận xét chi tiết về phát âm, độ rõ ràng (tiếng Việt)>",
    "grammar": "<nhận xét chi tiết về ngữ pháp, trợ từ, chia động từ (tiếng Việt)>",
    "vocabulary": "<nhận xét chi tiết về vốn từ vựng, độ phong phú, mức độ phù hợp (tiếng Việt)>",
    "interaction": "<nhận xét chi tiết về khả năng tương tác, phản hồi, duy trì hội thoại (tiếng Việt)>",
    "naturalness": "<nhận xét chi tiết về độ tự nhiên, sắc thái biểu cảm, mức độ lịch sự (tiếng Việt)>",
    "coherence": "<nhận xét chi tiết về tính mạch lạc và liên kết ý trong câu trả lời (tiếng Việt)>"
  },
  "improved_expressions": [
    {
      "original": "<câu tiếng Nhật học viên đã nói>",
      "improved": "<câu tiếng Nhật chuẩn hơn, tự nhiên hơn phù hợp với ngữ cảnh>",
      "explanationVi": "<giải thích bằng tiếng Việt vì sao nên sửa như vậy>"
    }
  ],
  "studyRecommendation": {
    "focusArea": "<grammar|vocabulary|fluency|pronunciation|interaction|naturalness — 1 khía cạnh quan trọng nhất cần ưu tiên cải thiện>",
    "reason": "<1-2 câu tiếng Việt — lý do vì sao đây là ưu tiên hàng đầu>",
    "suggestedPractice": "<tiếng Việt — 1-2 bài tập hoặc phương pháp luyện tập cụ thể có thể thực hành ngay>",
    "encouragement": "<1 câu tiếng Việt — lời động viên tích cực, chân thành hướng tới sự tiến bộ của người học>"
  }
}
```

- Sau khi end xong thì bạn hãy tạo ra 1 page khác để router sang trang đó và hiển thị các thông số cũng như đánh giá từ
  AI. (page: `app/[locale]/(chatroom)/chat-result/page.tsx`)
- Nếu ấn vào các item completed trên sidebar `layouts/chat-sidebar` thì cũng sẽ route sang trang đó.

### Yêu cầu

- Phân tách các module, các component, các hàm rõ ràng, dễ quản lí code, tránh code vào 1 file quá dài (1 file phải ít
  hơn 200 dòng).
- Đặt tên các file theo cú pháp "a.b.c[đuôi file]" và nhìn vào có thể biết luôn là file đó làm cái gì.
- Mỗi 1 module sẽ có chuẩn sau:

+ components: chứa các component không gọi API
+ features: chứa các component có tương tác, gọi tới API
+ constants: chứa các hằng số để sử dụng cho module đó
+ hooks: chứa các custom hook để sử dụng cho module đó
+ types: chứa các kiểu dữ liệu UI cho module đó (không phải dto)
+ providers: chứa các wrapper component, react context...
+ utils: chứa các helper, validator,... cho module đó

- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`,
  không nên truyền `t` làm tham số, chỗ nào cần thì bạn cứ khai báo ra là xong.
- Về phần style, hãy sử dụng tailwindcss và các component có sẵn của MUI và nên dùng các màu có sẵn của tôi trong file
  `styles/globals.css`
- Về phần gọi API ở backend thì phải thông qua `services`, nếu như là gọi từ phía client components thì phải gọi về
  backend của NextJS trước rồi NextJS server gọi backend thật. Nếu là gọi API từ phía server component thì có thể gọi
  trực tiếp backend thật.
- Về phần props, nếu truyền props >=3 component thì nên sử dụng react context. Các props mà chỉ đọc thì phải để thành
  `Readonly`