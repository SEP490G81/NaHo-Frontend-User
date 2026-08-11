### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Trước tiên tôi muốn bạn sửa lại: `layouts/protected-header`, hãy xóa các nút

```
                <LanguageSwitch
                    variant="icon-button"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                />
                <ThemeSwitchButton />
```

xóa luôn các components trên đi rồi sau đó thêm nút có giao diện tương tự vào (nút này khi ấn vào sẽ ra trang settings).

- `layouts/sidebar` xóa mục settings khỏi User menu account

### Yêu cầu

- Thiết kế giao diện sao cho dễ nhìn và dễ dùng, phong cách hiện đại (tham khảo các hình ảnh ở: `docs/settings/images`)
- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`
- Giao diện sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `styles/globals.css`