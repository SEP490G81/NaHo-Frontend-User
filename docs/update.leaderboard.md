### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi mới cập nhật kiểu dữ liệu ở backend như sau:

```
public record LeaderboardUserResponse(
        Long id,
        Long leagueId,
        Integer rank,
        String username,
        String email,
        String fullName,
        String avatarUrl,
        List<String> authAvatarUrl,
        Double totalPoint
) {
}
```

- Tôi muốn bạn update lại kiểu dữ liệu ở phía frontend, trong đó avatarUrl chính là avatar chính của người dùng, còn
  authAvatarURl là của bên thứ 3 cung cấp như google, facebook...
- Sau khi chỉnh sửa kiểu dữ liệu, bạn hãy sửa lại các mục lấy avatar của người dùng trong
  `modules/protected/leaderboard` và tối ưu lại các components cho gọn gàng hơn.

### Yêu cầu

- Thiết kế giao diện sao cho dễ nhìn, hiện đại, và tối ưu trải nghiệm người dùng.
- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`
- Giao diện sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `styles/globals.css`