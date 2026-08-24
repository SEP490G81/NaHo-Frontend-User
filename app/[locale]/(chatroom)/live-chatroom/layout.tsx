import React from "react";

const LiveChatroomLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mx-auto flex h-[calc(100vh-120px)] w-full overflow-hidden">
            {children}
        </div>
    );
};

export default LiveChatroomLayout;
