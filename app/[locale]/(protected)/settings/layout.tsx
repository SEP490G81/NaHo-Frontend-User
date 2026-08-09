import React from "react";
import SettingsSidebar from "@/modules/protected/settings/components/settings.sidebar";
import ContainerBox from "@/components/ui/container.box";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ContainerBox className="h-[calc(100vh-110px)] p-0 overflow-hidden">
            <div className="flex h-full w-full overflow-hidden">
                {/* Fixed Settings Sidebar */}
                <aside className="border-bdc-primary/40 h-full w-60 shrink-0 border-r p-5 overflow-y-auto overscroll-contain">
                    <SettingsSidebar />
                </aside>

                {/* Scrollable Settings Content Body */}
                <main className="flex h-full flex-1 flex-col overflow-y-auto overscroll-contain p-6">
                    <div className="w-full flex-1">{children}</div>
                </main>
            </div>
        </ContainerBox>
    );
};

export default SettingsLayout;


