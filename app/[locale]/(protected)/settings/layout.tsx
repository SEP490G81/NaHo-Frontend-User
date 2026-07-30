import React from "react";
import SettingsSidebar from "@/modules/protected/settings/components/settings.sidebar";
import SettingsModalCloseButton from "@/modules/protected/settings/components/settings.modal.close.button";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-bgc-app/60 fixed top-0 left-0 z-20 flex h-screen w-full items-center justify-center p-4 md:p-6">
            <div className="border-bdc-primary bg-bgc-page relative flex h-[85vh] max-h-[850px] min-h-[600px] w-[92vw] max-w-[1300px] flex-col overflow-hidden rounded-2xl border shadow-2xl">
                <div className="flex h-full flex-1 overflow-hidden">
                    <div className="border-bdc-primary/40 h-full w-56 shrink-0 overflow-y-auto border-r">
                        <SettingsSidebar />
                    </div>
                    <div className="bg-bgc-modal flex h-full flex-1 flex-col overflow-y-auto p-6">
                        <SettingsModalCloseButton />
                        <div className="flex-1">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;
