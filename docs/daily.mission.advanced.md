### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Trước tôi đã nhờ bạn làm cho chức năng nhiệm vụ hàng ngày ở folder `layouts/protected-header` và các files có liên
  quan. Tuy nhiên giờ logic và API có thay đổi, nên tôi muốn bạn làm lại cho tôi.

#### Sự thay đổi

- Về response type:

```
public record UserDailyMissionResponse(
Long id,
Long userId,
DailyMissionResponse dailyMission,
MissionStatus status,
LocalDate startedDate,
LocalDate completedDate,
LocalDate earnedDate
) {
}

public enum MissionStatus {
    COMPLETED, IN_PROGRESS, EARNED
}

public record DailyMissionResponse(
Long id,
String title,
String description,
Double point,
MissionType missionType
) {
}
```

- Giờ user sẽ gọi xuống backend API: `http://localhost:8386/api/v1/user-daily-missions/today` để lấy ra các nhiệm vụ của
  người dùng hôm nay, sau đó backend sẽ trả về:

```
{
    "meta": {
        "traceId": "16822980-d263-4640-a0cd-63ef01c861ea",
        "timestamp": "2026-07-28T15:22:20.023957500Z",
        "pageMeta": null
    },
    "message": "Lấy danh sách nhiệm vụ hàng ngày hôm nay của người dùng thành công!",
    "data": [
        {
            "id": 1,
            "userId": 1,
            "dailyMission": {
                "id": 1,
                "title": "Trò chuyện với AI",
                "description": "Thực hiện trò chuyện với AI",
                "point": 5.0,
                "missionType": "TALK_WITH_AI"
            },
            "status": "IN_PROGRESS",
            "startedDate": "2026-07-28",
            "completedDate": null,
            "earnedDate": null
        },
        {
            "id": 2,
            "userId": 1,
            "dailyMission": {
                "id": 2,
                "title": "Hoàn thành bài nói",
                "description": "Hoàn thành 1 câu hỏi phát âm",
                "point": 5.0,
                "missionType": "COMPLETE_SPEAKING_QUESTION_NODE"
            },
            "status": "IN_PROGRESS",
            "startedDate": "2026-07-28",
            "completedDate": null,
            "earnedDate": null
        }
    ]
}
```

- Bạn hãy dựa vào cái status để hiển thị trên giao diện như sau:

+ Nếu là `IN_PROGRESS` thì hãy hiện thẻ Link của next-intl để redirect người dùng ra trang học các node hoặc là trang
  talk với AI
+ Nếu là `COMPLETED` thì sẽ hiện tag hoàn thành và nút nhận thưởng.
+ Nếu là `EARNED` thì sẽ hiện tag là đã nhận.

- Khi ấn vào nút nhận thưởng thì sẽ gọi API sau: `http://localhost:8386/api/v1/user-daily-missions/earn`, sau đó backend
  sẽ trả về:

```
{
    "meta": {
        "traceId": "57f2f06a-9f3c-420b-8382-3fc2485c940b",
        "timestamp": "2026-07-28T15:33:34.001771500Z",
        "pageMeta": null
    },
    "message": "Nhận phần thưởng nhiệm vụ hàng ngày thành công!",
    "data": {
        "id": 2,
        "userId": 1,
        "dailyMission": {
            "id": 2,
            "title": "Hoàn thành bài nói",
            "description": "Hoàn thành 1 câu hỏi phát âm",
            "point": 5.0,
            "missionType": "COMPLETE_SPEAKING_QUESTION_NODE"
        },
        "status": "EARNED",
        "startedDate": "2026-07-28",
        "completedDate": "2026-07-28",
        "earnedDate": "2026-07-28"
    }
}
```

### Yêu cầu

- Các hàm gọi xuống API của backend thì bạn phải khai báo trong `services/client` và gọi xuống next js server để sau đó
  nextjs server sẽ call xuống backend spring boot.
- Bạn hãy chia các file .tsx ra nhỏ, để vào components nếu không có liên quan tới API, và features nếu có liên quan tới
  API. Các utils, constant cũng nên sử dụng để tránh làm phình to code trong 1 file.