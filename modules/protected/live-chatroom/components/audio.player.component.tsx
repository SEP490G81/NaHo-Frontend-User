"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconButton, Slider } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import { AudioPlayerProps } from "../types/live.chatroom.type";
import { base64ToAudioUrl, formatAudioTime } from "../utils/audio.util";

const AudioPlayerComponent = ({
    audioBase64,
    audioUrl,
    speechSpeed = 1.0,
    autoPlay = false,
}: AudioPlayerProps) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [src, setSrc] = useState<string>("");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        let url = audioUrl || "";
        let isBlobCreated = false;
        if (!url && audioBase64) {
            url = base64ToAudioUrl(audioBase64);
            if (url.startsWith("blob:")) {
                isBlobCreated = true;
            }
        }
        setSrc(url);

        return () => {
            if (isBlobCreated && url.startsWith("blob:")) {
                URL.revokeObjectURL(url);
            }
        };
    }, [audioBase64, audioUrl]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = speechSpeed;
        }
    }, [speechSpeed]);

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration || 0);
            audioRef.current.playbackRate = speechSpeed;
            if (autoPlay) {
                audioRef.current
                    .play()
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false));
            }
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const togglePlay = () => {
        if (!audioRef.current || !src) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    };

    const handleSeek = (_: Event, newValue: number | number[]) => {
        const targetTime = Array.isArray(newValue) ? newValue[0] : newValue;
        if (audioRef.current) {
            audioRef.current.currentTime = targetTime;
            setCurrentTime(targetTime);
        }
    };

    if (!src) return null;

    return (
        <div className="border-bdc-primary bg-bgc-secondary/50 my-1.5 flex max-w-md items-center gap-3 rounded-xl border p-2.5 shadow-xs">
            <audio
                ref={audioRef}
                src={src}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />
            <IconButton
                onClick={togglePlay}
                size="small"
                sx={{
                    backgroundColor: "var(--color-bgc-highlight)",
                    color: "#ffffff",
                    "&:hover": {
                        backgroundColor: "var(--color-bgc-highlight)",
                        opacity: 0.9,
                    },
                }}
            >
                {isPlaying ? (
                    <PauseRoundedIcon sx={{ fontSize: 20 }} />
                ) : (
                    <PlayArrowRoundedIcon sx={{ fontSize: 20 }} />
                )}
            </IconButton>

            <div className="flex flex-1 flex-col justify-center">
                <Slider
                    size="small"
                    value={currentTime}
                    max={duration || 100}
                    onChange={handleSeek}
                    sx={{
                        color: "var(--color-bgc-highlight)",
                        height: 4,
                        padding: "8px 0",
                        "& .MuiSlider-thumb": {
                            width: 12,
                            height: 12,
                        },
                    }}
                />
                <div className="text-text-muted mt-0.5 flex items-center justify-between text-[10px]">
                    <span>{formatAudioTime(currentTime)}</span>
                    <span className="flex items-center gap-0.5">
                        <VolumeUpRoundedIcon sx={{ fontSize: 11 }} />
                        {speechSpeed.toFixed(2)}x
                    </span>
                    <span>{formatAudioTime(duration)}</span>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayerComponent;
