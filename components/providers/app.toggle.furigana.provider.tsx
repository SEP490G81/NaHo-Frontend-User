"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface FuriganaContextType {
    showFurigana: boolean;
    updateFurigana: (show: boolean) => void;
    toggleFurigana: () => void;
}

const FuriganaContext = createContext<FuriganaContextType | undefined>(
    undefined,
);

const STORAGE_KEY = "show_furigana";

export function AppToggleFuriganaProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showFurigana, setShowFurigana] = useState<boolean>(true);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved !== null) {
            setShowFurigana(saved === "true");
        }
    }, []);

    const updateFurigana = (show: boolean) => {
        setShowFurigana(show);
        localStorage.setItem(STORAGE_KEY, String(show));
    };

    const toggleFurigana = () => {
        setShowFurigana((prev) => {
            const next = !prev;
            localStorage.setItem(STORAGE_KEY, String(next));
            return next;
        });
    };

    return (
        <FuriganaContext.Provider
            value={{
                showFurigana,
                updateFurigana,
                toggleFurigana,
            }}
        >
            {children}
        </FuriganaContext.Provider>
    );
}

export function useFurigana() {
    const context = useContext(FuriganaContext);
    if (!context) {
        throw new Error(
            "useFurigana must be used within an AppToggleFuriganaProvider",
        );
    }
    return context;
}

export default AppToggleFuriganaProvider;
