import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/libs/utils";

export interface ContainerBoxProps<T extends ElementType = "div"> {
    as?: T;
    className?: string;
    children?: React.ReactNode;
}

export function ContainerBox<T extends ElementType = "div">({
    as,
    className,
    children,
    ...props
}: ContainerBoxProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ContainerBoxProps<T>>) {
    const Component = as || "div";
    return (
        <Component
            className={cn(
                "bg-bgc-app border-bdc-primary rounded-xl border p-5",
                className,
            )}
            {...props}
        >
            {children}
        </Component>
    );
}

export default ContainerBox;
