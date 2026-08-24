### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Input

- Các file trong folder: `app/[locale]/(chatroom)/live-chatroom`
- Các file trong folder: `modules/protected/persona-setup`
- Các file trong folder: `modules/protected/live-chatroom`
- File `services/server/speaking.llm.service.ts`
- File `services/client/speaking.llm.service.ts`

### Mô tả bài toán

- Tôi muốn bạn sửa lại luồng của phần chat với AI như sau:

1. Khi ấn bắt đầu 1 đoạn chat (`SummaryPanel`) thì sẽ gọi tới API backend là `startConversation`
2. API `startConversation` sẽ trả về 1 sessionCode, sau đó FE điều hướng người dùng tới trang
   `live-chatroom/{sessionCode}`
3. Khi tới trang, `live-chatroom/{sessionCode}` thì sẽ gọi API backend là `getInProgressSessionDetails`, nếu bị lỗi hoặc
   không có kết quả thì tức là đoạn chat này chưa được bắt đầu, khi đó, sẽ hiện nút sẵn sàng.

+ Nếu người dùng ấn vào nút sẵn sàng thì gọi API `initFirstGreeting` để bắt đầu trò chuyện với AI.
+ Nếu có kết quả thì sẽ hiện thị ra các message trò chuyện giữa 2 bên.

- Sau khi sửa, bạn hãy xóa toàn bộ các file không còn dùng tới, không liên quan nữa, outdate để tránh làm rối.
- Các API đã có đủ trong `services`, bạn hãy sử dụng chúng.

### Yêu cầu

- Code đủ, đúng, không cần dài dòng.
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