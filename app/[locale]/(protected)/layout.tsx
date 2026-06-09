import AppHeader from "@/layouts/header/components/app.header";
import { LearnerSidebar } from "@/layouts/sidebar/components/learner.sidebar";
import React, { ReactNode } from "react";

interface LearnerLayoutProps {
    children: React.ReactNode;
}

export function LearnerLayout({ children }: LearnerLayoutProps) {
    return (
        <div className="flex min-h-screen w-full bg-bgc-page">
            {/* Sidebar điều hướng cố định */}
            <LearnerSidebar />

            {/* Khu vực nội dung chính */}
            <div className="flex min-w-0 flex-1 flex-col">
                {/* Header thanh công cụ phía trên */}
                <AppHeader />

                {/* Phần nội dung trang */}
                <main className="flex-1 bg-bgc-page p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default LearnerLayout;

