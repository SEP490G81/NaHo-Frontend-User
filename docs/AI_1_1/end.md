### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi cần bạn khi ấn vào `modules/protected/live-chatroom/components/end-session-dialog.tsx` thì gọi API backend sau:

+ API: /speaking/session/end/{sessionCode}, method POST
+ Cần gửi lên 1 Request Body:

```
public record EndSessionRequest(
        String topic,
        String speechMetadata,
        String asrConfidence
) {
}
```

- Response sẽ trả về:

```
public record ScoringResponse(
        String sessionCode,
        int overallScore,
        String jlptEstimate,
        Scores scores,
        String summary,
        List<String> strengths,
        List<String> weaknesses,
        Map<String, String> feedback,
        List<ImprovedExpression> improvedExpressions
) {
    public record Scores(
            int fluency,
            int pronunciation,
            int grammar,
            int vocabulary,
            int interaction,
            int naturalness,
            int coherence
    ) {
    }

    public record ImprovedExpression(String original, String improved) {
    }
}
```

- Hãy tận dụng lại các components trong `modules/protected/live-chatroom/components` để hiển thị trang kết quả.
- Tôi cũng muốn thêm 1 chức năng vào `modules/protected/settings` và URL là /settings chức năng config cho AI live chat
  room như sau:

+ Nó sẽ có 1 nút để chọn giữa việc tự phát file âm thanh mà AI trả ra hoặc là phải bấm vào nút play thì mới phát

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