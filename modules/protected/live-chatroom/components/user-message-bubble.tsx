"use client";
import { AlertTriangle } from "lucide-react";
import { Avatar } from "@mui/material";
import { useAuthStore } from "@/store/authStore";
import { getInitials } from "../utils/get-initials";
import type { UserChatMessage } from "../types/live-chatroom.type";
import { useTranslations } from "next-intl";

export function UserMessageBubble({ message }: { message: UserChatMessage }) {
  const t = useTranslations("liveChatroom");
  const profile = useAuthStore((s) => s.profile);
  const name = profile?.fullName ?? "Bạn";

  return (
    <div className="flex justify-end gap-3">
      <div className="flex max-w-[80%] flex-col items-end space-y-2">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span>{message.timestamp}</span>
          <span className="font-medium text-text-contrast">{name}</span>
        </div>
        <div className="rounded-2xl rounded-tr-sm bg-bgc-highlight px-4 py-3 text-white shadow-sm">
          <div className="text-base leading-relaxed font-noto-jp">
            {message.text}
          </div>
        </div>

        {message.correction && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold">
              <AlertTriangle className="h-3.5 w-3.5" />
              {t("correctionTitle")}
            </div>
            <div className="font-noto-jp text-emerald-600 dark:text-emerald-400">
              {message.correction.fixedJp}
            </div>
            <div className="mt-1 text-xs">
              <span className="font-medium">{t("correctionErrorPrefix")}</span>{" "}
              {message.correction.errorVi}
            </div>
          </div>
        )}
      </div>
      <Avatar className="h-9 w-9 shrink-0 bg-bgc-page text-bgc-highlight text-xs font-semibold">
        {getInitials(name)}
      </Avatar>
    </div>
  );
}

export default UserMessageBubble;
