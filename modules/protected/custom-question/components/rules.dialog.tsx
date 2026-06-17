"use client";
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useTranslations } from "next-intl";

import RulesList from "./rules-list";

interface RulesDialogProps {
  open: boolean;
  onAccept: () => void;
  onBack: () => void;
}

export function RulesDialog({ open, onAccept, onBack }: RulesDialogProps) {
  const t = useTranslations("customQuestion");

  const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onBack();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "var(--color-bgc-app)",
          color: "var(--color-text-contrast)",
          border: "1px solid var(--color-bdc-primary)",
          borderRadius: "16px",
          padding: "8px",
        },
      }}
    >
      <DialogTitle>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bgc-highlight/15 text-bgc-highlight">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-text-contrast">
              {t("dialogTitle")}
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              {t("dialogSubtitle")}
            </p>
          </div>
        </div>
      </DialogTitle>

      <DialogContent dividers className="border-bdc-primary">
        <RulesList t={t} />
      </DialogContent>

      <DialogActions className="gap-2 px-6 py-4">
        <Button
          onClick={onBack}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "var(--color-bdc-muted)",
            color: "var(--color-text-contrast)",
            fontWeight: "semibold",
            "&:hover": {
              borderColor: "var(--color-bdc-primary)",
              backgroundColor: "var(--color-hbgc-app)",
            },
          }}
        >
          {t("back")}
        </Button>
        <Button
          onClick={onAccept}
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "var(--color-bgc-highlight)",
            color: "var(--color-text-pure)",
            fontWeight: "bold",
            "&:hover": { opacity: 0.9 },
          }}
        >
          {t("acceptRules")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RulesDialog;
