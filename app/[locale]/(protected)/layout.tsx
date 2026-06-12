import React, { ReactNode } from "react";
import { getCurrentUser } from "@/services/server/user.service";
import ProtectedHeader from "@/layouts/protected-header/components/protected.header";
import { redirect } from "next/navigation";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import LearnerSidebar from "@/layouts/sidebar/components/learner.sidebar";

const ProtectedLayout = async ({
    children,
}: Readonly<{ children: ReactNode }>) => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    const queryClient = new QueryClient();
    queryClient.setQueryData(queryKeys.auth.currentUser, user);
    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className="relative flex">
                <div className="w-75">
                    <LearnerSidebar />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                    <ProtectedHeader />
                    <div className="bg-bgc-page w-full flex-1 p-5">
                        {children}
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    );
};

export default ProtectedLayout;
