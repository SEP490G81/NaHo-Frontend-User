"use client";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slider,
  Switch
} from "@mui/material";
import { getCompanion } from "../constants/live-chatroom.constant";
import { getInitials } from "../utils/get-initials";
import { useChatStore } from "@/store/chatStore";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ChatSidebarProps {
  showFurigana: boolean;
  onToggleFurigana: (v: boolean) => void;
  autoTranslate: boolean;
  onToggleAutoTranslate: (v: boolean) => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export function ChatSidebar({
  showFurigana,
  onToggleFurigana,
  autoTranslate,
  onToggleAutoTranslate,
  isMobile = false,
  onCloseMobile,
}: ChatSidebarProps) {
  const t = useTranslations("liveChatroom");
  const router = useRouter();
  const config = useChatStore((s) => s.config);
  const setConfig = useChatStore((s) => s.setConfig);
  const reset = useChatStore((s) => s.reset);

  const companion = getCompanion(config?.companionId ?? "sakura");
  const [speed, setSpeed] = useState(config?.voiceSpeed ?? 1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSpeedChange = (event: Event, newValue: number | number[]) => {
    const next = Array.isArray(newValue) ? newValue[0] : newValue;
    setSpeed(newValue as number);
    if (config) setConfig({ ...config, voiceSpeed: next });
  };

  const handleEnd = () => {
    reset();
    toast.success(t("toastEndSuccess"));
    setIsDialogOpen(false);
    if (onCloseMobile) onCloseMobile();
    router.push("/dialogue-setup");
  };

  return (
    <aside className="flex h-full flex-col gap-5 border-r border-bdc-primary bg-bgc-app p-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <Avatar className={`h-16 w-16 ${companion.accent} text-lg font-semibold`}>
          {getInitials(companion.name)}
        </Avatar>
        <div>
          <div className="text-sm font-semibold text-text-contrast">{companion.name}</div>
          <span className="mt-1 inline-flex items-center rounded-full bg-bgc-highlight/15 px-2.5 py-0.5 text-[11px] font-medium text-bgc-highlight">
            {companion.role}
          </span>
        </div>
      </div>

      <div className="space-y-2 border-t border-bdc-primary pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-text-contrast">{t("speedLabel")}</span>
          <span className="rounded-md bg-bgc-page px-2 py-0.5 text-xs font-semibold text-bgc-highlight">
            {speed.toFixed(1)}x
          </span>
        </div>
        <Slider
          value={speed}
          min={0.8}
          max={1.5}
          step={0.1}
          onChange={handleSpeedChange}
          color="primary"
        />
        <div className="flex justify-between text-[10px] text-text-muted">
          <span>0.8x</span>
          <span>1.5x</span>
        </div>
      </div>

      <div className="space-y-3 border-t border-bdc-primary pt-4">
        <label className="flex cursor-pointer items-center justify-between gap-3">
          <span className="text-sm text-text-contrast">{t("furiganaToggle")}</span>
          <Switch
            checked={showFurigana}
            onChange={(e) => onToggleFurigana(e.target.checked)}
            color="primary"
          />
        </label>
        <label className="flex cursor-pointer items-center justify-between gap-3">
          <span className="text-sm text-text-contrast">{t("translateToggle")}</span>
          <Switch
            checked={autoTranslate}
            onChange={(e) => onToggleAutoTranslate(e.target.checked)}
            color="primary"
          />
        </label>
      </div>

      <div className="mt-auto border-t border-bdc-primary pt-4">
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={() => setIsDialogOpen(true)}
          className="!h-10 !rounded-lg font-bold capitalize"
          startIcon={<LogOut className="h-4 w-4" />}
        >
          {t("endChatButton")}
        </Button>
      </div>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="[&_.MuiPaper-root]:!rounded-2xl [&_.MuiPaper-root]:border [&_.MuiPaper-root]:border-bdc-primary [&_.MuiPaper-root]:bg-bgc-app [&_.MuiPaper-root]:!shadow-xl"
        slotProps={{
          backdrop: {
            style: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
          },
        }}
      >
        <DialogTitle className="text-text-contrast !font-bold">
          {t("endChatModal.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="!text-text-muted">
            {t("endChatModal.description")}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="p-4 gap-2">
          <Button
            onClick={() => setIsDialogOpen(false)}
            className="!text-text-muted hover:!bg-hbgc-app capitalize"
          >
            {t("endChatModal.cancel")}
          </Button>
          <Button
            onClick={handleEnd}
            variant="contained"
            color="error"
            className="!rounded-lg !px-4 !font-bold capitalize hover:opacity-90"
          >
            {t("endChatModal.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </aside>
  );
}

export default ChatSidebar;
