### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Nhiệm vụ của bạn

- Tôi đang làm chức năng điểm danh hàng ngày để nhận điểm cho người dùng.
- Trên thanh header của giao diện sẽ có 1 nút ấn vào để điểm danh.
- Khi ấn vào đó, sẽ hiện ra popup là lịch các ngày trong tháng này.
- Mỗi ngày sẽ có 1 hiển thị khác nhau tùy theo loại rương của ngày đó.
- Khi hover vào ngày nào đó thì nó sẽ hiện ra chi tiết phần thưởng có thể nhận ở hôm đó.
- Bạn hãy hoàn thiện cho tôi file `layouts/protected-header/components/daily.reward.calendar.tsx`,
  `layouts/protected-header/components/daily.reward.item.tsx`, `components/ui/chests/**`

### Gợi ý

- Các file trong thư mục `components/ui/chests/**` là icon của các loại rương ứng với type (dùng để hiển thị trong từng
  ngày):

+ NONE: là chỉ hiện point chứ không có rương bao bọc
+ BRONZE: rương đồng
+ SILVER: rương bạc
+ GOLD: rương vàng

- File `layouts/protected-header/components/daily.reward.calendar.tsx` là hiện lên popup để show lên lịch và các ngày
  trong tháng này để người dùng đăng nhập.
- File `layouts/protected-header/components/daily.reward.item.tsx` là từng ngày trong cái lịch đó, từng ngày này sẽ có
  thể hover và hiện thông tin chi tiết của phần quà hôm đó. Ngoài ra nó cũng phải hiện ngày đó là ngày nào.
- Ngày nào chưa tới thì bạn để là khóa, ngày nào đang hiện tại thì làm nó nổi bật hơn. Còn ngày đã nhận thì tạm thời
  chưa cần làm vì nó còn liên quan tới API của tôi.
- File `services/client/daily.reward.service.ts` chứa hàm gọi API từ backend, nó sẽ trả ra kết quả như sau nếu thành
  công:
  [
  {
  "id": 1,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 1
  },
  {
  "id": 2,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 2
  },
  {
  "id": 3,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 3
  },
  {
  "id": 4,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 4
  },
  {
  "id": 5,
  "chest": {
  "id": 2,
  "chestType": "BRONZE",
  "description": "Mở rương đồng để nhận ngẫu nhiên từ 10 đến 20 điểm",
  "minPoint": 15,
  "maxPoint": 25
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 5
  },
  {
  "id": 6,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 6
  },
  {
  "id": 7,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 7
  },
  {
  "id": 8,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 8
  },
  {
  "id": 9,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 9
  },
  {
  "id": 10,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 10
  },
  {
  "id": 11,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 11
  },
  {
  "id": 12,
  "chest": {
  "id": 2,
  "chestType": "BRONZE",
  "description": "Mở rương đồng để nhận ngẫu nhiên từ 10 đến 20 điểm",
  "minPoint": 15,
  "maxPoint": 25
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 12
  },
  {
  "id": 13,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 13
  },
  {
  "id": 14,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 14
  },
  {
  "id": 15,
  "chest": {
  "id": 3,
  "chestType": "SLIVER",
  "description": "Mở rương bạc để nhận ngẫu nhiên từ 25 đến 50 điểm",
  "minPoint": 30,
  "maxPoint": 50
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 15
  },
  {
  "id": 16,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 16
  },
  {
  "id": 17,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 17
  },
  {
  "id": 18,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 18
  },
  {
  "id": 19,
  "chest": {
  "id": 2,
  "chestType": "BRONZE",
  "description": "Mở rương đồng để nhận ngẫu nhiên từ 10 đến 20 điểm",
  "minPoint": 15,
  "maxPoint": 25
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 19
  },
  {
  "id": 20,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 20
  },
  {
  "id": 21,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 21
  },
  {
  "id": 22,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 22
  },
  {
  "id": 23,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 23
  },
  {
  "id": 24,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 24
  },
  {
  "id": 25,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 25
  },
  {
  "id": 26,
  "chest": {
  "id": 2,
  "chestType": "BRONZE",
  "description": "Mở rương đồng để nhận ngẫu nhiên từ 10 đến 20 điểm",
  "minPoint": 15,
  "maxPoint": 25
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 26
  },
  {
  "id": 27,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 27
  },
  {
  "id": 28,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 28
  },
  {
  "id": 29,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 29
  },
  {
  "id": 30,
  "chest": {
  "id": 1,
  "chestType": "NONE",
  "description": "Nhận ngay 5 điểm mà không cần mở rương",
  "minPoint": 1,
  "maxPoint": 10
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 30
  },
  {
  "id": 31,
  "chest": {
  "id": 4,
  "chestType": "GOLD",
  "description": "Mở rương vàng để nhận ngẫu nhiên từ 60 đến 100 điểm",
  "minPoint": 60,
  "maxPoint": 100
  },
  "rewardYearMonth": "2026-07",
  "dayOfMonth": 31
  }
  ]

### Yêu cầu

- Bạn phải sử dùng dữ liệu từ backend trả ra để làm giao diện các ngày.
- Hiện tại các ngày trên lịch chưa cần làm chức năng ấn vào.
- Hoàn thiện cho tôi giao diện sao cho phù hợp với tông màu của dự án hiện tái.
- UI/UX đáp ứng được sự khắt khe của các khách hàng Nhật Bản.
- Bố trí phù hợp.
- Có loading nếu dữ liệu chưa được load/gửi xong.