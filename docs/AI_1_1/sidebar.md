### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Giờ tôi muốn bạn thêm cho tôi mục là để hiển thị các IN_PROGRESS session thông qua việc sử dụng API:

```
export async function getActiveSession(
    personaId?: number | null,
): Promise<ActiveSpeakingSessionResponse | null> {
    const query = personaId != null ? `?personaId=${personaId}` : "";
    const response = await apiRequest(`/api/speaking/session/active${query}`);
    return unwrap<ActiveSpeakingSessionResponse | null>(response);
}
```

- Các phiên đang nói dở đó sẽ được hiển thị trên `layouts/sidebar/components/learner.sidebar.tsx` ở dưới chỗ các chủ đề
  đã ghim
- Khi tôi ấn vào 1 session trên sidebar đó thì nó sẽ gọi API, sau đó chuyển sang trang để tiếp tục nói chuyện với AI.

```
    // Khôi phục phiên dở → seed câu cũ + câu chào lại → vào phòng chat.
    const handleResume = async () => {
        if (!active) return;
        await resume(
            {
                sessionCode: active.sessionCode,
                personaId: active.personaId,
                formalityLevel: active.formalityLevel,
                marugotoLevel: active.marugotoLevel,
                messages: active.messages,
            },
            { voiceSpeed, showHints },
        );
    };
```

- Khi thu nhỏ sidebar thì tôi muốn vẫn phải có divider để ngăn cách giữa các navigation items, chủ đề đã ghim và các
  session đang dở. Nếu không có thì không cần divider.
- Thông tin của 1 session cần hiển thị khi phóng to sẽ bao gồm:

+ Icon cái mic
+ Câu cuối cùng mà người dùng nói (senderType = "USER"). Nếu người dùng chưa nói câu nào thì sẽ lấy câu cuối cùng mà AI
  nói (senderType = "ASSISTANT")

- Khi thu nhỏ thì sẽ hiện thông tin là icon cái mic, và khi hover vào thì hiện thông tin về câu cuối cùng mà người dùng
  nói (senderType = "USER"). Nếu người dùng chưa nói câu nào thì sẽ lấy câu cuối cùng mà AI nói (senderType =
  "ASSISTANT")

- Ở session đó tôi cũng cần dấu "x" để khi ấn vào thì hỏi confirm là bạn có muốn xóa session này không rồi mới cho xóa.
  Xóa thì bạn hãy gọi API /speaking/session/${sessionCode} Method là Delete trả về void thành công là mã 204

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