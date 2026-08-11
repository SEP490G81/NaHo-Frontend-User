### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả yêu cầu

- Tôi có 1 API ở backend như sau:http://localhost:8386/api/v1/user-daily-attendances/all/current-month
- Request chỉ yêu cầu bearer token
- Response backend trả về như sau:
  {
  "meta": {
  "traceId": "a2d2c9d5-8131-4677-86aa-ea0603d5f59d",
  "timestamp": "2026-07-25T02:10:54.415812Z",
  "pageMeta": null },
  "message": "Lấy lịch sử điểm danh tháng hiện tại thành công!",
  "data": [
  {
  "id": 2,
  "userId": 1,
  "dailyRewardId": 25,
  "attendanceDate": "2026-07-25",
  "earnedPoint": 1 }
  ]
  }
- nó sẽ cho biết những ngày mà user hiện tại đã điểm danh
- Nhiệm vụ của bạn là những ngày nào đã điểm danh thì đánh dấu tích, những ngày miss điểm danh thì cho nó mờ mờ
- 