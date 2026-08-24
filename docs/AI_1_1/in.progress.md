### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Input

- Các file trong folder `layouts/chatroom-sidebar`

### Mô tả bài toán

- Trước tiên hãy gọi API backend: `http://localhost:8386/api/v1/speaking/session/in-progress/all`

+ Method: GET
+ Response: List<SpeakingSessionListItemResponse>

```
public record SpeakingSessionListItemResponse(
        Long id,
        String sessionCode,
        Long userId,
        Long personaId,
        String topic,
        String voiceName,
        MarugotoLevel marugotoLevel,
        FormalityLevel formalityLevel,
        Integer durationSeconds,
        int totalTurns,
        Double asrConfidence,
        String fullTranscript,
        SpeakingSessionStatus status,
        Instant startedAt,
        Instant endedAt
) {
}
```

- Bạn cũng hãy cập nhật/tạo mới SpeakingSessionListItemResponse trong `types/responses`

- Tôi muốn bạn làm cho tôi cái hiển thị các in progress session lên cái sidebar như sau:

+ Khi sidebar mở thì hiện icon và thông tin `topic` và ở dưới là thời gian start dạng giờ việt nam (`startedAt`)
+ Khi sidebar đóng thì hiện icon và khi hover vào thì hiển đầy đủ thông tin ở tooltip

- Xóa toàn bộ các kiểu Response cũ, hàm gọi API cũ có liên quan.

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