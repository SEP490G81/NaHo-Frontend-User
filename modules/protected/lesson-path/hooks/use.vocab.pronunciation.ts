"use client";
import { useCallback, useRef, useState } from "react";
import { blobToWav } from "@/modules/protected/sandbox/utils/wav.encoder";
import { assessPronunciation } from "@/services/client/speaking.service";
import { PASS_SCORE } from "@/store/marugotoStore";

export type VocabRecordStatus =
    | "idle"
    | "recording"
    | "scoring"
    | "scored"
    | "error";

/**
 * Ghi âm + chấm điểm phát âm 1 từ vựng (POST /speaking/assessment, không gắn
 * câu hỏi nói cụ thể). Điểm trả về thang 0-10 — dùng chung ngưỡng PASS_SCORE
 * với luyện nói câu hỏi để nhất quán toàn app.
 */
export function useVocabPronunciation() {
    const [status, setStatus] = useState<VocabRecordStatus>("idle");
    const [score, setScore] = useState<number | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const passed = score != null && score >= PASS_SCORE;

    const reset = useCallback(() => {
        setStatus("idle");
        setScore(null);
    }, []);

    const submitRecording = async (raw: Blob, referenceText: string) => {
        setStatus("scoring");
        try {
            const wav = await blobToWav(raw).catch(() => raw);
            const result = await assessPronunciation(wav, referenceText);
            setScore(result.averageScore ?? 0);
            setStatus("scored");
        } catch (err) {
            console.error("Lỗi chấm phát âm từ vựng:", err);
            setStatus("error");
        }
    };

    const startRecording = async (referenceText: string) => {
        setScore(null);
        setStatus("recording");
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            const chunks: Blob[] = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };
            mediaRecorder.onstop = () => {
                stream.getTracks().forEach((t) => t.stop());
                const raw = new Blob(chunks, {
                    type: mediaRecorder.mimeType || "audio/webm",
                });
                void submitRecording(raw, referenceText);
            };

            mediaRecorder.start();
        } catch (err) {
            console.error("Không truy cập được microphone:", err);
            setStatus("error");
        }
    };

    const stopRecording = () => {
        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state !== "inactive"
        ) {
            mediaRecorderRef.current.stop();
        }
    };

    return {
        status,
        score,
        passed,
        startRecording,
        stopRecording,
        reset,
    };
}
