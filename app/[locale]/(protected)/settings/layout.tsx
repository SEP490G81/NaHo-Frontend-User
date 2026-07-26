import React from "react";
import SettingsSidebar from "@/modules/protected/settings/components/settings.sidebar";
import SettingsModalCloseButton from "@/modules/protected/settings/components/settings.modal.close.button";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-bgc-app/60 fixed top-0 left-0 z-20 flex h-screen w-full items-center justify-center p-4 md:p-6">
            <div className="border-bdc-primary bg-bgc-page relative rounded-2xl border flex flex-col h-[85vh] max-h-[850px] min-h-[600px] w-full max-w-5xl overflow-hidden shadow-2xl">
                <div className="flex flex-1 h-full overflow-hidden">
                    <div className="w-56 border-r border-bdc-primary/40 shrink-0 h-full overflow-y-auto">
                        <SettingsSidebar />
                    </div>
                    <div className="bg-bgc-modal flex-1 p-6 overflow-y-auto flex flex-col h-full">
                        <SettingsModalCloseButton />
                        <div className="flex-1">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;
