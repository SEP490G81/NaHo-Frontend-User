### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

1. Về việc phân chia message giữa AI và User:

- Tôi muốn bạn sửa lại cái component `modules/protected/live-chatroom/components/message.item.component.tsx` như sau:

```
public record SpeakingSessionMessageResponse(
        Long id,
        Long sessionId,
        Long audioFileId,
        Integer turnIndex,
        SenderType senderType,
        MessageType messageType,
        String content,
        String contentTranslation,
        String correctedText,
        String correctionExplanation,
        String grammarNote,
        String hintForLearner,
        Double pronunciationScore,
        String aiReplyAudio,
        String userRecordAudio
) {
}
```

- Message của AI thì sẽ có các thuộc tính như sau:

+ content: văn bản AI phản hồi
+ contentTranslation: bản dịch của content AI phản hồi
+ grammarNote: giải thích ngữ pháp mà AI dùng
+ aiReplyAudio: audio phản hồi của AI
+ suggestedReplies: dùng để hiển thị ra các gợi ý ở trên ô chat để hỗ trợ người dùng trong trường hợp không biết nói gì.
  Có thể dùng switch button để ẩn/hiện cái gợi ý này.

- Message của User thì sẽ có các thuộc tính sau:

+ content: văn bản AI phản hồi
+ correctedText: gợi ý sửa lại câu nói của người dùng.
+ correctionExplanation: đánh giá câu nói
+ hintForLearner: gợi ý cho leaner
+ pronunciationScore: chấm điểm phát âm (trong trường hợp người dùng gửi audio message)
+ userRecordAudio: record của người dùng (audio base 64) nếu không có thì không cần hiện

2. Thêm cho tôi cái input để nhập các message hoặc gửi file audio.

- Trên thanh input đó sẽ hiện các `suggestedReplies`, nếu ấn vào cái nào thì fill nó vào ô input.
- Còn khi ghi âm sẽ cần có nút dừng, khi dừng sẽ hiện cái file đó vào ô input để có thể nghe lại trước khi quyết định
  gửi.
- Logic gửi tôi sẽ làm sau.

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