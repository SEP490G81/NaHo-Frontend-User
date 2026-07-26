"use client";
import { useEffect, useRef, useState } from "react";
import { MOCK_STT_INPUT } from "../constants/live-chatroom.constant";

export function useAudioRecorder(onRecordComplete: (text: string) => void) {
    const [isRecording, setIsRecording] = useState(false);
    const [micStream, setMicStream] = useState<MediaStream | null>(null);

    const audioContextRef = useRef<AudioContext | null>(null);
    const checkSilenceLoopRef = useRef<number | null>(null);
    const silenceStartRef = useRef<number | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            streamRef.current = stream;
            setMicStream(stream);
            setIsRecording(true);

            const AudioCtxClass =
                window.AudioContext || (window as any).webkitAudioContext;
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
                for (let i = 0; i < bufferLength; i++) {
                    sum += dataArray[i];
                }
                const average = sum / bufferLength;

                // Threshold below which is considered silent. Value 15 is typical for quiet environments
                const threshold = 15;
                if (average < threshold) {
                    if (silenceStartRef.current === null) {
                        silenceStartRef.current = Date.now();
                    } else {
                        const durationSec =
                            (Date.now() - silenceStartRef.current) / 1000;
                        if (durationSec >= 2.5) {
                            // Silence detected! Stop recording and trigger STT send
                            stopRecording(true);
                            return;
                        }
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
            setIsRecording(false);
            setMicStream(null);
        }
    };

    const stopRecording = (shouldSend = true) => {
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

        if (shouldSend) {
            onRecordComplete(MOCK_STT_INPUT);
        }
    };

    const cancelRecording = () => {
        stopRecording(false);
    };

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
