"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/libs/utils";
import {
    getAvatarGradient,
    getInitialLetter,
} from "../utils/persona.setup.util";

interface PersonaAvatarBadgeProps {
    readonly name: string;
    readonly avatarUrl?: string | null;
    readonly size?: number;
    readonly className?: string;
}

const PersonaAvatarBadge = ({
    name,
    avatarUrl,
    size = 56,
    className,
}: PersonaAvatarBadgeProps) => {
    const [imageError, setImageError] = useState(false);
    const initialLetter = getInitialLetter(name);
    const gradient = getAvatarGradient(name);

    if (avatarUrl && !imageError) {
        return (
            <div
                className={cn(
                    "border-bdc-primary bg-bgc-app relative shrink-0 overflow-hidden rounded-2xl border shadow-xs",
                    className,
                )}
                style={{ width: size, height: size }}
            >
                <Image
                    src={avatarUrl}
                    alt={name}
                    fill
                    sizes={`${size}px`}
                    className="object-cover"
                    onError={() => setImageError(true)}
                />
            </div>
        );
    }

    return (
        <div
            className={cn(
                "relative flex shrink-0 items-center justify-center rounded-2xl bg-linear-to-br font-bold text-white shadow-xs",
                gradient,
                className,
            )}
            style={{
                width: size,
                height: size,
                fontSize: Math.round(size * 0.44),
            }}
        >
            <span>{initialLetter}</span>
        </div>
    );
};

export default PersonaAvatarBadge;
