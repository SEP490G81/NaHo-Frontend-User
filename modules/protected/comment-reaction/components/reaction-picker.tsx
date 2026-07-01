"use client";
import React from "react";
import type { ReactionType } from "../types/comment";
import { REACTION_EMOJIS } from "../constants/mockData";

interface ReactionPickerProps {
  onSelect: (type: ReactionType) => void;
  className?: string;
}

export function ReactionPicker({ onSelect, className }: ReactionPickerProps) {
  return (
    <div
      className={`absolute bottom-full mb-1 left-0 flex items-center gap-1 bg-bgc-app border border-bdc-primary rounded-full px-2 py-1.5 shadow-lg animate-fade-in z-30 select-none ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {(Object.keys(REACTION_EMOJIS) as ReactionType[]).map((type) => {
        const item = REACTION_EMOJIS[type];
        return (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className="flex flex-col items-center justify-center p-1 rounded-full transition-transform hover:scale-135 duration-200 cursor-pointer"
            title={item.label}
          >
            <span className="text-xl leading-none">{item.emoji}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ReactionPicker;
