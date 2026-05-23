"use client";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

interface TooltipCustomProps extends TooltipProps {
    color?: string;
}

export const TooltipCustom = styled(
    ({ className, ...props }: TooltipCustomProps) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
    ),
)(({ color = "--color-bgc-highlight" }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: `var(${color})`,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: `var(${color})`,
        fontWeight: "bold",
    },
}));
