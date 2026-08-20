"use client";

import React from "react";
import UserAvatar from "@/layouts/sidebar/components/user.avatar";

interface Props {
    readonly isCollapsed?: boolean;
}

const ChatroomUserAvatar = ({ isCollapsed = false }: Readonly<Props>) => {
    return (
        <div className="border-bdc-primary bg-bgc-app shrink-0 border-t">
            <UserAvatar isCollapsed={isCollapsed} />
        </div>
    );
};

export default ChatroomUserAvatar;
