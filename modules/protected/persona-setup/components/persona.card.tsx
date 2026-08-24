"use client";

import React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import { cn } from "@/libs/utils";
import { PersonaCardProps } from "../types/persona.setup.type";
import PersonaAvatarBadge from "./persona.avatar.badge";

const PersonaCard = ({ persona, isSelected, onSelect }: PersonaCardProps) => {
    const isMale = String(persona.gender).toUpperCase() === "MALE";
    const isFemale = String(persona.gender).toUpperCase() === "FEMALE";

    return (
        <div
            onClick={() => onSelect(persona)}
            className={cn(
                "group bg-bgc-app relative flex cursor-pointer flex-col justify-between rounded-2xl border p-4 transition-all duration-200 select-none",
                isSelected
                    ? "border-bgc-highlight bg-bgc-highlight/5 ring-bgc-highlight shadow-bgc-highlight/15 shadow-md ring-2"
                    : "border-bdc-primary hover:border-bgc-highlight/60 hover:bg-hbgc-app hover:shadow-xs",
            )}
        >
            {/* Header: Avatar, Name, Gender, Selection Checkmark */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    <PersonaAvatarBadge
                        name={persona.name}
                        avatarUrl={persona.avatarFile?.accessUrl}
                        size={52}
                    />

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                            <h4 className="text-text-contrast truncate text-base font-bold">
                                {persona.name}
                            </h4>

                            {isMale && (
                                <span
                                    title="Nam"
                                    className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                >
                                    <MaleIcon sx={{ fontSize: 16 }} />
                                </span>
                            )}
                            {isFemale && (
                                <span
                                    title="Nữ"
                                    className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400"
                                >
                                    <FemaleIcon sx={{ fontSize: 16 }} />
                                </span>
                            )}
                        </div>

                        {persona.voiceName && (
                            <div className="text-text-muted mt-1 flex items-center gap-1 text-xs">
                                <GraphicEqRoundedIcon sx={{ fontSize: 14 }} />
                                <span className="truncate">
                                    {persona.voiceName}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="shrink-0 pt-0.5">
                    <div
                        className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full transition-colors",
                            isSelected
                                ? "text-bgc-highlight"
                                : "text-text-muted/40 group-hover:text-text-muted",
                        )}
                    >
                        <CheckCircleRoundedIcon sx={{ fontSize: 22 }} />
                    </div>
                </div>
            </div>

            {/* Prompt Description */}
            <div className="mt-3 flex-1">
                <p className="text-text-muted line-clamp-3 text-xs leading-relaxed">
                    {persona.prompt ||
                        "Người bạn đồng hành luyện nói tiếng Nhật."}
                </p>
            </div>
        </div>
    );
};

export default PersonaCard;
