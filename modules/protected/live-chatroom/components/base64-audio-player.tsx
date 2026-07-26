"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { IconButton } from "@mui/material";

interface Props {
    /** WAV base64 KHÔNG kèm tiền tố data: (đúng như BE trả). */
    base64: string;
    mime?: string;
    playbackRate?: number;
    autoPlay?: boolean;
}

/** Trình phát audio nhỏ gọn cho câu chào TTS (base64 từ BE). */
export function Base64AudioPlayer({
    base64,
    mime = "audio/wav",
    playbackRate = 1,
    autoPlay = false,
}: Props) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const src = `data:${mime};base64,${base64}`;

    useEffect(() => {
        const el = audioRef.current;
        if (el) el.playbackRate = playbackRate;
    }, [playbackRate]);

    useEffect(() => {
        if (!autoPlay) return;
        const el = audioRef.current;
        el?.play().catch(() => {});
    }, [autoPlay]);

    const toggle = () => {
        const el = audioRef.current;
        if (!el) return;
        if (el.paused) el.play().catch(() => {});
        else el.pause();
    };

    return (
        <div className="bg-bgc-page/60 flex items-center gap-3 rounded-lg px-3 py-2">
            <audio
                ref={audioRef}
                src={src}
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => {
                    setPlaying(false);
                    setProgress(0);
                }}
                onTimeUpdate={(e) => {
                    const el = e.currentTarget;
                    if (el.duration)
                        setProgress((el.currentTime / el.duration) * 100);
                }}
            />
            <IconButton
                size="small"
                onClick={toggle}
                className="!bg-bgc-highlight !h-8 !w-8 text-white hover:opacity-90"
            >
                {playing ? (
                    <Pause className="h-4 w-4" />
                ) : (
                    <Play className="h-4 w-4" />
                )}
            </IconButton>
            <div className="bg-bdc-primary h-1.5 flex-1 overflow-hidden rounded-full">
                <div
                    className="bg-bgc-highlight h-full rounded-full transition-[width] duration-150"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

export default Base64AudioPlayer;
