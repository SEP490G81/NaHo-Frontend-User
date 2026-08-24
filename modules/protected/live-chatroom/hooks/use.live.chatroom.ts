"use client";

import { useContext } from "react";
import { LiveChatroomContext } from "../providers/live.chatroom.provider";
import { LiveChatroomContextType } from "../types/live.chatroom.type";

export function useLiveChatroom(): LiveChatroomContextType {
    const context = useContext(LiveChatroomContext);
    if (!context) {
        throw new Error(
            "useLiveChatroom must be used within a LiveChatroomProvider",
        );
    }
    return context;
}
