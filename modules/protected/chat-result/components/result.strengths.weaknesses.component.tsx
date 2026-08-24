"use client";

import React from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { ResultStrengthsWeaknessesProps } from "../types/chat.result.type";
import { parseListOrLines } from "../utils/chat.result.util";

const ResultStrengthsWeaknessesComponent = ({
    strengths,
    weaknesses,
}: ResultStrengthsWeaknessesProps) => {
    const strengthList = parseListOrLines(strengths);
    const weaknessList = parseListOrLines(weaknesses);

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Strengths */}
            <div className="flex flex-col rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 dark:bg-emerald-500/10">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-5 w-5" />
                    <h3 className="text-base font-bold">Điểm mạnh</h3>
                </div>
                <ul className="text-text-contrast mt-4 flex-1 space-y-2 text-xs leading-relaxed">
                    {strengthList.length > 0 ? (
                        strengthList.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                <span>{item}</span>
                            </li>
                        ))
                    ) : (
                        <p className="text-text-muted italic">
                            Chưa có ghi nhận điểm mạnh cụ thể.
                        </p>
                    )}
                </ul>
            </div>

            {/* Weaknesses */}
            <div className="flex flex-col rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 dark:bg-amber-500/10">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="h-5 w-5" />
                    <h3 className="text-base font-bold">Điểm cần cải thiện</h3>
                </div>
                <ul className="text-text-contrast mt-4 flex-1 space-y-2 text-xs leading-relaxed">
                    {weaknessList.length > 0 ? (
                        weaknessList.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                                <span>{item}</span>
                            </li>
                        ))
                    ) : (
                        <p className="text-text-muted italic">
                            Chưa có ghi nhận điểm yếu cụ thể.
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ResultStrengthsWeaknessesComponent;
