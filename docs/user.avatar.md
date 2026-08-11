### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi mới cập nhật lại kiểu dữ liệu của UserResponse ở phía backend như sau:

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


public record AuthProviderResponse(
        Long id,
        AuthProviderName providerName,
        String avatarUrl
) {
}
```

- Bạn hãy sửa lại kiểu dữ liệu trong `types/responses/user.response.ts`
- Sau đó tôi muốn bạn xử lí lại các chỗ mà dùng đến avatar của user như sau:

+ nếu avatarUrl và avatarUrl trong AuthProviderResponse đều null thì sử dụng chữ cái đầu của tên người dùng viết hoa,
  nếu tên cũng null thì dùng chữ cái đầu của email
+ nếu avatarUrl null và avatarUrl trong AuthProviderResponse khác null thì lấy avatarUrl trong AuthProviderResponse
+ nếu avartarUrl khác null thì phải lấy cái đó làm avatar (bỏ qua avatarUrl trong AuthProviderResponse)

### Yêu cầu

- Thiết kế giao diện sao cho dễ nhìn, hiện đại, và tối ưu trải nghiệm người dùng.
- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`
- Giao diện sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `styles/globals.css`