### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi muốn bạn sửa lại cho tôi component: `modules\protected\lesson-path\components\topic.path.header.tsx` theo bố cục
  như sau:

```
[Nút trở lại trang danh sách các chủ đề] khoảng cách    [Số chủ đề, ví dụ Chủ đề 1]            
                                                                                                [Nút ấn vào để xem danh sách từ vựng của topic này(tạm thời chưa càn logic gọi API)]
                                                        [Tiêu đề chủ đề, ví dụ 日本語]     
```

- Thanh header này sẽ được chia ra làm 2 khối riêng biệt gồm 1 bên nhỏ là nút trở lại, 1 bên là số chủ đề, tiêu đề chủ
  đề, nút xem danh sách từ vựng. Khoảng cách giữa 2 khối là 20px
- Khối bên phải sẽ dùng justify between và cho nó chiếm nốt chiều rộng còn lại, còn khối bên trái thì chiều rộng vừa đủ
  cái nút trở lại.
- Màu nền của 2 khối này có thể để cùng màu với các node trong topic đó.
- Khi hover vào, cả 2 khối sẽ hòa làm 1 (nhưng vẫn giữ layout), sau đó chiều cao của nó sẽ rộng ra và để hiện ra ở dưới
  là thanh learning progress để biết người dùng biết được là học bao nhiêu rồi. (Hiệu ứng giống phần dynamic island trên
  ios)
- Ở dưới thanh learning progress sẽ là đoạn text để biết được là học bao nhiêu node rồi và còn bao nhiêu node nữa.

### Yêu cầu

- Thiết kế giao diện sao cho dễ nhìn, hiện đại, và tối ưu trải nghiệm người dùng.
- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`
- Giao diện sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `styles/globals.css`