### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Yêu cầu

#### I. Sửa các file đang tồn tại

Tôi sẽ mô tả cho bạn các file mà tôi đang có:

1. `layouts/protected-header/components/daily.reward.calendar.tsx`

- Tôi muốn bạn sửa lại cho tôi phần header của cái lịch sao cho đẹp hơn, nhưng nội dung thì chỉ được phép bao gồm
  `Lịch Điểm Danh Hàng Ngày` và close button, tháng và năm hiện tại.
- Thanh hiển thị các thứ trong tuần phải cách header 1 đoạn cho cân đối.
- Chỉ sử dụng dữ liệu được trả về từ API, loại bỏ những đoạn code không cần thiết.

2. `layouts/protected-header/components/daily.reward.item.tsx`

- Tôi không muốn hiện chi tiết khi hover vào từng ngày. Thay vào đó, tôi muốn có 1 cái kiểu chữ i nhỏ nhỏ ở góc trên bên
  phải khối, khi ấn vào thì sẽ hiện ra chi tiết thông tin của phần quà ngày hôm đó. Thông tin bao gồm:

+ Phần thưởng dự kiến ${min} ~ ${max}
