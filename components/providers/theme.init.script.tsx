"use client";
import { useServerInsertedHTML } from "next/navigation";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

export default function ThemeInitScript() {
    useServerInsertedHTML(() => {
        return <InitColorSchemeScript attribute="class" defaultMode="light" />;
    });
    return null;
}
