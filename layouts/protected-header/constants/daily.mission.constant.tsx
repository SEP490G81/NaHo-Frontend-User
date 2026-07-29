import React from "react";
import { Mic, MessagesSquare, Target } from "lucide-react";
import { MissionType } from "@/types/responses/daily.mission.response";
import { AllRoute } from "@/i18n/type";

export interface MissionTypeConfig {
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    bgGradient: string;
    borderColor: string;
    actionUrl: AllRoute;
    i18nKey: string;
}

export const MISSION_TYPE_CONFIGS: Record<string, MissionTypeConfig> = {
    COMPLETE_SPEAKING_QUESTION_NODE: {
        icon: Mic,
        accentColor: "text-amber-500 dark:text-amber-400",
        bgGradient: "from-amber-500/10 to-orange-500/5",
        borderColor: "border-amber-500/30",
        actionUrl: "/books",
        i18nKey: "COMPLETE_SPEAKING_QUESTION_NODE",
    },
    TALK_WITH_AI: {
        icon: MessagesSquare,
        accentColor: "text-indigo-500 dark:text-indigo-400",
        bgGradient: "from-indigo-500/10 to-purple-500/5",
        borderColor: "border-indigo-500/30",
        actionUrl: "/dialogue-setup",
        i18nKey: "TALK_WITH_AI",
    },
};

export const DEFAULT_MISSION_CONFIG: MissionTypeConfig = {
    icon: Target,
    accentColor: "text-emerald-500 dark:text-emerald-400",
    bgGradient: "from-emerald-500/10 to-teal-500/5",
    borderColor: "border-emerald-500/30",
    actionUrl: "/dashboard",
    i18nKey: "default",
};

export const getMissionConfig = (missionType: MissionType): MissionTypeConfig => {
    return MISSION_TYPE_CONFIGS[missionType] || DEFAULT_MISSION_CONFIG;
};
