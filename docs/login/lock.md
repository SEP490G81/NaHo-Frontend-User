### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi mới làm thêm 1 chức năng lock trong phần login của người dùng
- Khi mà người dùng đăng nhập sai quá 5 lần thì tôi sẽ trả response lỗi từ backend ra như sau:
- Nó sẽ có kiểu là ProblemDetails

```
{
    "type": "https://api.v1.naho/errors/user_a024",
    "title": "Tài khoản bị khoá tạm thời!",
    "status": 423,
    "detail": "Tài khoản của bạn đã bị khoá tạm thời do đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 15 phút.",
    "instance": "/api/v1/auth/login",
    "errorCode": "USER_A024",
    "traceId": "a4aaa6d3-6a92-437e-9551-0a533560baa8",
    "timestamp": "2026-08-13T13:55:37.072557200Z"
}
```

- Tôi muốn bạn sửa lại cho tôi phần login `naho-fe-admin\modules\public\login` và  `naho-fe-user\modules\public\login`
  để thêm thông báo lỗi khi mà người dùng đăng nhập sai quá nhiều.
- Logic này tôi vẫn để chung vào API credentials login thôi nhé.

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