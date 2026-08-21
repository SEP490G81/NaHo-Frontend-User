import React from "react";

const LiveChatroomLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="border-bdc-primary bg-bgc-app mx-auto flex h-[calc(100vh-120px)] w-full max-w-5xl overflow-hidden rounded-2xl border shadow-sm">
            {children}
        </div>
    );
};

export default LiveChatroomLayout;
