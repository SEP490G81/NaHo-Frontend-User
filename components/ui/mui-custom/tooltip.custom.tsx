"use client";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

interface TooltipCustomProps extends TooltipProps {
    color?: string;
    textColor?: string;
}

export const TooltipCustom = styled(
    ({ className, color, textColor, ...props }: TooltipCustomProps) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
    ),
)(({ color = "--color-bgc-modal", textColor = "--color-text-contrast" }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: color.startsWith("--") ? `var(${color})` : color,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: color.startsWith("--") ? `var(${color})` : color,
        color: textColor.startsWith("--") ? `var(${textColor})` : textColor,
        border: "1px solid var(--color-bdc-primary)",
        boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        fontWeight: "bold",
    },
}));
