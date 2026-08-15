### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi có danh sách các API backend sau, nhiệm vụ của bạn là tạo kiểu dữ liệu và các services để thực hiện các API này.
- Hãy viết vào file `services/client/speaking.llm.service.ts`
- Các API đều bắt đầu với backend url + /api/v1
- Các response dưới đây trừ String thì đều được bọc bởi `ApiResponse<>`

1. /speaking/session/persona/{personaId}

- tên method:startConversation
- method POST
- truyền vào personaId ở path variable
- access token
- trả ra String là sessionCode.

2. /session/init/{sessionCode}

- tên method: initFirstGreeting
- method POST
- truyền vào sessionCode ở path variable
- có access token
- trả về kiểu:

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

3. /session/details/{sessionCode}

- tên method: getInProgressSessionDetails
- method: GetMapping
- truyền vào sessionCode ở path variable
- có access token
- trả về kiểu:

```
public enum FormalityLevel {
    INFORMAL, // Thể thông thường / Suồng sã (Tameguchi)
    NEUTRAL,  // Thể lịch sự tiêu chuẩn (Desu / Masu)
    FORMAL    // Thể trang trọng / Kính ngữ (Keigo / Kenjougo / Sonkeigo)
}

public enum SpeakingSessionStatus {
    IN_PROGRESS, COMPLETED
}

public enum MarugotoLevel {
    STARTER_A1,             // Marugoto Nhập môn (A1)
    ELEMENTARY_1_A2,        // Marugoto Sơ cấp 1 (A2.1)
    ELEMENTARY_2_A2,        // Marugoto Sơ cấp 2 (A2.2)
    PRE_INTERMEDIATE_A2_B1, // Marugoto Tiền trung cấp (A2/B1)
    INTERMEDIATE_1_B1,      // Marugoto Trung cấp 1 (B1.1)
    INTERMEDIATE_2_B1       // Marugoto Trung cấp 2 (B1.2)
}

public enum MessageType {
    AUDIO, TEXT
}
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
        String fullTranscript,
        SpeakingSessionStatus status,
        Instant startedAt,
        Instant endedAt,
        List<SpeakingSessionMessageResponse> messages
) {
}

public record SpeakingSessionMessageResponse(
        Long id,
        Long sessionId,
        Long audioFileId,
        int turnIndex,
        String senderType,
        MessageType messageType,
        String content,
        String contentTranslation,
        String correctedText,
        String correctionExplanation,
        String grammarNote,
        String hintForLearner,
        Double pronunciationScore,
        String aiReplyAudio,
        String userRecordAudio
) {
}
```

4. /session/message/{sessionCode}

- tên method: sendMessage
- method: POST
- có access token
- request có dạng:

```
public record ChatSessionMessageRequest(
        @NotBlank(message = LlmTitleMessageKey.LLM_TRANSCRIPT_BLANK_TITLE)
        String transcript
) {
}
```

- response có dạng:

```
public record ChatResponse(
        String assistantReply,
        String assistantReplyTranslation,
        String grammarExplanation,
        String correctedUserText,
        String correctionExplanation,
        String aiReplyAudio
) {
}
```

5. /session/audio/{sessionCode}

- tên method: sendAudioMessage
- method: POST
- có `@RequestPart("file") MultipartFile file`
- có `@RequestParam(value = "reference-text", required = false) String referenceText`
- có access token
- Response có dạng:

```
public record AudioChatResponse(
        String transcribedText,
        String assistantReply,
        String assistantReplyTranslation,
        String grammarExplanation,
        String correctedUserText,
        String correctionExplanation,
        String aiReplyAudio,
        Double accuracyScore,
        Double fluencyScore,
        Double completenessScore,
        Double pronunciationScore,
        List<String> suggestedReplies
) {
}
```

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