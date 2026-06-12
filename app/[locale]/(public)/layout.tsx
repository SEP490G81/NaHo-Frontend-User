import React, { ReactNode } from "react";
import PublicHeader from "@/layouts/public-header/components/public.header";

const PublicLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <PublicHeader />
            <div className="bg-bgc-page w-full flex-1 scroll-smooth overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default PublicLayout;
