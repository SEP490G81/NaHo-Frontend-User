"use client";
import React, { useState } from "react";
import { NotebookPen } from "lucide-react";
import { useTranslations } from "next-intl";

export function NotesPanel() {
    const t = useTranslations("sandbox");
    const [notes, setNotes] = useState("");
    const max = 500;

    return (
        <div className="border-bdc-primary bg-bgc-app rounded-md border p-4">
            <div className="flex items-center justify-between">
                <h3 className="text-text-contrast flex items-center gap-2 text-sm font-semibold">
                    <NotebookPen
                        className="h-4 w-4"
                        style={{
                            color: "var(--book-accent, var(--color-bgc-highlight))",
                        }}
                    />
                    {t("notesTitle")}
                </h3>
                <span className="text-text-muted text-xs">
                    {notes.length}/{max}
                </span>
            </div>
            <p className="text-text-muted mt-1 text-xs">{t("notesSubtitle")}</p>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value.slice(0, max))}
                placeholder={t("notesPlaceholder")}
                className="border-bdc-primary bg-bgc-page text-text-contrast placeholder-text-muted mt-3 h-40 w-full resize-none rounded-md border p-2.5 text-sm focus:border-[var(--book-accent,var(--color-bgc-highlight))] focus:outline-none"
            />
        </div>
    );
}

export default NotesPanel;
