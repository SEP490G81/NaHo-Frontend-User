import React from "react";
import { getCurrentUser } from "@/services/server/user.service";
import { redirect } from "next/navigation";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import UserLearningProgressProvider from "@/components/providers/user.learning.progress.provider";
import AppToggleFuriganaProvider from "@/components/providers/app.toggle.furigana.provider";
import MarugotoUserScope from "@/components/providers/marugoto.user.scope";
import TourUserScope from "@/modules/protected/user-guide/providers/tour.user.scope";
import ActiveTours from "@/modules/protected/user-guide/providers/active.tours";
import ProtectedHeader from "@/layouts/protected-header/components/protected.header";
import SakuraFalling from "@/components/ui/sakura-falling";
import JapanBackground from "@/components/ui/japan-background";
import ChatSidebar from "@/layouts/chat-sidebar/components/chat.sidebar";
import { getSpeakingSessionsByStatusServer } from "@/services/server/speaking.llm.service";
import { SpeakingSessionStatus } from "@/types/enums/speaking.llm.enum";

const ChatroomLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    const [inProgressSessions, completedProgressSessions] = await Promise.all([
        getSpeakingSessionsByStatusServer(SpeakingSessionStatus.IN_PROGRESS),
        getSpeakingSessionsByStatusServer(SpeakingSessionStatus.COMPLETED),
    ]);

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
                    <div className="relative flex min-h-screen">
                        <ChatSidebar
                            inProgressSessions={inProgressSessions}
                            completedProgressSessions={
                                completedProgressSessions
                            }
                        />
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

export default ChatroomLayout;
