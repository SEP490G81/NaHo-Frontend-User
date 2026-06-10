"use client";
import React from "react";

interface ScoreCircleProps {
  score: number;
}

export function ScoreCircle({ score }: ScoreCircleProps) {
  const pct = Math.max(0, Math.min(100, (score / 10) * 100));
  const r = 36;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;

  return (
    <div className="relative h-24 w-24">
      <svg viewBox="0 0 88 88" className="h-full w-full -rotate-90">
        <circle
          cx="44"
          cy="44"
          r={r}
          strokeWidth="8"
          className="fill-none stroke-[var(--color-bdc-primary)] opacity-40"
        />
        <circle
          cx="44"
          cy="44"
          r={r}
          strokeWidth="8"
          strokeLinecap="round"
          className="fill-none stroke-[var(--color-bgc-highlight)] transition-all"
          strokeDasharray={c}
          strokeDashoffset={off}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold leading-none text-text-contrast">
          {score.toFixed(1)}
        </span>
        <span className="text-[10px] text-text-muted">/ 10</span>
      </div>
    </div>
  );
}

export default ScoreCircle;
