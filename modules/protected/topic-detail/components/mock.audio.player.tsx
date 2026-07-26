"use client";
import React, { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { IconButton } from "@mui/material";
import { cn } from "@/libs/utils";

interface MockAudioPlayerProps {
    src?: string;
    durationSec: number;
    autoPlay?: boolean;
}

function formatTime(sec: number) {
    const s = Math.max(0, Math.floor(sec));
    const mm = Math.floor(s / 60)
        .toString()
        .padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
}

const BAR_HEIGHTS = Array.from({ length: 32 }, (_, i) => {
    const seed = Math.sin(i * 12.345) * 10000;
    const r = seed - Math.floor(seed);
    return 30 + Math.round(r * 70);
});

export function MockAudioPlayer({
    src,
    durationSec,
    autoPlay = false,
}: MockAudioPlayerProps) {
    const [playing, setPlaying] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(durationSec);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Fallback sample audio url (a short silent MP3 or public domain sample)
    const audioSrc =
        src || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(audioSrc);
        } else {
            audioRef.current.src = audioSrc;
        }

        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setElapsed(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration || durationSec);
        };

        const handleEnded = () => {
            setPlaying(false);
            setElapsed(0);
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);

        // Sync state if audio was modified elsewhere
        setElapsed(audio.currentTime);

        if (autoPlay) {
            audio
                .play()
                .then(() => setPlaying(true))
                .catch((err) => console.log("Auto-play failed", err));
        } else {
            setPlaying(!audio.paused);
        }

        return () => {
            audio.pause();
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [audioSrc, durationSec, autoPlay]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (playing) {
            audio.pause();
            setPlaying(false);
        } else {
            audio.play().catch((err) => console.log("Play failed", err));
            setPlaying(true);
        }
    };

    const reset = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.pause();
        audio.currentTime = 0;
        setElapsed(0);
        setPlaying(false);
    };

    const progress = Math.min(100, (elapsed / Math.max(0.001, duration)) * 100);

    return (
        <div className="border-bdc-primary bg-bgc-app space-y-3 rounded-lg border p-4">
            <div className="flex items-center gap-3">
                <IconButton
                    onClick={togglePlay}
                    aria-label={playing ? "Tạm dừng" : "Phát"}
                    sx={{
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "var(--color-text-pure)",
                        width: "40px",
                        height: "40px",
                        "&:hover": {
                            backgroundColor: "var(--color-bgc-highlight)",
                            opacity: 0.9,
                        },
                    }}
                >
                    {playing ? (
                        <Pause className="h-4 w-4" />
                    ) : (
                        <Play className="h-4 w-4" />
                    )}
                </IconButton>

                <div className="flex h-12 flex-1 items-center gap-[3px]">
                    {BAR_HEIGHTS.map((h, i) => {
                        const barProgress =
                            ((i + 1) / BAR_HEIGHTS.length) * 100;
                        const reached = barProgress <= progress;
                        return (
                            <span
                                key={i}
                                className={cn(
                                    "w-[3px] rounded-full transition-colors",
                                    reached
                                        ? "bg-bgc-highlight"
                                        : "bg-bdc-muted",
                                    playing && "animate-pulse",
                                )}
                                style={{
                                    height: `${h}%`,
                                    animationDelay: `${i * 40}ms`,
                                    animationDuration: "900ms",
                                }}
                            />
                        );
                    })}
                </div>

                <IconButton
                    onClick={reset}
                    aria-label="Phát lại từ đầu"
                    sx={{
                        color: "var(--color-text-muted)",
                        "&:hover": {
                            backgroundColor: "var(--color-hbgc-app)",
                        },
                    }}
                >
                    <RotateCcw className="h-4 w-4" />
                </IconButton>
            </div>

            <div className="text-text-muted flex items-center justify-between text-xs">
                <span className="tabular-nums">{formatTime(elapsed)}</span>
                <span className="tabular-nums">{formatTime(duration)}</span>
            </div>
        </div>
    );
}

export default MockAudioPlayer;
