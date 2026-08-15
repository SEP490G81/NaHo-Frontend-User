"use client";
import React, { useEffect, useRef } from "react";

interface AudioVisualizerProps {
    stream: MediaStream | null;
    isRecording: boolean;
}

export function AudioVisualizer({
    stream,
    isRecording,
}: Readonly<AudioVisualizerProps>) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        if (!isRecording || !stream || !canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set up Web Audio API nodes
        const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
                .webkitAudioContext;
        const audioCtx = new AudioContextClass();
        audioCtxRef.current = audioCtx;

        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();

        // We only need a small FFT size since we're displaying a few bars
        analyser.fftSize = 64;
        source.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            if (!canvasRef.current) return;
            animationRef.current = requestAnimationFrame(draw);

            analyser.getByteFrequencyData(dataArray);

            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const spacing = 3;
            const barWidth = (canvas.width / bufferLength) * 1.6;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                // Frequency value (0 - 255)
                const value = dataArray[i];
                const percent = value / 255;
                // Make sure there is always a tiny height even when silent
                const barHeight = Math.max(4, canvas.height * percent);

                // Center the bars vertically on the canvas
                const y = (canvas.height - barHeight) / 2;

                ctx.fillStyle = "#ff99ac"; // var(--color-bgc-highlight)

                ctx.beginPath();
                // Use roundRect to draw beautiful rounded pill bars (if supported)
                if (ctx.roundRect) {
                    ctx.roundRect(
                        x,
                        y,
                        Math.max(1.5, barWidth - spacing),
                        barHeight,
                        2,
                    );
                } else {
                    ctx.rect(
                        x,
                        y,
                        Math.max(1.5, barWidth - spacing),
                        barHeight,
                    );
                }
                ctx.fill();

                x += barWidth;
            }
        };

        draw();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (audioCtxRef.current) {
                audioCtxRef.current.close().catch(() => {});
                audioCtxRef.current = null;
            }
        };
    }, [stream, isRecording]);

    return (
        <canvas
            ref={canvasRef}
            width={130}
            height={24}
            className="h-6 w-32 shrink-0 opacity-90"
        />
    );
}

export default AudioVisualizer;
