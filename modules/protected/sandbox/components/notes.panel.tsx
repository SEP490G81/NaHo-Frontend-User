"use client";
import React, { useState } from "react";
import { NotebookPen } from "lucide-react";
import { useTranslations } from "next-intl";

export function NotesPanel() {
    const t = useTranslations("page.sandbox");
    const [notes, setNotes] = useState("");
    const max = 500;

    return (
        <div className="rounded-xl border border-bdc-primary bg-bgc-app p-4">
            <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-text-contrast">
                    <NotebookPen className="h-4 w-4 text-bgc-highlight" />
                    {t("notesTitle")}
                </h3>
                <span className="text-xs text-text-muted">
                    {notes.length}/{max}
                </span>
            </div>
            <p className="mt-1 text-xs text-text-muted">
                {t("notesSubtitle")}
            </p>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value.slice(0, max))}
                placeholder={t("notesPlaceholder")}
                className="mt-3 h-40 w-full resize-none rounded-md border border-bdc-primary bg-bgc-page p-2.5 text-sm text-text-contrast placeholder-text-muted focus:border-bgc-highlight focus:outline-none"
            />
        </div>
    );
}

export default NotesPanel;
