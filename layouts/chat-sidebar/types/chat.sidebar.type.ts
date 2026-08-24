import { SpeakingSessionListItemResponse } from "@/types/responses/speaking.llm.response";

export interface ChatSidebarProps {
    inProgressSessions: SpeakingSessionListItemResponse[];
    completedProgressSessions: SpeakingSessionListItemResponse[];
}

export interface ChatSidebarSessionItemProps {
    readonly session: SpeakingSessionListItemResponse;
    readonly isActive: boolean;
    readonly onSelect?: () => void;
    readonly onDeleteClick?: (session: SpeakingSessionListItemResponse) => void;
}

export interface ChatSidebarSectionProps {
    readonly title: string;
    readonly icon?: React.ReactNode;
    readonly count: number;
    readonly sessions: SpeakingSessionListItemResponse[];
    readonly emptyText: string;
    readonly currentPathname: string;
    readonly onSessionClick?: () => void;
    readonly onDeleteSession?: (
        session: SpeakingSessionListItemResponse,
    ) => void;
}

export interface DeleteSessionDialogProps {
    readonly open: boolean;
    readonly session: SpeakingSessionListItemResponse | null;
    readonly isDeleting: boolean;
    readonly onConfirm: () => void;
    readonly onClose: () => void;
}

export interface ChatSidebarPopoverProps {
    readonly anchorEl: HTMLElement | null;
    readonly open: boolean;
    readonly inProgressSessions: SpeakingSessionListItemResponse[];
    readonly completedProgressSessions: SpeakingSessionListItemResponse[];
    readonly currentPathname: string;
    readonly onClose: () => void;
    readonly onSessionClick?: () => void;
    readonly onDeleteClick: (session: SpeakingSessionListItemResponse) => void;
}

export interface ChatSidebarCollapsedNavProps {
    readonly inProgressSessions: SpeakingSessionListItemResponse[];
    readonly completedProgressSessions: SpeakingSessionListItemResponse[];
    readonly currentPathname: string;
    readonly onSessionClick?: () => void;
    readonly onDeleteClick: (session: SpeakingSessionListItemResponse) => void;
}
