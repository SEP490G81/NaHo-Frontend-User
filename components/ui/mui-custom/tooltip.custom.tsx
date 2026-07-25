"use client";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

interface TooltipCustomProps extends TooltipProps {
    color?: string;
}

export const TooltipCustom = styled(
    ({ className, color, ...props }: TooltipCustomProps) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
    ),
)(({ color = "--color-bgc-modal" }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: `var(${color})`,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: `var(${color})`,
        color: "var(--color-text-contrast)",
        border: "1px solid var(--color-bdc-primary)",
        boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        fontWeight: "bold",
    },
}));