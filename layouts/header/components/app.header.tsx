"use client";
import React from "react";
import NotificationButton from "@/layouts/header/features/notification.button";
import UserAvatar from "@/layouts/header/components/user.avatar";
import ThemeSwitchButton from "@/layouts/header/components/theme.switch.button";

const AppHeader = () => {
    return (
        <div className="border-b-bdc-primary bg-bgc-app sticky top-0 left-0 z-10 flex items-center justify-end border-b px-3 py-3.5">
            <div className="flex items-center gap-x-1">
                <NotificationButton />
                <ThemeSwitchButton />
            </div>
            <UserAvatar />
        </div>
    );
};

export default AppHeader;
