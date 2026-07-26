"use client";
import React from "react";
import type { ReactionType } from "../types/reaction";
import { REACTION_EMOJIS } from "../constants/reaction-type";

interface ReactionPickerProps {
    onSelect: (type: ReactionType) => void;
    className?: string;
}

export function ReactionPicker({ onSelect, className }: ReactionPickerProps) {
    return (
        <div
            className={`bg-bgc-app border-bdc-primary animate-fade-in absolute bottom-full left-0 z-30 mb-1 flex items-center gap-1 rounded-full border px-2 py-1.5 shadow-lg select-none ${className}`}
            onClick={(e) => e.stopPropagation()}
        >
            {(Object.keys(REACTION_EMOJIS) as ReactionType[]).map((type) => {
                const item = REACTION_EMOJIS[type];
                return (
                    <button
                        key={type}
                        onClick={() => onSelect(type)}
                        className="flex cursor-pointer flex-col items-center justify-center rounded-full p-1 transition-transform duration-200 hover:scale-135"
                        title={item.label}
                    >
                        <span className="text-xl leading-none">
                            {item.emoji}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

export default ReactionPicker;
