import React, { ReactNode } from "react";
import AppHeader from "@/layouts/header/components/app.header";
import { SessionProvider } from "next-auth/react";

const ProtectedLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <SessionProvider>
            <div className="flex min-w-0 flex-1 flex-col">
                <AppHeader />
                <div className="bg-bgc-page w-full flex-1 p-5">{children}</div>
            </div>
        </SessionProvider>
    );
};

export default ProtectedLayout;
