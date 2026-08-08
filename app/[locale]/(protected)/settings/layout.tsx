import React from "react";
import SettingsSidebar from "@/modules/protected/settings/components/settings.sidebar";
import ContainerBox from "@/components/ui/container.box";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ContainerBox className="pr-0">
            <div className="flex h-full flex-1 overflow-hidden">
                <div className="border-bdc-primary/40 h-full w-56 shrink-0 border-r pr-5">
                    <SettingsSidebar />
                </div>
                <div className="flex h-full flex-1 flex-col overflow-y-auto px-5">
                    <div className="w-full flex-1">{children}</div>
                </div>
            </div>
        </ContainerBox>
    );
};

export default SettingsLayout;
