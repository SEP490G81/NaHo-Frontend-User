"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface Base64AudioPlayerProps {
    audioBase64: string;
    autoPlay?: boolean;
}

export function Base64AudioPlayer({
    audioBase64,
    autoPlay = false,
}: Readonly<Base64AudioPlayerProps>) {
    const t = useTranslations("liveChatroom");
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        if (!audioBase64) return;
        const url = audioBase64.startsWith("data:audio")
            ? audioBase64
            : `data:audio/wav;base64,${audioBase64}`;
        setSrc(url);
    }, [audioBase64]);

    useEffect(() => {
        if (autoPlay && src && audioRef.current) {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {
                    // Browser policy block autoplay -> ignore
                });
        }
    }, [autoPlay, src]);

    const togglePlay = () => {
        const a = audioRef.current;
        if (!a) return;
        if (isPlaying) {
            a.pause();
            setIsPlaying(false);
        } else {
            a.play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    };

    if (!src) return null;

    return (
        <div className="flex items-center gap-2">
            <audio
                ref={audioRef}
                src={src}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                preload="metadata"
            />
            <button
                type="button"
                onClick={togglePlay}
                className="bg-bgc-highlight/15 text-bgc-highlight hover:bg-bgc-highlight/25 inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors"
            >
                {isPlaying ? (
                    <Pause className="h-3.5 w-3.5" />
                ) : (
                    <Play className="h-3.5 w-3.5" />
                )}
                <Volume2 className="h-3.5 w-3.5 opacity-70" />
                <span>{isPlaying ? t("playingAudio") : t("playAudio")}</span>
            </button>
        </div>
    );
}

export default Base64AudioPlayer;
