"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Ghi âm thật bằng MediaRecorder + tự dừng khi im lặng ~2.5s.
 * Khi dừng (và có tiếng), trả Blob audio về callback để upload lên BE.
 */
export function useAudioRecorder(onRecordComplete: (blob: Blob) => void) {
    const [isRecording, setIsRecording] = useState(false);
    const [micStream, setMicStream] = useState<MediaStream | null>(null);

    const audioContextRef = useRef<AudioContext | null>(null);
    const checkSilenceLoopRef = useRef<number | null>(null);
    const silenceStartRef = useRef<number | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const shouldSendRef = useRef<boolean>(true);

    const pickMimeType = (): string => {
        const candidates = [
            "audio/webm;codecs=opus",
            "audio/webm",
            "audio/ogg;codecs=opus",
            "audio/mp4",
        ];
        return (
            candidates.find(
                (m) =>
                    typeof MediaRecorder !== "undefined" &&
                    MediaRecorder.isTypeSupported(m),
            ) ?? ""
        );
    };

    const cleanup = () => {
        if (checkSilenceLoopRef.current) {
            cancelAnimationFrame(checkSilenceLoopRef.current);
            checkSilenceLoopRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close().catch(() => {});
            audioContextRef.current = null;
        }
        const activeStream = streamRef.current || micStream;
        if (activeStream) {
            activeStream.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setMicStream(null);
        setIsRecording(false);
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            streamRef.current = stream;
            setMicStream(stream);
            setIsRecording(true);
            shouldSendRef.current = true;

            const mimeType = pickMimeType();
            const recorder = new MediaRecorder(
                stream,
                mimeType ? { mimeType } : undefined,
            );
            recorderRef.current = recorder;
            chunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };
            recorder.onstop = () => {
                const type = recorder.mimeType || "audio/webm";
                const blob = new Blob(chunksRef.current, { type });
                cleanup();
                if (shouldSendRef.current && blob.size > 0) {
                    onRecordComplete(blob);
                }
            };
            recorder.start();

            // Phân tích âm lượng để phát hiện im lặng.
            const AudioCtxClass =
                window.AudioContext ||
                (
                    window as unknown as {
                        webkitAudioContext: typeof AudioContext;
                    }
                ).webkitAudioContext;
            const audioCtx = new AudioCtxClass();
            audioContextRef.current = audioCtx;

            const source = audioCtx.createMediaStreamSource(stream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 64;
            source.connect(analyser);

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            silenceStartRef.current = null;

            const checkVolume = () => {
                if (!streamRef.current) return;
                analyser.getByteFrequencyData(dataArray);

                let sum = 0;
                for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
                const average = sum / bufferLength;

                const threshold = 15;
                if (average < threshold) {
                    if (silenceStartRef.current === null) {
                        silenceStartRef.current = Date.now();
                    } else if (
                        (Date.now() - silenceStartRef.current) / 1000 >=
                        2.5
                    ) {
                        stopRecording(true);
                        return;
                    }
                } else {
                    silenceStartRef.current = null;
                }

                checkSilenceLoopRef.current =
                    requestAnimationFrame(checkVolume);
            };
            checkSilenceLoopRef.current = requestAnimationFrame(checkVolume);
        } catch (err) {
            console.error("Microphone access error:", err);
            cleanup();
        }
    };

    const stopRecording = (shouldSend = true) => {
        shouldSendRef.current = shouldSend;
        if (checkSilenceLoopRef.current) {
            cancelAnimationFrame(checkSilenceLoopRef.current);
            checkSilenceLoopRef.current = null;
        }
        const recorder = recorderRef.current;
        if (recorder && recorder.state !== "inactive") {
            recorder.stop();
        } else {
            cleanup();
        }
    };

    const cancelRecording = () => stopRecording(false);

    useEffect(() => {
        return () => {
            if (checkSilenceLoopRef.current) {
                cancelAnimationFrame(checkSilenceLoopRef.current);
            }
            if (audioContextRef.current) {
                audioContextRef.current.close().catch(() => {});
            }
        };
    }, []);

    return {
        isRecording,
        micStream,
        startRecording,
        stopRecording: () => stopRecording(true),
        cancelRecording,
    };
}

export default useAudioRecorder;
