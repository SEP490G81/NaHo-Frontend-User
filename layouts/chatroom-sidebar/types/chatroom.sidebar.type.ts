import { MouseEvent, ReactNode } from "react";
import type { SpeakingSessionListItemResponse } from "@/types/responses/speaking.llm.response";

export interface ChatroomSidebarItemData {
    readonly id: string | number;
    readonly sessionCode: string;
    readonly title?: string;
    readonly topic?: string;
    readonly companionName?: string;
    readonly companionAvatar?: string;
    readonly startedAt?: string;
    readonly updatedAt?: string;
    readonly isCompleted?: boolean;
    readonly unreadCount?: number;
    readonly marugotoLevel?: string;
    readonly formalityLevel?: string;
    readonly totalTurns?: number;
}

export interface ChatroomSidebarSectionProps {
    readonly isCollapsed: boolean;
    readonly onItemClick?: () => void;
}

export interface ChatroomSidebarItemProps {
    readonly item: ChatroomSidebarItemData;
    readonly isActive: boolean;
    readonly isCollapsed: boolean;
    readonly onClick?: () => void;
}

export interface ChatroomSectionHeaderProps {
    readonly title: string;
    readonly icon?: ReactNode;
    readonly isCollapsed: boolean;
    readonly isActive?: boolean;
    readonly onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export interface ChatroomInProgressPopoverProps {
    readonly anchorEl: HTMLElement | null;
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly sessions: readonly SpeakingSessionListItemResponse[];
    readonly currentPathname: string;
    readonly onItemClick?: () => void;
    readonly title?: string;
}
