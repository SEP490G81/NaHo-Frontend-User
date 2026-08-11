### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi cần bạn làm cho tôi chức năng cập nhật thông tin người dùng ở:
  `modules/protected/settings/features/account.settings.tsx`
- Trước tiên phải hiện thị thông tin của người dùng đang đăng nhập lên các ô input ở đó trước.
- Sau đó khi người dùng ấn cập nhật thì trước hết hãy validate ở frontend bằng <TextField> của MUI, nó có cái
  helpertext, tham khảo ở `modules/public/login/components/login.form.text.fields.tsx`, bạn cần validate những cái sau:

+ nếu người dùng nhập username:

```
    public static final int MAX_LENGTH = 36;
    private static final int MIN_LENGTH = 4;
    private static final Pattern USERNAME_PATTERN =
            Pattern.compile("^[a-z][a-z0-9]*$");
```

+ gender thì chỉ được chọn MALE hoặc FEMALE, nếu lúc tạo tài khoản họ chưa có thì cứ để rỗng.
+ tuổi thì phải thỏa mãn trong khoảng:

```
    private static final int MIN_AGE = 8;
    private static final int MAX_AGE = 65;
```

- Request xuống backend phải kèm theo JWT token, và sẽ có dạng:

```
public record UpdateUserInfoRequest(
        String username,
        String fullName,
        Gender gender,
        LocalDate dob
) {
}
```

- Resposne sẽ là:

```
public record UserResponse(
        Long id,
        List<AuthProviderResponse> authProviders,

        Long userLearningProgressId,
        String avatarUrl,

        String username,
        String email,
        String fullName,
        Gender gender,
        LocalDate dob,
        JLPTLevel jlptLevel
) {
}
```

- Trong trường hợp lỗi trùng username thì sẽ có response là 1 problem detail như sau:

```
{
    "type": "https://api.v1.naho/errors/user_a006",
    "title": "Người dùng đã tồn tại!",
    "status": 409,
    "detail": "Tên tài khoản bronze_learner_1 đã được sử dụng!",
    "instance": "/api/v1/users/info",
    "errorCode": "USER_A006",
    "traceId": "37beaa45-7371-47a9-8230-81f8e3589502",
    "timestamp": "2026-08-08T13:02:01.237933300Z"
}
```

- Backend API là: http://localhost:8386/api/v1/users/info và method là PATCH, nếu thành công mã sẽ là 200, có dạng như
  sau:

```
{
    "meta": {
        "traceId": "4f06b2e9-7e29-48e6-a059-61e6645dc50d",
        "timestamp": "2026-08-08T13:04:34.686362Z",
        "pageMeta": null
    },
    "message": "Cập nhật thông tin người dùng thành công!",
    "data": {
        "id": 1,
        "authProviders": [
            {
                "id": 1,
                "providerName": "GOOGLE",
                "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocIZQdA74gqf3eMs7dlt9f-6DWagGGDio8NHYrAE2dIbIbUlubc=s96-c"
            }
        ],
        "userLearningProgressId": 101,
        "avatarUrl": "https://naho-private-bucket.s3.ap-southeast-1.amazonaws.com/avatars/afc64ce7-3200-401b-b0ce-b7c693cad1db_1786188438950.jpeg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkcwRQIgX6%2BJq0VzxevuN2r3JcosixCFwd2iS%2FnxIRfr2USCg98CIQCAozoGZ1cKZM5zhMqVZc9kNNEQ8UiKJoybY3swPsO72irvAQhqEAAaDDY5NDU1OTA5NTkzMiIMDHNLOdmUZqG3N9jBKswBiwbYe2YXJmtxf9neW621PYzh60LypADxLa91%2BwpJCldvEwAnPo754QtKYdiswVstkV7PpHzXhB9CwvLPwDMpi65aKDkTntG25DXk%2FP89Wx6cRn6nN9QdL3IVNWg7SKyird7rlh4%2B%2Fhkvc6pa3td09hnhY%2FM%2B79s12bqF7zoA431p281QynjT9nycL88odehtBO14Ok2Zdchxxt4uNaf6cesnbY1xMdniFg7WCEO%2FXKnN53%2FRQyNZ4wU4Y%2BjHAJiLdPQeSRRPMVl3uET%2FMMfa29MGOpgBST4qh%2FpPWu5oWhLEZz5aSDcgJ3cAW8AaYfK3qxlTZG549sxlTTXYmMsvFbagEV89nKD%2B9TGUzM62HeggaDnfD49dagc8DoenbAPay%2FyrMWez6SLizN3OG2pwgk7%2BTP0qcCsL2BhCCebwhYou99BCaM2lpRLonY6cRe37j%2Fr3v0qKo1hXFHxYxQ020PrJUZ1tp%2BiP08ZpXoY%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260808T130434Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIA2DNXSXR6A4JZ3XMB%2F20260808%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Expires=300&X-Amz-Signature=33200c5d394d5c3513ae218d04f8b66875bbefb0676db7715cc239956942ea3e",
        "username": "vuongtruc",
        "email": "vuongtrucwork2004@gmail.com",
        "fullName": "Nguyen Vuong Truc",
        "gender": "MALE",
        "dob": "2004-05-20",
        "jlptLevel": "N5"
    }
}
```

- Tôi muốn khi ấn nút cập nhật thì phải có hiệu ứng loading và sau khi cập nhật thành công thì sẽ làm mới được thông tin
  của người dùng hiện tại luôn.

### Yêu cầu

- Thiết kế giao diện sao cho dễ nhìn và dễ dùng, phong cách hiện đại (tham khảo các hình ảnh ở: `docs/settings/images`)
- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`
- Giao diện sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `styles/globals.css`