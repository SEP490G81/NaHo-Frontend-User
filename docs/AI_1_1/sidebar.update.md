### Vai trò

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Input

- Các file trong folder `layouts/sidebar`
- File `layouts/protected-header/components/protected.header.tsx`
- Ảnh `docs/assets/img.png` và `docs/assets/img_1.png`

### Mô tả bài toán

- Hãy làm cho tôi cái sidebar cho layout của chatroom, tạm thời nó bao gồm các phần tử sau:

+ App Logo (ấn vào sẽ redirect tới trang chủ)
+ Button `Tạo đoạn chat mới`
+ 1 mục lớn là `Đã hoàn thành` (tạm thời để trống các item, sau này sẽ gọi API)
+ 1 mục lớn là `Đoạn chat` (tạm thời để trống các item, sau này sẽ gọi API)
+ Ở cuối thanh sidebar sẽ có component `UserAvatar`

- Các item trong các mục lớn có thể có nhiều nên bạn phải thiết kế để có thể cuộn, tuy nhiên nút tạo mới và user avatar
  thì không được cuộn theo.
- Ở trên `ProtectedHeader` có 1 button để thu/phóng sidebar, tôi cũng muốn nó thu phóng được sidebar của chatroom.
- Bạn có thể tham khảo 2 hình ảnh tôi đính kèm ở trong [input]

### Ràng buộc

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

### Output

- Các file code trong folder `layouts/chatroom-sidebar`