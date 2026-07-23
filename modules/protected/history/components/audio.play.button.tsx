"use client";
import React, { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/libs/utils";

interface Props {
    src: string;
    className?: string;
}

/** Nút nghe lại bản ghi âm (URL CloudFront do BE trả). */
export function AudioPlayButton({ src, className }: Props) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const onEnded = () => setPlaying(false);
        audio.addEventListener("ended", onEnded);
        return () => {
            audio.pause();
            audio.removeEventListener("ended", onEnded);
        };
    }, [src]);

    const toggle = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (playing) {
            audio.pause();
            setPlaying(false);
            return;
        }
        audio
            .play()
            .then(() => setPlaying(true))
            .catch(() => setPlaying(false));
    };

    return (
        <>
            <audio ref={audioRef} src={src} preload="none" />
            <button
                type="button"
                onClick={toggle}
                aria-label="play"
                className={cn(
                    "border-bdc-primary bg-bgc-page text-bgc-highlight hover:border-bgc-highlight/60 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                    className,
                )}
            >
                {playing ? (
                    <Pause className="h-3.5 w-3.5" />
                ) : (
                    <Play className="h-3.5 w-3.5" />
                )}
            </button>
        </>
    );
}

export default AudioPlayButton;
