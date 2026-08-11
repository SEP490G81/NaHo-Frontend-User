### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi có 1 file `components/providers/app.toggle.furigana.provider.tsx`, tôi muốn bạn tạo cho tôi 1 react context chứa
  state là bật/tắt furigana cho website
- Sau đó bọc nó vào protected layout (`[layout.tsx](../app/%5Blocale%5D/%28protected%29/layout.tsx)`) => tức là chỉ có
  trong trang đã đăng nhập thì mới có chức năng bật tắt furigana.
- Sau đó tạo 1 button lên trên thanh protected header: `layouts/protected-header`

### Yêu cầu

- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`
- Giao diện sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `styles/globals.css`
- Hiện tại chỉ cần làm những gì tôi yêu cầu, còn về khi bật/tắt nó hoạt động ra sao thì tôi sẽ yêu cầu sau.