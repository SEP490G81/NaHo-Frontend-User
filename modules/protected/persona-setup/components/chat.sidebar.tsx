import React from "react";
import { Link } from "@/i18n/navigation";
import { SpeakingSessionListItemResponse } from "@/types/responses/speaking.llm.response";

const ChatSidebar = ({
    inProgressSessions,
    completedProgressSessions,
}: {
    inProgressSessions: SpeakingSessionListItemResponse[];
    completedProgressSessions: SpeakingSessionListItemResponse[];
}) => {
    return (
        <div>
            <Link href={"/persona-setup"}>
                <button></button>
            </Link>

            <div>
                <h2></h2>
            </div>

            <div>
                <h2></h2>
            </div>
        </div>
    );
};

export default ChatSidebar;
