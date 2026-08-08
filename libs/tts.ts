/**
 * Phát âm tiếng Nhật bằng Web Speech API (không cần BE). Trả về true nếu trình
 * duyệt hỗ trợ và đã bắt đầu đọc, false nếu không hỗ trợ.
 */
export function speakJa(text: string): boolean {
    if (typeof window === "undefined" || !window.speechSynthesis) return false;
    if (!text.trim()) return false;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    return true;
}

/** Dừng mọi phát âm đang chạy. */
export function stopSpeaking(): void {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
}

/** Trình duyệt có hỗ trợ đọc thành tiếng không. */
export function isSpeechSupported(): boolean {
    return typeof window !== "undefined" && !!window.speechSynthesis;
}
