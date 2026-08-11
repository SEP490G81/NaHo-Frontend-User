### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi muốn bạn sửa lại phần ghim 1 topic vào sidebar, hiện tại nếu tôi chuyển sang tài khoản khác thì ghim đó vẫn còn.
- Về nội dụng của topic được ghim, tôi muốn như sau:

+ Khi sidebar mở: nội dung gồm: level của quyển + chủ đề (ví dụ: A1 - Chủ đề 1)
+ Khi sidebar đóng: chỉ hiện nút ghim

- Dù là mở hay đóng thì khi hover vào sẽ hiện: ảnh quyển sách ở bên trái và thông tin topic ở bên phải bao gồm: tên
  quyển sách, số chủ đề, tên chủ đề, mô tả (nếu có)

### Yêu cầu

- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`
- Giao diện sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `styles/globals.css`
