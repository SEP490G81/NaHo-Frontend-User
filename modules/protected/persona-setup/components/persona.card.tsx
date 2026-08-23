"use client";

import React from "react";
import { Chip } from "@mui/material";
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
                "group relative flex flex-col justify-between rounded-2xl p-4 transition-all duration-200 cursor-pointer border bg-bgc-app select-none",
                isSelected
                    ? "border-bgc-highlight bg-bgc-highlight/5 ring-2 ring-bgc-highlight shadow-md shadow-bgc-highlight/15"
                    : "border-bdc-primary hover:border-bgc-highlight/60 hover:bg-hbgc-app hover:shadow-xs",
            )}
        >
            {/* Header: Avatar, Name, Gender, Selection Checkmark */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <PersonaAvatarBadge
                        name={persona.name}
                        avatarUrl={persona.avatarFile?.accessUrl}
                        size={52}
                    />

                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-text-contrast text-base font-bold truncate">
                                {persona.name}
                            </h4>

                            {isMale && (
                                <span
                                    title="Nam"
                                    className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                >
                                    <MaleIcon sx={{ fontSize: 16 }} />
                                </span>
                            )}
                            {isFemale && (
                                <span
                                    title="Nữ"
                                    className="flex items-center justify-center h-5 w-5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400"
                                >
                                    <FemaleIcon sx={{ fontSize: 16 }} />
                                </span>
                            )}
                        </div>

                        {persona.voiceName && (
                            <div className="mt-1 flex items-center gap-1 text-text-muted text-xs">
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
                <p className="text-text-muted text-xs leading-relaxed line-clamp-3">
                    {persona.prompt || "Người bạn đồng hành luyện nói tiếng Nhật."}
                </p>
            </div>
        </div>
    );
};

export default PersonaCard;
