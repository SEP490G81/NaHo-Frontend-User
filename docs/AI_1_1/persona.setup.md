### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Input

- Backend API: `getAllPersonas`

+ URL: `http://localhost:8386/api/v1/personas`
+ Method: GET
+ Response: ApiResponse<PersonaResponse[]>

```
public record PersonaResponse(
        Long id,
        String name,
        String prompt,
        FileResponse avatarFile,
        MarugotoLevel defaultMarugotoLevel,
        FormalityLevel defaultFormalityLevel,
        PersonaStatus status,
        String voiceName,
        Gender gender
) {
}

public enum FormalityLevel {
    INFORMAL, // Thể thông thường / Suồng sã (Tameguchi)
    NEUTRAL,  // Thể lịch sự tiêu chuẩn (Desu / Masu)
    FORMAL    // Thể trang trọng / Kính ngữ (Keigo / Kenjougo / Sonkeigo)
}

public enum PersonaStatus {
    ACTIVE, UNACTIVE
}

public enum MarugotoLevel {
    STARTER_A1,             // Marugoto Nhập môn (A1)
    ELEMENTARY_1_A2,        // Marugoto Sơ cấp 1 (A2.1)
    ELEMENTARY_2_A2,        // Marugoto Sơ cấp 2 (A2.2)
    PRE_INTERMEDIATE_A2_B1, // Marugoto Tiền trung cấp (A2/B1)
    INTERMEDIATE_1_B1,      // Marugoto Trung cấp 1 (B1.1)
    INTERMEDIATE_2_B1       // Marugoto Trung cấp 2 (B1.2)
}
```

### Mô tả bài toán

- Tôi muốn bạn hoàn thiện cho tôi page `app/[locale]/(chatroom)/persona-setup/page.tsx`
- Gọi API lấy toàn bộ personas ở phía server side, sau đó truyền props.
- Hiển thị ra 1 list các persona dưới dạng grid, gồm các thông tin đầy đủ như sau:

+ name
+ prompt
+ avatar (nếu avatar rỗng thì lấy chữ cái đầu của tên để làm avatar)
+ giới tính (sử dụng mũi tên để mô tả giới tính nam và nữ)
+ voice name

- Có thêm 2 select option để chọn marugotoLevel và formalityLevel, giá trị default của chúng chính là thuộc tính
  `defaultMarugotoLevel` và `defaultFormalityLevel`
- Ngoài ra có thêm 1 thanh trượt để điều chỉnh tốc độ nói của AI (sẽ dùng tới sau)
- Còn có thêm 1 switch button để bật tắt trạng thái hiển câu trả lời mẫu hoặc không
- Các field này tôi muốn bạn sử dụng react context để store và share trong toàn bộ layout của `app/[locale]/(chatroom)`
- Mỗi khi bấm select 1 persona trong list thì set state của persona trong react context thành persona mà mình đã chọn.
- Ngoài ra còn cần 1 bảng summary để tổng kết lại mình chọn persona nào, tốc độ nói, có hiển thị câu trả lời mẫu không.
  Và ở dưới cái summary đó có một nút bătgs đầu trò chuyện (sẽ xử lí sau)

### Yêu cầu

- Phân tách các module, các component, các hàm rõ ràng, dễ quản lí code, tránh code vào 1 file quá dài (1 file phải ít
  hơn 200 dòng).
- Đặt tên các file theo cú pháp "a.b.c[đuôi file]" và nhìn vào có thể biết luôn là file đó làm cái gì.
- Mỗi 1 module sẽ có chuẩn sau:

+ components: chứa các component không gọi API
+ features: chứa các component có tương tác, gọi tới API
+ constants: chứa các hằng số để sử dụng cho module đó
+ hooks: chứa các custom hook để sử dụng cho module đó
+ types: chứa các kiểu dữ liệu UI cho module đó (không phải dto)
+ providers: chứa các wrapper component, react context...
+ utils: chứa các helper, validator,... cho module đó

- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`,
  không nên truyền `t` làm tham số, chỗ nào cần thì bạn cứ khai báo ra là xong.
- Về phần style, hãy sử dụng tailwindcss và các component có sẵn của MUI và nên dùng các màu có sẵn của tôi trong file
  `styles/globals.css`
- Về phần gọi API ở backend thì phải thông qua `services`, nếu như là gọi từ phía client components thì phải gọi về
  backend của NextJS trước rồi NextJS server gọi backend thật. Nếu là gọi API từ phía server component thì có thể gọi
  trực tiếp backend thật.
- Về phần props, nếu truyền props >=3 component thì nên sử dụng react context. Các props mà chỉ đọc thì phải để thành
  `Readonly`