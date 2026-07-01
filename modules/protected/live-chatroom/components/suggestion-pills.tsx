"use client";
import { Lightbulb } from "lucide-react";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

interface Props {
  suggestions: string[];
  onPick: (text: string) => void;
}

export function SuggestionPills({ suggestions, onPick }: Props) {
  const t = useTranslations("liveChatroom");

  return (
    <div className="rounded-xl border border-dashed border-bgc-highlight/50 bg-bgc-highlight/5 p-3">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-bgc-highlight">
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
            className="!h-auto !py-1.5 !px-3 !rounded-full !text-xs !font-normal !text-text-contrast !border-bgc-highlight/30 !bg-bgc-app hover:!border-bgc-highlight hover:!bg-bgc-highlight/10 text-left font-sans"
          >
            {s}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default SuggestionPills;
