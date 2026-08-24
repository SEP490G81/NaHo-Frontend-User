### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Input

- Backend API: `startConversation`

+ URL: http://localhost:8386/api/v1/speaking/session/start
+ Method: POST
+ Request Body:

```
public record StartConversationRequest(
        Long personaId,
        FormalityLevel formalityLevel,
        MarugotoLevel marugotoLevel
) {
}
```

+ Response: String (session code)

- Backend API: `initFirstGreeting`

+ URL: http://localhost:8386/api/v1/speaking/session/init/{sessionCode}
+ Method: POST
+ Request Body:

```
public record StartConversationRequest(
        Long personaId,
        FormalityLevel formalityLevel,
        MarugotoLevel marugotoLevel
) {
}
```

+ Response: ApiResponse<StartConversationResponse>

```
public record StartConversationResponse(
        String sessionCode,
        String audioBase64,
        String content,
        String contentTranslation,
        String grammarNote
) {
}
```

- Backend API: `getInProgressSessionDetails`

+ URL: http://localhost:8386/api/v1/speaking/session/{sessionCode}
+ Method: GET
+ Response: ApiResponse<SpeakingSessionResponse>

```
public record SpeakingSessionResponse(
        Long id,
        String sessionCode,
        Long userId,
        Long personaId,

        String topic,
        String voiceName,
        MarugotoLevel marugotoLevel,
        FormalityLevel formalityLevel,
        Integer durationSeconds,
        int totalTurns,
        Double asrConfidence,
        SpeakingSessionStatus status,
        Instant startedAt,
        Instant endedAt,

        SpeakingSessionAssessmentResponse speakingSessionAssessment,
        List<SpeakingSessionMessageResponse> speakingSessionMessages
) {
}


public record SpeakingSessionAssessmentResponse(
        Long id,
        Long speakingSessionId,

        int overallScore,
        String jlptEstimate,
        int fluencyScore,
        int pronunciationScore,
        int grammarScore,
        int vocabularyScore,
        int interactionScore,
        int naturalnessScore,
        int coherenceScore,

        String summary,
        String strengths,
        String weaknesses,

        String feedbackFluency,
        String feedbackPronunciation,
        String feedbackGrammar,
        String feedbackVocabulary,
        String feedbackInteraction,
        String feedbackNaturalness,
        String feedbackCoherence,

        String studyFocusArea,
        String studyRecommendation,
        String studyEncouragement,

        List<SpeakingImprovedExpressionResponse> speakingImprovedExpressions
) {
}


public record SpeakingSessionAssessmentResponse(
        Long id,
        Long speakingSessionId,

        int overallScore,
        String jlptEstimate,
        int fluencyScore,
        int pronunciationScore,
        int grammarScore,
        int vocabularyScore,
        int interactionScore,
        int naturalnessScore,
        int coherenceScore,

        String summary,
        String strengths,
        String weaknesses,

        String feedbackFluency,
        String feedbackPronunciation,
        String feedbackGrammar,
        String feedbackVocabulary,
        String feedbackInteraction,
        String feedbackNaturalness,
        String feedbackCoherence,

        String studyFocusArea,
        String studyRecommendation,
        String studyEncouragement,

        List<SpeakingImprovedExpressionResponse> speakingImprovedExpressions
) {
}

public record SpeakingImprovedExpressionResponse(
        Long id,
        Long speakingSessionAssessmentId,
        Integer turnIndex,
        String originalText,
        String improvedText,
        String explanationVietnamese
) {
}
```

### Mô tả bài toán

- Khi người dùng bấm vào bắt đầu trò chuyện ở `modules/protected/persona-setup/components/persona.summary.card.tsx` thì
  sẽ gọi API: `startConversation`
- Sau đó sẽ có hiệu ứng loading, sau khi gọi API thành công thì sẽ nhận được session code, rồi router người dùng tới
  trang `live-chatroom/sessionCode`
- Ở trang `live-chatroom/sessionCode` sẽ phải gọi API: `getInProgressSessionDetails`, nếu mã lỗi là `LLM_A005` thì sẽ
  hiện lên nút sẵn sàng, khi ấn vào nút đó sẽ gọi API `initFirstGreeting` ở phía nextjs server, sau đó bạn sẽ nhận được
  response, nó dùng để:

+ Hiển thị ra lời chào của AI (phía bên trái đoạn chat)
+ Tôi cần bạn tạo ra 1 component để hiển thị các audio base 64 ví dụ như `audioBase64` trong response. Componet đó sẽ có
  nút pause/play, thanh chạy để tua file âm thanh.
+ Ở trên cái audio thì nên có 1 cái để hiện bản script, ví dụ như `content`
+ Ở dưới mỗi câu reply của AI tôi cần 2 nút là bản dịch và ngữ pháp, ấn vào bản dịch thì sẽ hiển thị thuộc tính
  `contentTranslation`, còn ấn vào ngữ pháp thì hiển thị `grammarNote`

- Ở trong trang đó tôi cũng cần sử dụng tới react context mà đang lưu các select persona, marugoto level, speed,... để
  hiển thị ở bên trái ô chat. Người dùng có thể điều chỉnh tốc độ nói ở đây luôn, và cũng như là hiển thị lên thông tin
  persona. Còn nút switch button thì sẽ cập nhật sau.

> Chỉ cần làm những gì tôi yêu cầu, các cái khác sẽ tính sau.

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