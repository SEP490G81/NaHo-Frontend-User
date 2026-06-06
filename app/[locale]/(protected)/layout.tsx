import React, { ReactNode } from "react";
import { getCurrentUser } from "@/services/server/user.service";
import ProtectedHeader from "@/layouts/protected-header/components/protected.header";

const ProtectedLayout = async ({
    children,
}: Readonly<{ children: ReactNode }>) => {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Cut");
    }

    return (
        <div className="relative flex">
            <div className="w-75">Sidebar</div>
            <div className="flex min-w-0 flex-1 flex-col">
                <ProtectedHeader />
                <div className="bg-bgc-page w-full flex-1 p-5">{children}</div>
            </div>
        </div>
    );
};

export default ProtectedLayout;
