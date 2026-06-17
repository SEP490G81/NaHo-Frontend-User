"use client";
import React, { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

interface MockAudioBarProps {
    src?: string;
    durationSec: number;
}

function formatTime(sec: number) {
    const m = Math.floor(sec / 60)
        .toString()
        .padStart(2, "0");
    const s = Math.floor(sec % 60)
        .toString()
        .padStart(2, "0");
    return `${m}:${s}`;
}

export function MockAudioBar({ src, durationSec }: MockAudioBarProps) {
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(durationSec);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Fallback sample audio url (a short public domain sample)
    const audioSrc =
        src || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(audioSrc);
        } else {
            audioRef.current.src = audioSrc;
        }

        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setProgress(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration || durationSec);
        };

        const handleEnded = () => {
            setPlaying(false);
            setProgress(0);
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);

        // Sync state if audio was modified elsewhere
        setProgress(audio.currentTime);
        setPlaying(!audio.paused);

        return () => {
            audio.pause();
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [audioSrc, durationSec]);

    const toggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

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

    const pct = Math.min(100, (progress / Math.max(0.001, duration)) * 100);

    return (
        <div
            className="border-bdc-primary bg-bgc-page flex w-fit min-w-[200px] items-center gap-3 rounded-lg border px-3 py-1.5"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Tạm dừng" : "Phát"}
                className="bg-bgc-highlight text-text-pure flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-105"
            >
                {playing ? (
                    <Pause className="h-3.5 w-3.5" />
                ) : (
                    <Play className="ml-0.5 h-3.5 w-3.5" />
                )}
            </button>

            <div className="bg-bdc-muted/50 relative h-1.5 w-24 overflow-hidden rounded-full">
                <div
                    className="bg-bgc-highlight h-full transition-all duration-75"
                    style={{ width: `${pct}%` }}
                />
            </div>

            <span className="text-text-muted font-mono text-xs tabular-nums">
                {formatTime(progress)}
            </span>
        </div>
    );
}

export default MockAudioBar;
