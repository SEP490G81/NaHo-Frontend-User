"use client";
import React from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import { useTranslations } from "next-intl";

interface SandboxStepperProps {
    step: 1 | 2 | 3;
}

export function SandboxStepper({ step }: SandboxStepperProps) {
    const t = useTranslations("page.sandbox");

    const steps = [
        t("step1"),
        t("step2"),
        t("step3"),
    ];

    return (
        <Box className="rounded-2xl border border-bdc-primary bg-bgc-app p-5">
            <Stepper
                activeStep={step - 1}
                alternativeLabel
                sx={{
                    "& .MuiStepIcon-root": {
                        color: "var(--color-bgc-page)",
                        border: "1px solid var(--color-bdc-muted)",
                        borderRadius: "50%",
                        "&.Mui-active": {
                            color: "var(--color-bgc-highlight)",
                            borderColor: "var(--color-bgc-highlight)",
                        },
                        "&.Mui-completed": {
                            color: "var(--color-bgc-highlight)",
                            borderColor: "var(--color-bgc-highlight)",
                        },
                    },
                    "& .MuiStepLabel-label": {
                        color: "var(--color-text-muted)",
                        fontWeight: "semibold",
                        marginTop: "8px",
                        fontSize: "0.85rem",
                        "&.Mui-active": {
                            color: "var(--color-text-contrast)",
                            fontWeight: "bold",
                        },
                        "&.Mui-completed": {
                            color: "var(--color-text-contrast)",
                        },
                    },
                    "& .MuiStepConnector-line": {
                        borderColor: "var(--color-bdc-primary)",
                    },
                }}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default SandboxStepper;
