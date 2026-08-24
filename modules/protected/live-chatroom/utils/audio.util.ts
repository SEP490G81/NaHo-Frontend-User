/**
 * Chuyển chuỗi Base64 audio thành Blob URL có thể phát qua HTML Audio.
 */
export function base64ToAudioUrl(base64Data: string): string {
    if (!base64Data) return "";
    if (
        base64Data.startsWith("http://") ||
        base64Data.startsWith("https://") ||
        base64Data.startsWith("blob:") ||
        base64Data.startsWith("data:audio")
    ) {
        return base64Data;
    }

    try {
        // Tự động nhận diện định dạng cơ bản hoặc mặc định audio/mp3
        let mimeType = "audio/mp3";
        if (base64Data.startsWith("UklGR")) {
            mimeType = "audio/wav";
        } else if (base64Data.startsWith("T2dnUw")) {
            mimeType = "audio/ogg";
        } else if (base64Data.startsWith("AAAAF")) {
            mimeType = "audio/mp4";
        }

        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });
        return URL.createObjectURL(blob);
    } catch {
        return `data:audio/mp3;base64,${base64Data}`;
    }
}

/**
 * Định dạng số giây thành chuỗi mm:ss
 */
export function formatAudioTime(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
