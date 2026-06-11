"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

const Reveal = ({ children, className = "", delay = 0 }: RevealProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.15 },
        );
        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ease-out ${
                visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
            } ${className}`}
        >
            {children}
        </div>
    );
};

export default Reveal;
