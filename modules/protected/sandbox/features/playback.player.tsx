"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
interface PlaybackPlayerProps {
    durationSec: number;
    playing: boolean;
    onToggle: () => void;
    audioUrl: string | null;
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

export function PlaybackPlayer({
    durationSec,
    playing,
    onToggle,
    audioUrl,
}: PlaybackPlayerProps) {
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(durationSec);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioUrl) return;

        if (!audioRef.current) {
            audioRef.current = new Audio(audioUrl);
        } else {
            audioRef.current.src = audioUrl;
        }

        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setProgress(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration || durationSec);
        };

        const handleEnded = () => {
            onToggle();
            setProgress(0);
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);

        setProgress(audio.currentTime);

        return () => {
            audio.pause();
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [audioUrl, durationSec, onToggle]);

    // Handle play/pause toggles from parent component controls
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !audioUrl) return;

        if (playing) {
            audio
                .play()
                .catch((err) => console.log("Audio playback error:", err));
        } else {
            audio.pause();
        }
    }, [playing, audioUrl]);

    // Reset progress when audioUrl changes
    useEffect(() => {
        setProgress(0);
    }, [audioUrl]);

    const bars = 40;
    const currentDuration = duration || durationSec || 1;
    const playedBars = Math.floor((progress / currentDuration) * bars);

    return (
        <div className="border-bdc-primary bg-bgc-page rounded-md border p-4">
            <div className="flex items-center gap-4">
                <div className="flex h-12 flex-1 items-end gap-[3px]">
                    {Array.from({ length: bars }).map((_, i) => {
                        const seed = Math.abs(Math.sin(i * 1.3)) * 0.7 + 0.3;
                        return (
                            <span
                                key={i}
                                className={cn(
                                    "w-full rounded-full transition-colors",
                                    i < playedBars
                                        ? "bg-bgc-highlight"
                                        : "bg-bdc-muted/60",
                                )}
                                style={{ height: `${seed * 100}%` }}
                            />
                        );
                    })}
                </div>

                <div className="text-text-muted w-20 text-right font-mono text-xs tabular-nums">
                    {formatTime(progress)} / {formatTime(currentDuration)}
                </div>
            </div>
        </div>
    );
}

export default PlaybackPlayer;
