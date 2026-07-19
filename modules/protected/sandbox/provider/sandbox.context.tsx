"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { MicStatus, SandboxStep } from "../types/sandbox.type";
import { blobToWav } from "../utils/wav.encoder";

interface SandboxContextProps {
    step: SandboxStep;
    setStep: (step: SandboxStep) => void;
    micStatus: MicStatus;
    setMicStatus: (status: MicStatus) => void;
    volume: number;
    setVolume: (v: number) => void;
    recording: boolean;
    setRecording: (r: boolean) => void;
    elapsed: number;
    setElapsed: (sec: number) => void;
    playing: boolean;
    setPlaying: (p: boolean) => void;
    analyzing: boolean;
    setAnalyzing: (a: boolean) => void;
    startMicTest: () => void;
    resetMicTest: () => void;
    toggleRecord: () => void;
    retrySpeaking: () => void;
    audioUrl: string | null;
}

const SandboxContext = createContext<SandboxContextProps | undefined>(undefined);

export function SandboxProvider({ children }: { children: React.ReactNode }) {
    const [step, setStep] = useState<SandboxStep>(1);
    const [micStatus, setMicStatus] = useState<MicStatus>("idle");
    const [volume, setVolume] = useState(0);
    const [recording, setRecording] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const recordRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const micTestStreamRef = useRef<MediaStream | null>(null);
    const micTestContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        return () => {
            if (recordRef.current) clearInterval(recordRef.current);
            if (micTestStreamRef.current) {
                micTestStreamRef.current.getTracks().forEach((t) => t.stop());
            }
            if (micTestContextRef.current) {
                micTestContextRef.current.close();
            }
        };
    }, []);

    const startMicTest = async () => {
        setMicStatus("testing");
        setVolume(0);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            micTestStreamRef.current = stream;

            const AudioContextClass =
                window.AudioContext ||
                (window as unknown as { webkitAudioContext: typeof AudioContext })
                    .webkitAudioContext;
            const audioContext = new AudioContextClass();
            micTestContextRef.current = audioContext;

            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);

            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            let active = true;
            const checkVolume = () => {
                if (!active) return;
                analyser.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                    sum += dataArray[i];
                }
                const average = sum / bufferLength;
                // Map to 0-100% volume
                setVolume(Math.min(100, Math.round((average / 128) * 100)));
                requestAnimationFrame(checkVolume);
            };

            requestAnimationFrame(checkVolume);

            setTimeout(() => {
                active = false;
                stream.getTracks().forEach((track) => track.stop());
                audioContext.close();
                micTestStreamRef.current = null;
                micTestContextRef.current = null;
                setVolume(0);
                setMicStatus("good");
            }, 3000);
        } catch (error) {
            console.error("Error accessing microphone for test:", error);
            setMicStatus("poor");
            setVolume(0);
        }
    };

    const resetMicTest = () => {
        setMicStatus("idle");
        setVolume(0);
    };

    const toggleRecord = async () => {
        if (recording) {
            // Stop recording
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
                mediaRecorderRef.current.stop();
            }
            if (recordRef.current) clearInterval(recordRef.current);
            recordRef.current = null;
            setRecording(false);
            setStep(3);
        } else {
            // Start recording
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                const chunks: Blob[] = [];

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) chunks.push(e.data);
                };

                mediaRecorder.onstop = async () => {
                    stream.getTracks().forEach((track) => track.stop());
                    const raw = new Blob(chunks, {
                        type: mediaRecorder.mimeType || "audio/webm",
                    });
                    // Chuẩn hoá về WAV 16kHz để nghe lại được + Azure chấm được.
                    try {
                        const wav = await blobToWav(raw);
                        setAudioUrl(URL.createObjectURL(wav));
                    } catch (err) {
                        console.error("Không chuyển được WAV, dùng bản gốc:", err);
                        setAudioUrl(URL.createObjectURL(raw));
                    }
                };

                setRecording(true);
                setElapsed(0);
                setAudioUrl(null);
                mediaRecorder.start();

                recordRef.current = setInterval(() => {
                    setElapsed((e) => {
                        if (e >= 60) {
                            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
                                mediaRecorderRef.current.stop();
                            }
                            if (recordRef.current) clearInterval(recordRef.current);
                            recordRef.current = null;
                            setRecording(false);
                            setStep(3);
                            return 60;
                        }
                        return e + 1;
                    });
                }, 1000);
            } catch (err) {
                console.error("Error accessing microphone for recording:", err);
            }
        }
    };

    const retrySpeaking = () => {
        setPlaying(false);
        setElapsed(0);
        setAudioUrl(null);
        setStep(2);
    };

    return (
        <SandboxContext.Provider
            value={{
                step,
                setStep,
                micStatus,
                setMicStatus,
                volume,
                setVolume,
                recording,
                setRecording,
                elapsed,
                setElapsed,
                playing,
                setPlaying,
                analyzing,
                setAnalyzing,
                startMicTest,
                resetMicTest,
                toggleRecord,
                retrySpeaking,
                audioUrl,
            }}
        >
            {children}
        </SandboxContext.Provider>
    );
}

export function useSandbox() {
    const context = useContext(SandboxContext);
    if (!context) {
        throw new Error("useSandbox must be used within a SandboxProvider");
    }
    return context;
}
