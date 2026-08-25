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
import Sidebar from "@/layouts/sidebar/components/sidebar";
import SakuraFalling from "@/components/ui/sakura-falling";
import JapanBackground from "@/components/ui/japan-background";
import MarugotoUserScope from "@/components/providers/marugoto.user.scope";
import AppToggleFuriganaProvider from "@/components/providers/app.toggle.furigana.provider";
import UserLearningProgressProvider from "@/components/providers/user.learning.progress.provider";
import TourUserScope from "@/modules/protected/user-guide/providers/tour.user.scope";
import ActiveTours from "@/modules/protected/user-guide/providers/active.tours";
import OnboardingPrompt from "@/modules/protected/user-guide/features/onboarding.prompt";

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
            <UserLearningProgressProvider>
                <AppToggleFuriganaProvider>
                    <MarugotoUserScope userId={String(user.id)} />
                    <TourUserScope userId={String(user.id)} />
                    <ActiveTours />
                    <OnboardingPrompt />
                    <div className="relative flex min-h-screen">
                        <Sidebar />
                        <div className="flex min-w-0 flex-1 flex-col">
                            <ProtectedHeader />
                            <div className="bg-bgc-page relative isolate w-full flex-1 p-5">
                                <SakuraFalling />
                                <JapanBackground />
                                <div className="mx-auto max-w-7xl">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </AppToggleFuriganaProvider>
            </UserLearningProgressProvider>
        </HydrationBoundary>
    );
};

export default ProtectedLayout;
