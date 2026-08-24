### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Input

- Enum: `SpeakingSessionStatus`
- Backend API: `findAllByUserIdAndSpeakingSessionStatus`

* URL: `http://localhost:8386/api/v1/speaking/session/all?status=${SpeakingSessionStatus}`
* Method: GET
* Response: ApiResponse<List<SpeakingSessionListItemResponse>>

- Backend API: `deleteSession`

* URL: `http://localhost:8386/api/v1/speaking/session/${sessionCode}`
* Method: DELETE
* Response: ApiResponse<Void>

- File: `layouts/chat-sidebar/components/chat.sidebar.tsx`
- Folder: `app/[locale]/(chatroom)`
- Images: `docs/assets`

### Mô tả bài toán

- Tôi muốn gọi API list ở `app/[locale]/(chatroom)/layout.tsx` sau đó truyền props vào component chat sidebar để hiển
  thị.
- Tôi muốn hiển thị lên trên sidebar của chat layout như sau:

* Có button `Đoạn chat mới` để khi ấn vào thì sẽ vào trang `persona-setup` (nếu tôi đang ở trang `persona-setup` thì nó
  phải được active)
* Có 1 phần hiển thị các IN_PROGRESS sessions thông qua việc gọi API của backend và 1 phần hiển thị các COMPLETED
  sessions

- Các session hiển thị trên sidebar này sẽ cần các thông tin sau:

* Khi ấn vào các item session này thì sẽ truy cập vào trang `live-chatroom/{sessionCode}`
* Ở trang nào thì cũng cần có trạng thái active tương ứng cho session đó.
* Sidebar sẽ dùng chung trạng thái đóng/mở với `layouts/sidebar`

1. Khi sidebar ở trạng thái phóng to:

- Hiển thị các thông tin gồm: `voiceName` và `startedAt`
- Ở bên phải sẽ có nút ấn vào để delete session đó (bằng cách gọi service xóa), sau đó dùng refresh để load lại data

2. Khi sidebar ở trạng thái thu nhỏ:

- Hiển thị duy nhất phần tử cha gồm cái icon message
- Khi ấn vào thì hiện ra `Popover` chứa các sessions với đầy đủ thông tin như khi sidebar mở.

> Tham khảo ảnh trong [input] để hiểu rõ hơn.

### Yêu cầu

- Phân tách các module, các component, các hàm rõ ràng, dễ quản lí code, tránh code vào 1 file quá dài (1 file phải ít
  hơn 200 dòng).
- Đặt tên các file theo cú pháp "a.b.c[đuôi file]" và nhìn vào có thể biết luôn là file đó làm cái gì.
- Mỗi 1 module sẽ có chuẩn sau:

* components: chứa các component không gọi API
* features: chứa các component có tương tác, gọi tới API
* constants: chứa các hằng số để sử dụng cho module đó
* hooks: chứa các custom hook để sử dụng cho module đó
* types: chứa các kiểu dữ liệu UI cho module đó (không phải dto)
* providers: chứa các wrapper component, react context...
* utils: chứa các helper, validator,... cho module đó

- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`,
  không nên truyền `t` làm tham số, chỗ nào cần thì bạn cứ khai báo ra là xong.
- Về phần style, hãy sử dụng tailwindcss và các component có sẵn của MUI và nên dùng các màu có sẵn của tôi trong file
  `styles/globals.css`
- Về phần gọi API ở backend thì phải thông qua `services`, nếu như là gọi từ phía client components thì phải gọi về
  backend của NextJS trước rồi NextJS server gọi backend thật. Nếu là gọi API từ phía server component thì có thể gọi
  trực tiếp backend thật.
- Về phần props, nếu truyền props >=3 component thì nên sử dụng react context. Các props mà chỉ đọc thì phải để thành
  `Readonly`
