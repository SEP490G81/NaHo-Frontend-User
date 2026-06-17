"use client";
import React from "react";

interface RulesListProps {
  t: any;
}

export function RulesList({ t }: RulesListProps) {
  return (
    <ol className="space-y-3 rounded-lg border border-bdc-primary bg-bgc-page p-4 text-sm leading-relaxed">
      {[1, 2, 3].map((num) => (
        <li key={num} className="flex gap-3 text-text-contrast">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bgc-highlight/20 text-xs font-semibold text-bgc-highlight">
            {num}
          </span>
          <span className="flex-1">{t(`rules.rule${num}` as any)}</span>
        </li>
      ))}
    </ol>
  );
}

export default RulesList;
