"use client";

import React, { useEffect, useRef } from "react";

interface AudioVisualizerProps {
    stream: MediaStream | null;
}

export function AudioVisualizer({ stream }: Readonly<AudioVisualizerProps>) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!stream) return;

        const AudioCtxClass =
            window.AudioContext ||
            (
                window as unknown as {
                    webkitAudioContext: typeof AudioContext;
                }
            ).webkitAudioContext;
        const audioCtx = new AudioCtxClass();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        let animationId: number;

        const draw = () => {
            animationId = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barCount = 18;
            const barWidth = 3;
            const gap = 2.5;
            const totalWidth = barCount * (barWidth + gap) - gap;
            const startX = (canvas.width - totalWidth) / 2;

            for (let i = 0; i < barCount; i++) {
                const sampleIdx = Math.floor((i / barCount) * bufferLength);
                const value = dataArray[sampleIdx] || 0;
                const percent = Math.min(1, value / 200);
                const minHeight = 4;
                const barHeight = Math.max(
                    minHeight,
                    percent * (canvas.height - 4),
                );

                const x = startX + i * (barWidth + gap);
                const y = (canvas.height - barHeight) / 2;

                ctx.fillStyle = "#ef4444";
                ctx.beginPath();
                ctx.roundRect(x, y, barWidth, barHeight, 2);
                ctx.fill();
            }
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            audioCtx.close().catch(() => {});
        };
    }, [stream]);

    return (
        <canvas
            ref={canvasRef}
            width={120}
            height={28}
            className="block h-7 w-[120px]"
        />
    );
}

export default AudioVisualizer;
