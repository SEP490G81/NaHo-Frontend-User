"use client";
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SandboxCustomStep } from "../provider/sandbox-custom.context";

interface CustomStepperProps {
    step: SandboxCustomStep;
}

export function CustomStepper({ step }: CustomStepperProps) {
    const t = useTranslations("sandboxCustom");

    const steps = [
        { id: 1 as SandboxCustomStep, labelKey: "stepLabel", subKey: "step1" },
        { id: 2 as SandboxCustomStep, labelKey: "stepLabel", subKey: "step2" },
        { id: 3 as SandboxCustomStep, labelKey: "stepLabel", subKey: "step3" },
        { id: 4 as SandboxCustomStep, labelKey: "stepLabel", subKey: "step4" },
    ];

    return (
        <ol className="border-bdc-primary bg-bgc-app flex w-full items-center justify-between gap-2 rounded-md border p-3 shadow-sm md:p-4">
            {steps.map((s, i) => {
                const done = s.id < step;
                const active = s.id === step;
                return (
                    <li
                        key={s.id}
                        className="flex flex-1 items-center gap-2 md:gap-3"
                    >
                        <div
                            className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                                done &&
                                    "border-bgc-highlight bg-bgc-highlight text-white",
                                active &&
                                    "border-bgc-highlight bg-bgc-highlight/15 text-bgc-highlight",
                                !done &&
                                    !active &&
                                    "border-bdc-muted text-text-muted",
                            )}
                        >
                            {done ? <CheckCircle2 className="h-4 w-4" /> : s.id}
                        </div>
                        <div className="hidden flex-col leading-tight sm:flex">
                            <span className="text-text-muted text-[10px] tracking-wide uppercase">
                                {(t as any)(s.labelKey, { step: s.id })}
                            </span>
                            <span
                                className={cn(
                                    "text-sm font-medium",
                                    active
                                        ? "text-text-contrast font-semibold"
                                        : done
                                          ? "text-text-contrast/80"
                                          : "text-text-muted",
                                )}
                            >
                                {t(s.subKey as any)}
                            </span>
                        </div>
                        {i < steps.length - 1 && (
                            <span
                                className={cn(
                                    "ml-2 hidden h-px flex-1 md:block",
                                    done
                                        ? "bg-bgc-highlight"
                                        : "bg-bdc-primary",
                                )}
                            />
                        )}
                    </li>
                );
            })}
        </ol>
    );
}

export default CustomStepper;
