### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- `modules/protected/settings/features/account.settings.tsx` sửa lại cho tôi cái nút đổi ảnh cho màu sắc nó đồng bộ hơn.
  Ngoài ra làm hoàn thiện việc gọi API backend để upload ảnh như sau:
- Request sẽ kèm theo JWT token và avatar file ở trong Form Data (ở backend tôi lấy bằng RequestPart)
- Backend URL: `http://localhost:8386/api/v1/users/avatar`, method là PATCH, status 200
- Response sẽ là:

```
public record UserResponse(
        Long id,
        List<AuthProviderResponse> authProviders,

        Long userLearningProgressId,
        String avatarUrl,

        String username,
        String email,
        String fullName,
        Gender gender,
        LocalDate dob,
        JLPTLevel jlptLevel
) {
}
```

- avatarURL sẽ là avatar mới của người dùng nếu upload thành công
- Và tôi muốn là có hiệu ứng loading khi đang upload

### Yêu cầu

- Thiết kế giao diện sao cho dễ nhìn và dễ dùng, phong cách hiện đại (tham khảo các hình ảnh ở: `docs/settings/images`)
- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`
- Giao diện sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `styles/globals.css`