### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Yêu cầu

- Tôi có 1 api ở backend như sau: http://localhost:8386/api/v1/daily-rewards
- Request cần có dạng:

```
{
    "dailyRewardId": 25
}
```

- Response cần có dạng:

```
{
    "meta": {
        "traceId": "8a065ada-cb7b-45af-a931-ed90e0dfe217",
        "timestamp": "2026-07-25T01:55:40.893491900Z",
        "pageMeta": null
    },
    "message": "Nhận phần thưởng điểm danh thành công!",
    "data": {
        "id": 1,
        "userId": 1,
        "dailyRewardId": 25,
        "attendanceDate": "2026-07-25",
        "earnedPoint": 8
    }
}
```

- Tạo cho tôi service trong client service và api ở chỗ next js (tham khảo cách mà tôi làm với các api khác)
- Kích hoạt cho tôi cái ấn vào 1
  `D:\Ki_9\SEP490\Graduation_Project\code\naho-fe-user\layouts\protected-header\components\daily.reward.item.tsx` thì sẽ
  gọi API này
