"use client";
import { Lightbulb } from "lucide-react";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

interface Props {
    suggestions: string[];
    onPick: (text: string) => void;
}

export function SuggestionPills({
    suggestions,
    onPick,
}: Readonly<Props>) {
    const t = useTranslations("liveChatroom");

    return (
        <div className="border-bgc-highlight/50 bg-bgc-highlight/5 rounded-xl border border-dashed p-3">
            <div className="text-bgc-highlight mb-2 flex items-center gap-1.5 text-xs font-medium">
                <Lightbulb className="h-3.5 w-3.5" />
                {t("suggestionLabel")}
            </div>
            <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                    <Button
                        key={s}
                        onClick={() => onPick(s)}
                        variant="outlined"
                        size="small"
                        className="!text-text-contrast !border-bgc-highlight/30 !bg-bgc-app hover:!border-bgc-highlight hover:!bg-bgc-highlight/10 !h-auto !rounded-full !px-3 !py-1.5 text-left font-sans !text-xs !font-normal"
                    >
                        {s}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default SuggestionPills;
