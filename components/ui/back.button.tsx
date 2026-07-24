"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";
import { cn } from "@/libs/utils";

interface BackButtonProps {
    href: string;
    label: string;
    /** Ghi đè class (vd: dùng "bg-bgc-page" khi nút nằm trong card bgc-app). */
    className?: string;
}

/** Nút "Quay lại" dạng pill dùng chung, đồng bộ trên mọi màn. */
export function BackButton({ href, label, className }: BackButtonProps) {
    return (
        <Link
            href={href as AllRoute}
            className={cn(
                "group border-bdc-primary bg-bgc-app text-text-contrast hover:border-bgc-highlight hover:text-bgc-highlight inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:shadow-md",
                className,
            )}
        >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {label}
        </Link>
    );
}

export default BackButton;
