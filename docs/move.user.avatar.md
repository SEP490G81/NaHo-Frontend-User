### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Trước tiên tôi muốn bạn chuyển cái component `layouts/protected-header/components/user.avatar.tsx` khỏi header, và
  chuyển nó xuống bottom của sidebar `layouts/protected-header/components/user.avatar.tsx`
- Tiếp theo tôi muốn bạn sửa lại như sau:

+ Khi sidebar mở: phải hiện bên cạnh user avatar các thông tin cơ bản như tên, email, và loại subscription.
+ Khi sidebar đóng: chỉ hiện duy nhất avatar của user.

- Về phần component `AccountMenu` trong user avatar thì tôi muốn bạn sửa như sau:

+ Khi ấn vào nội dung vẫn như hiện tại, tuy nhiên vị trí của nó hiện thị sẽ phải nằm bên phải của user avatar và đáy
  chạm với đáy của sidebar.

### Yêu cầu

- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`
- Giao diện sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `styles/globals.css`