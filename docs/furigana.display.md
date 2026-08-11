### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi đã có 1 button để bật/tắt furigana cho các trang trong `(protected)`. Tôi muốn khi bật furigana thì sẽ sử dụng
  thuộc tính có furigana cho 1 vài response type có furigana, còn nếu tắt thì sẽ sử dụng thuộc tính text.
- Cụ thể như sau:

+ Với các kiểu dữ liệu: `types\responses\book.response.ts` và `SpeakingQuestionDetailResponse` đều có 2 thuộc tính là
  `japaneseName` và
  `japaneseNameMarkup`, tương tự với description.
+ Thuộc tính markup sẽ có dạng là html như sau:
  `<p><ruby>家族<rt>かぞく</rt></ruby>は３<ruby>人<rt>にん</rt></ruby>です</p>`, vì vậy, nếu như furigana được bật thì
  bạn sẽ sử dụng các thuộc tính markup thay vì thuộc tính thông thường và ngược lại.

- Bạn hãy xóa các chỗ hiển thị furigana khác đi và tạm thời chỉ hiển những cho mà dùng các kiểu dữ liệu như trên thôi.
- Tôi nghĩ không cần dùng tới FuriganaMarkup và các types/components liên quan nữa, giờ chỉ đơn giản là chuyển đổi giữa
  2 thuộc tính mà backend trả ra, bạn hãy sửa lại cho tôi.

### Yêu cầu

- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`
- Giao diện sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `styles/globals.css`