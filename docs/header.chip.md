### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Trong component `layouts/protected-header/components/protected.header.tsx` có 2 component con là
  `<DailyRewardCalendar />` và`<DailyMissionButton />`, giờ tôi muốn bạn tạo cho tôi 1 cái giống về giao diện như vậy
  nhưng nó sẽ có chức năng để hiển thị chuỗi học liên tiếp của người dùng hiện tại.
- Về phần giao diện hãy tham khảo ở trong component `modules/protected/dashboard/components/welcome.banner.tsx`
- API để hiển thị được cái đó thì hãy sử dụng đoạn code có sẵn như sau:

```
    const { data: progress } = useQuery({
        queryKey: ["user-learning-progress"],
        queryFn: getUserLearningProgress,
        });
```

- Vì có nhiều chỗ sử dụng tới cái user-learning-progress nên tôi muốn bạn tạo 1 react context trong
  `components/providers` có state là user learning progress, sau đó dùng nó để bọc ProtectedLayout (
  `app/[locale]/(protected)/layout.tsx`)
- Đặc biệt, tất cả các chỗ mà dùng tới nó thì bạn hãy thay thành react context thay vì lại gọi API lần nữa.

### Yêu cầu

- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`
- Giao diện sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `styles/globals.css`
