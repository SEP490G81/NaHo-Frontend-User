"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useAudioRecorder(maxDurationSeconds: number = 30) {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(maxDurationSeconds);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const stopRecording = useCallback(() => {
        clearTimer();
        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state !== "inactive"
        ) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    }, [clearTimer]);

    const startRecording = useCallback(async () => {
        try {
            clearTimer();
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunksRef.current, {
                    type: "audio/webm",
                });
                const url = URL.createObjectURL(blob);
                setAudioBlob(blob);
                setAudioUrl(url);
                stream.getTracks().forEach((track) => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setTimeLeft(maxDurationSeconds);

            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        stopRecording();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error) {
            console.error("Audio recording error:", error);
        }
    }, [maxDurationSeconds, clearTimer, stopRecording]);

    const clearRecording = useCallback(() => {
        clearTimer();
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }
        setAudioBlob(null);
        setAudioUrl(null);
        setTimeLeft(maxDurationSeconds);
    }, [audioUrl, maxDurationSeconds, clearTimer]);

    useEffect(() => {
        return () => {
            clearTimer();
        };
    }, [clearTimer]);

    return {
        isRecording,
        audioBlob,
        audioUrl,
        timeLeft,
        maxDurationSeconds,
        startRecording,
        stopRecording,
        clearRecording,
    };
}
