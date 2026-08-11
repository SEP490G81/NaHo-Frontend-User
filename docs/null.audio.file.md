### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi mới sửa file `types\responses\speaking.response.ts`, ở 2 cái response là `SpeakingHistoryListItem` và
  `SpeakingHistoryDetailResponse` thì tôi đã sửa thuộc tính `audioUrl` thành có thể null.
- Vì vậy ở những chỗ mà có sử dụng `audioUrl` đó, tôi muốn làm như sau:

+ Nếu như `audioUrl` là null thì sẽ hiện lên 1 cái icon
  `import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';` của MUI màu đỏ, icon đó sẽ được bọc bởi
  `components/ui/mui-custom/tooltip.custom.tsx` và nội dung khi hover vào đại khái sẽ kiểu như "file upload thất bại, sẽ
  được upload lại sau"
+ Nếu như `audioUrl` khác null thì sẽ để như hiện tại (nhưng nút play hãy thêm cho tôi cursor-pointer)

### Yêu cầu

- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`
- Giao diện sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `styles/globals.css`