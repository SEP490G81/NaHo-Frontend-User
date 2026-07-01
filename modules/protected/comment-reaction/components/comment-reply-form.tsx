"use client";
import React from "react";
import { TextField, Button } from "@mui/material";

interface CommentReplyFormProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder: string;
  submitLabel: string;
}

export function CommentReplyForm({
  value,
  onChange,
  onSubmit,
  placeholder,
  submitLabel,
}: CommentReplyFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="ml-12 flex items-start gap-3 bg-bgc-page p-3 rounded-xl border border-bdc-primary border-dashed animate-fade-in"
    >
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
          input: {
            className: "text-sm text-text-contrast bg-bgc-app",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& fieldset": { borderColor: "var(--color-bdc-primary)" },
            "&:hover fieldset": { borderColor: "var(--color-bdc-muted)" },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        size="small"
        sx={{
          textTransform: "none",
          bgcolor: "var(--color-bgc-highlight)",
          color: "var(--color-text-pure)",
          fontWeight: "bold",
          borderRadius: "8px",
          height: "40px",
          "&:hover": { opacity: 0.9 },
        }}
      >
        {submitLabel}
      </Button>
    </form>
  );
}

export default CommentReplyForm;
