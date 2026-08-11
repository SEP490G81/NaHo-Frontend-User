### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Làm cho tôi giao diện phần setting: `app/[locale]/(protected)/settings` với các yêu cầu sau:

1. Tôi muốn cấu trúc của phần cài đặt giống ở trong file `docs/settings/settings.json`, tôi muốn cái thanh search của
   setting phải tìm được cái mục này khi người dùng enter, và bôi sáng phần tìm được lên. Ngoài ra khi họ gõ vào ô
   search thì các gợi ý cũng sẽ hiện lên để người dùng chọn.
2. Ở mỗi part lớn, ở đầu đều phải có tên phần và mô tả ngắn gọn về phần đó làm gì
3. Giữa mỗi phần trong 1 part nên có Divider để ngăn cách cho dễ nhìn

### Yêu cầu

- Thiết kế giao diện sao cho dễ nhìn và dễ dùng, phong cách hiện đại (tham khảo các hình ảnh ở: `docs/settings/images`)
- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`
- Giao diện sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `styles/globals.css`