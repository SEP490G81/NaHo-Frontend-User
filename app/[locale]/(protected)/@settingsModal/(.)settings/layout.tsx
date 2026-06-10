import React, { ReactNode } from "react";
import SettingsModalCloseButton from "@/modules/protected/settings/components/settings.modal.close.button";
import SettingsSidebar from "@/modules/protected/settings/components/settings.sidebar";

const SettingsModalLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-bgc-app/60 absolute top-0 left-0 z-20 flex h-screen w-full items-center justify-center overflow-hidden">
            <div className="border-bdc-primary bg-bgc-page relative max-w-300 rounded-md border">
                <SettingsModalCloseButton />
                <div className="flex">
                    <SettingsSidebar />
                    <div className="bg-bgc-modal w-60 px-5 py-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModalLayout;
