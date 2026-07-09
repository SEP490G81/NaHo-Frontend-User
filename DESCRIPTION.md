# Mô tả dự án

## /app

### /app/[locale]

- Tôi đang sử dụng next-intl để xử lí đa ngôn ngữ
- Trong folder [locale] có 1 trang layout.tsx và page.tsx tổng, trang page.tsx này sẽ có nhiệm vụ điều hướng người dùng
  sang các trang tương ứng dựa trên trạng thái đăng nhập khi họ truy cập vào đường dẫn root
- thư mục (auth) sẽ chứa các trang liên quan tới authentication như login, register, đổi password, và nó không yêu cầu
  đăng nhập để được truy cập
- thư mục (public) chứa home page, và các trang public khác (tức là không cần đăng nhập)
- thư mục (protected) chứa các trang chức năng chính của dự án, yêu cầu đăng nhập để truy cập

### /app/api

- Đây là phần sẽ xử lí gọi api của phía backend Spring Boot, khi user gọi API từ phía client, request sẽ được đi vào
  nextjs backend trước khi được gửi xuống Spring Boot backend để xử lí.

### /components

- Đây là nơi chứa UI components mà shared cho toàn dự án
- Ngoài ra nó còn chứa providers, tức là nơi chứa các context để bọc cho nhiều page trong dự án

### /constants

- Đây là nơi chứa các hằng số mà shared chung cho toàn dự án

### /hooks

- Đây là nơi chứa các custom hook dùng cho toàn dự án

### /i18n

- Đây là nơi chứa cấu hình cho next-intl
- Chứa các file messages.json
- Chứa các kiểu dữ liệu liên quan tới các đường dẫn của trang

### /layouts

- Đây là nơi chứa các layout components của dự án, ví dụ như sidebar, header, footer

### /libs

- Nơi chứa code các utils, cấu hình thư viện, các hàm logic để shared chung cho toàn dự án.

### /modules

- Modules tôi sẽ chia ra làm hai loại là protected và public
- Phần này tôi sẽ chia theo trang, tức là ví dụ có trang login thì sẽ có module là login
- Trong từng module, sẽ có các folder con sau:

+ actions: chứa các server action của module đó
+ components: chứa các UI components thuần của module đó
+ constants: chứa các hằng số được sử dụng cho module đó
+ features: chứa các UI components nhưng có tác động tới service, api
+ types: chứa các kiểu dữ liệu sử dụng cho UI dùng cho module đó
+ utils: chứa các hàm sử dụng cho module đó

### /public

- Chứa logo của dự án, empty.svg là 1 cái hình hộp rỗng, sử dụng để render giao diện khi gọi API mà không có kết quả nào
  trả về

### /services

- Tôi đang tách ra làm 2 loại services:

+ client: tức là các services mà được client component sử dụng, chúng sẽ gọi tới backend của nextjs rồi mới được request
  sang backend của Spring Boot
+ server: tức là các services được gọi từ server component, gọi thẳng tới backend Spring Boot thay vì phải đi qua
  backend nextjs

### /styles

- Chứa các style chung của dự án, như file global.css, mui theme, font

### /types

- Chứa type share chung cho toàn dự án
- Ngoài ra còn chứa các DTOs

### proxy.ts

- Là lớp middleware được sử dụng trong dự án
- Chức năng của nó sẽ liên quan tới việc check các access token, refresh token trước các request, nếu access token hết
  hạn nó sẽ gọi api để rotate token
- Chức cấu hình cho next-intl