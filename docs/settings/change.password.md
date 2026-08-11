### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Làm cho tôi phần đổi mật khẩu trong settings: `modules/protected/settings/features/security.settings.tsx`
- Các phần tử input hãy sử dụng TextField của MUI và có helper text để hiện message lỗi, tham khảo
  `D:\Ki_9\SEP490\Graduation_Project\code\naho-fe-user\modules\public\login\components\login.form.text.fields.tsx`
- Trước khi gửi requeest cho backend, tôi muốn bạn validate trên frontend trước như sau:

+ Cả 3 fields không được để trống
+ New Password và Confirm new password phải khớp nhau
+ Pattern của password phải thỏa mãn:

```
    private static final Pattern PASSWORD_PATTERN =
            Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!_~\\-]).{8,}$");
```

- Request xuốgn backend sẽ có kiểu sau:

```
public class ChangePasswordRequest {
    @NotBlank
    private String oldPassword;

    @NotBlank
    private String newPassword;

    @NotBlank
    private String confirmPassword;
}
```

- Response khi thành công:

```
{
    "meta": {
        "traceId": "c4ae79bc-2a1e-4be8-8dae-18b0e499ae72",
        "timestamp": "2026-08-09T02:46:04.524249300Z",
        "pageMeta": null
    },
    "message": "Đổi mật khẩu thành công.",
    "data": null
}
```

- Response khi thất bại: mật khẩu cũ không đúng:

```
{
    "type": "https://api.v1.naho/errors/user_a018",
    "title": "Mật khẩu cũ không đúng",
    "status": 400,
    "detail": "Mật khẩu cũ bạn nhập không chính xác.",
    "instance": "/api/v1/auth/change-password",
    "errorCode": "USER_A018",
    "traceId": "ce194fda-4c6e-478a-a4f7-664465c5844c",
    "timestamp": "2026-08-09T02:53:01.277216800Z"
}
```

- Mật khẩu cũ trùng với mật khẩu mới nhập:

```
{
    "type": "https://api.v1.naho/errors/user_a017",
    "title": "Trùng mật khẩu cũ",
    "status": 400,
    "detail": "Mật khẩu mới không được trùng với mật khẩu cũ.",
    "instance": "/api/v1/auth/change-password",
    "errorCode": "USER_A017",
    "traceId": "a0820738-d8d5-467b-a4e3-7dc52a43c00e",
    "timestamp": "2026-08-09T02:53:34.703487900Z"
}
```

- Backend URL: `http://localhost:8386/api/v1/auth/change-password`, method POST, có kèm JWT token ở header

### Yêu cầu

- Thiết kế giao diện sao cho dễ nhìn và dễ dùng, phong cách hiện đại (tham khảo các hình ảnh ở: `docs/settings/images`)
- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`,
  không nên truyền `t` làm tham số, chỗ nào cần thì bạn cứ khai báo ra là xong.
- Giao diện sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `styles/globals.css`
- Với các chỗ gọi API ở backend thì phải thông qua `services`, nếu như là gọi từ phía client components thì phải gọi về
  backend của NextJS trước rồi NextJS server gọi backend thật. Nếu là gọi API từ phía server component thì có thể gọi
  trực tiếp backend thật. 