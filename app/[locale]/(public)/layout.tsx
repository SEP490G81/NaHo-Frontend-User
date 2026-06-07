import React, { ReactNode } from "react";
import PublicHeader from "@/layouts/public-header/components/public.header";

const PublicLayout = async ({
    children,
}: Readonly<{ children: ReactNode }>) => {
    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <PublicHeader />
            <div className="bg-bgc-page w-full flex-1 overflow-y-auto p-5">
                {children}
            </div>
        </div>
    );
};

export default PublicLayout;
