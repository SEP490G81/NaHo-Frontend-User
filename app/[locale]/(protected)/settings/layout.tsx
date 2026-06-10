import React from "react";
import SettingsSidebar from "@/modules/protected/settings/components/settings.sidebar";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <SettingsSidebar />
            <div className="bg-bgc-modal w-60 px-5 py-10">{children}</div>
        </div>
    );
};

export default SettingsLayout;
