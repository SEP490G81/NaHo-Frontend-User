### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trường của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Yêu cầu

#### 1

- `layouts/protected-header/features/daily.mission.button.tsx` tôi muốn khi ấn vào button này nó sẽ hiện ra popup hiển
  thị danh sách các nhiệm vụ hàng ngày của người dùng. Có trạng thái đã hoàn thành, chưa hoàn thành.
- Lấy ra các nhiệm vụ trong 1 ngày thì hãy sử dụng API: `http://localhost:8386/api/v1/daily-missions/today`, nó sẽ trả
  ra kết quả sau:

```
{
    "meta": {
        "traceId": "280a9f71-5ca0-4b3a-9bcb-3a14b12d4c3e",
        "timestamp": "2026-07-27T15:44:39.236219900Z",
        "pageMeta": null
    },
    "message": "Lấy danh sách nhiệm vụ hàng ngày hôm nay thành công!",
    "data": [
        {
            "id": 2,
            "point": 5.0,
            "missionDate": "2026-07-27",
            "missionType": "COMPLETE_SPEAKING_QUESTION_NODE"
        },
        {
            "id": 1,
            "point": 5.0,
            "missionDate": "2026-07-27",
            "missionType": "TALK_WITH_AI"
        }
    ]
}
```

#### 2

- Để biết người dùng đã hoàn thành nhiệm vụ nào thì hãy sử dụng API:
  `http://localhost:8386/api/v1/user-daily-missions/all`, nó sẽ trả ra:

```
{
    "meta": {
        "traceId": "62ad071b-325f-4939-8ae0-3fc543a41786",
        "timestamp": "2026-07-27T15:43:35.082321500Z",
        "pageMeta": null
    },
    "message": "Lấy danh sách nhiệm vụ hàng ngày của người dùng thành công!",
    "data": [
        {
            "id": 1,
            "userId": 1,
            "dailyMissionId": 2,
            "completedAt": "2026-07-27T15:41:31.735127Z"
        }
    ]
}
```

- Bạn có thể dựa vào cái `dailyMissionId` để biết họ đã hoàn thành mission nào.

### Chú ý

- Cả 2 API trên đều yêu cầu access token.
- Kiểu dữ liệu của backend trả về trong cái data là:

```
public record DailyMissionResponse(
Long id,
Double point,
LocalDate missionDate,
MissionType missionType
) {
}

public record UserDailyMissionResponse(
        Long id,
        Long userId,
        Long dailyMissionId,
        Instant completedAt
) {
}
```

- Các hàm gọi xuống API của backend thì bạn phải khai báo trong `services/client` và gọi xuống next js server để sau đó
  nextjs server sẽ call xuống backend spring boot.
- Bạn hãy chia các file .tsx ra nhỏ, để vào components nếu không có liên quan tới API, và features nếu có liên quan tới
  API. Các utils, constant cũng nên sử dụng để tránh làm phình to code trong 1 file.