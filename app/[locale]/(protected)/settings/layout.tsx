import React from "react";
import SettingsSidebar from "@/modules/protected/settings/components/settings.sidebar";
import SettingsModalCloseButton from "@/modules/protected/settings/components/settings.modal.close.button";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-bgc-app/60 absolute top-0 left-0 z-20 flex h-screen w-full items-center justify-center">
            <div className="border-bdc-primary bg-bgc-page relative rounded-md border">
                <div className="flex">
                    <SettingsSidebar />
                    <div className="bg-bgc-modal w-191.5 p-5">
                        <SettingsModalCloseButton />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;
