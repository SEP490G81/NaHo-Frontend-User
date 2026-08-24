"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Chip, Tooltip } from "@mui/material";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import { ResultPersonaCardProps } from "../types/chat.result.type";
import {
    formatDateTime,
    getAvatarGradient,
    getFormalityLevelLabel,
    getInitialLetter,
    getMarugotoLevelLabel,
} from "../utils/chat.result.util";
import { cn } from "@/libs/utils";

const ResultPersonaCardComponent = ({ session }: ResultPersonaCardProps) => {
    const [imageError, setImageError] = useState(false);
    const persona = session.persona;
    const personaName = persona?.name || "Bạn đồng hành AI";
    const avatarUrl =
        persona?.avatarFile?.accessUrl || persona?.avatarFile?.fileUrl;
    const initialLetter = getInitialLetter(personaName);
    const gradient = getAvatarGradient(personaName);

    const startedTimeStr = formatDateTime(session.startedAt);
    const endedTimeStr = formatDateTime(session.endedAt);

    return (
        <div className="border-bdc-primary bg-bgc-app relative overflow-hidden rounded-2xl border p-5 shadow-xs transition-all">
            {/* Top decorative gradient glow */}
            <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-linear-to-br from-pink-500/10 to-rose-500/5 blur-2xl dark:from-pink-500/20" />

            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                {/* Left Side: Avatar & Persona Details */}
                <div className="flex items-start gap-4">
                    {/* Persona Avatar */}
                    {avatarUrl && !imageError ? (
                        <div className="border-bdc-primary bg-bgc-secondary/50 relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border shadow-sm">
                            <Image
                                src={avatarUrl}
                                alt={personaName}
                                fill
                                sizes="64px"
                                className="object-cover"
                                onError={() => setImageError(true)}
                            />
                        </div>
                    ) : (
                        <div
                            className={cn(
                                "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br text-2xl font-bold text-white shadow-sm",
                                gradient,
                            )}
                        >
                            <span>{initialLetter}</span>
                        </div>
                    )}

                    {/* Persona Name, Voice & Prompt / Role */}
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-text-contrast text-lg font-extrabold tracking-tight">
                                {personaName}
                            </h3>
                            {persona?.voiceName && (
                                <span className="border-bdc-primary bg-bgc-secondary text-text-muted inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
                                    <GraphicEqRoundedIcon sx={{ fontSize: 13 }} />
                                    {persona.voiceName}
                                </span>
                            )}
                        </div>

                        {/* Persona Prompt / Bio Description */}
                        {persona?.prompt ? (
                            <p className="text-text-muted mt-1 line-clamp-2 text-xs leading-relaxed">
                                {persona.prompt}
                            </p>
                        ) : (
                            <p className="text-text-muted mt-1 text-xs italic">
                                Trợ lý AI luyện giao tiếp tiếng Nhật 1:1
                            </p>
                        )}

                        {/* Topic info if available */}
                        {session.topic && (
                            <div className="text-text-contrast mt-2 flex items-center gap-1.5 text-xs font-semibold">
                                <TopicOutlinedIcon
                                    sx={{ fontSize: 15 }}
                                    className="text-text-muted"
                                />
                                <span>Chủ đề: {session.topic}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Session Metas (Marugoto, Formality, Turns, Started & Ended Time) */}
                <div className="flex flex-wrap items-center gap-2 p-3 md:max-w-lg md:justify-end">
                    {/* Marugoto Level Badge */}
                    <Tooltip title="Cấp độ Marugoto" arrow>
                        <Chip
                            icon={<SchoolOutlinedIcon sx={{ fontSize: 15 }} />}
                            label={getMarugotoLevelLabel(session.marugotoLevel)}
                            size="small"
                            sx={{
                                height: 26,
                                fontSize: "11px",
                                fontWeight: 700,
                                borderRadius: "8px",
                                backgroundColor: "var(--color-bgc-highlight)/15",
                                color: "var(--color-text-highlight)",
                                "& .MuiChip-icon": {
                                    color: "var(--color-text-highlight)",
                                    fontSize: 14,
                                },
                            }}
                        />
                    </Tooltip>

                    {/* Formality Level Badge */}
                    <Tooltip title="Thể lịch sự hội thoại" arrow>
                        <Chip
                            icon={
                                <RecordVoiceOverOutlinedIcon
                                    sx={{ fontSize: 15 }}
                                />
                            }
                            label={getFormalityLevelLabel(session.formalityLevel)}
                            size="small"
                            sx={{
                                height: 26,
                                fontSize: "11px",
                                fontWeight: 700,
                                borderRadius: "8px",
                                backgroundColor: "var(--color-hbgc-app)",
                                color: "var(--color-text-contrast)",
                                "& .MuiChip-icon": {
                                    color: "var(--color-text-contrast)",
                                    fontSize: 14,
                                },
                            }}
                        />
                    </Tooltip>

                    {/* Total Turns Badge */}
                    {typeof session.totalTurns === "number" && (
                        <Tooltip title="Tổng số lượt trao đổi" arrow>
                            <Chip
                                icon={<ForumOutlinedIcon sx={{ fontSize: 14 }} />}
                                label={`${session.totalTurns} lượt`}
                                size="small"
                                sx={{
                                    height: 26,
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    borderRadius: "8px",
                                    backgroundColor: "var(--color-hbgc-app)",
                                    color: "var(--color-text-contrast)",
                                    "& .MuiChip-icon": {
                                        color: "var(--color-text-muted)",
                                        fontSize: 14,
                                    },
                                }}
                            />
                        </Tooltip>
                    )}

                    {/* Started Time */}
                    {startedTimeStr && (
                        <Tooltip title="Thời gian bắt đầu phiên" arrow>
                            <Chip
                                icon={
                                    <AccessTimeOutlinedIcon
                                        sx={{ fontSize: 14 }}
                                    />
                                }
                                label={`Bắt đầu: ${startedTimeStr}`}
                                size="small"
                                sx={{
                                    height: 26,
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    borderRadius: "8px",
                                    backgroundColor: "transparent",
                                    border: "1px solid var(--color-bdc-primary)",
                                    color: "var(--color-text-muted)",
                                    "& .MuiChip-icon": {
                                        color: "var(--color-text-muted)",
                                        fontSize: 14,
                                    },
                                }}
                            />
                        </Tooltip>
                    )}

                    {/* Ended Time */}
                    {endedTimeStr && (
                        <Tooltip title="Thời gian kết thúc phiên" arrow>
                            <Chip
                                icon={
                                    <AccessTimeOutlinedIcon
                                        sx={{ fontSize: 14 }}
                                    />
                                }
                                label={`Kết thúc: ${endedTimeStr}`}
                                size="small"
                                sx={{
                                    height: 26,
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    borderRadius: "8px",
                                    backgroundColor: "transparent",
                                    border: "1px solid var(--color-bdc-primary)",
                                    color: "var(--color-text-muted)",
                                    "& .MuiChip-icon": {
                                        color: "var(--color-text-muted)",
                                        fontSize: 14,
                                    },
                                }}
                            />
                        </Tooltip>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultPersonaCardComponent;
