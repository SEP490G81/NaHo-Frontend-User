import React, { ReactNode } from "react";
import AppHeader from "@/layouts/header/components/app.header";

const ProtectedLayout = async ({
    children,
}: Readonly<{ children: ReactNode }>) => {
    return (
        <div className="flex min-w-0 flex-1 flex-col">
            <AppHeader />
            <div className="bg-bgc-page w-full flex-1 p-5">{children}</div>
        </div>
    );
};

export default ProtectedLayout;
