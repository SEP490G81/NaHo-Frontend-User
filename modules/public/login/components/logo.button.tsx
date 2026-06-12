"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React from "react";

const LogoButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-center justify-center">
            <Link
                href={"/home"}
                className="flex items-center gap-x-3 select-none"
            >
                <Image
                    src={"/logo.png"}
                    alt="app-logo"
                    width={40}
                    height={40}
                />
                {children}
            </Link>
        </div>
    );
};

export default LogoButton;
