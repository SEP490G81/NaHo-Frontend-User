"use client";
import { AlertTriangle } from "lucide-react";
import { Avatar } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCurrentUser } from "@/hooks/use.current.user";
import { getUserAvatarUrl, getFirstCharacter } from "@/layouts/protected-header/utils/header.util";
import { cn } from "@/libs/utils";
import { getInitials } from "../utils/get-initials";
import type { UserChatMessage } from "../types/live-chatroom.type";

/** Màu chip điểm phát âm theo ngưỡng. */
function scoreTone(score: number): string {
    if (score >= 80)
        return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300";
    if (score >= 60)
        return "bg-amber-500/15 text-amber-600 dark:text-amber-300";
    return "bg-rose-500/15 text-rose-600 dark:text-rose-300";
}

export function UserMessageBubble({ message }: { message: UserChatMessage }) {
    const t = useTranslations("liveChatroom");
    const { data: user } = useCurrentUser();
    const name = user?.fullName || "Bạn";
    const avatarUrl = getUserAvatarUrl(user);
    const score = message.pronunciationScore;

    return (
        <div className="flex justify-end gap-3">
            <div className="flex max-w-[80%] flex-col items-end space-y-2">
                <div className="text-text-muted flex items-center gap-2 text-xs">
                    <span>{message.timestamp}</span>
                    <span className="text-text-contrast font-medium">
                        {name}
                    </span>
                </div>
                <div className="bg-bgc-highlight rounded-2xl rounded-tr-sm px-5 py-3.5 text-white shadow-sm">
                    <div className="font-noto-jp text-base leading-relaxed">
                        {message.text}
                    </div>
                </div>

                {message.correction && (
                    <div className="w-full rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-left text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
                        <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            {t("correctionTitle")}
                        </div>
                        <div className="font-noto-jp text-emerald-600 dark:text-emerald-400">
                            {message.correction.correctedText}
                        </div>
                        <div className="mt-1 text-xs leading-relaxed">
                            {message.correction.explanation}
                        </div>
                    </div>
                )}

                {score != null && (
                    <div
                        className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                            scoreTone(score),
                        )}
                    >
                        {t("pronunciationScore")}: {Math.round(score)}
                    </div>
                )}
            </div>
            <Avatar
                src={avatarUrl}
                className="bg-bgc-page text-bgc-highlight h-10 w-10 shrink-0 text-xs font-semibold"
            >
                {getFirstCharacter(user) || getInitials(name)}
            </Avatar>
        </div>
    );
}

export default UserMessageBubble;
