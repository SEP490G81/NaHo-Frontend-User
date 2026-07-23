"use client";
import React from "react";
import { Check, Loader2, Lock } from "lucide-react";
import { cn } from "@/libs/utils";

export type NodeStatus = "completed" | "active" | "locked";

const STYLES: Record<NodeStatus, string> = {
    completed: "bg-text-success/15 text-text-success border-text-success/30",
    active: "bg-bgc-highlight/15 text-bgc-highlight border-bgc-highlight/40",
    locked: "bg-bgc-page text-text-muted border-bdc-primary",
};

const ICONS: Record<NodeStatus, React.ElementType> = {
    completed: Check,
    active: Loader2,
    locked: Lock,
};

interface StatusBadgeProps {
    status: NodeStatus;
    label: string;
    className?: string;
}

/** Nhãn trạng thái Đã học / Đang học / Đang khóa dùng chung cho lộ trình. */
export function StatusBadge({ status, label, className }: StatusBadgeProps) {
    const Icon = ICONS[status];
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap",
                STYLES[status],
                className,
            )}
        >
            <Icon className="h-3 w-3" />
            {label}
        </span>
    );
}

export default StatusBadge;
