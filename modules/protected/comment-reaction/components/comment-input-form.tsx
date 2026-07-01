"use client";
import React from "react";
import { Avatar, TextField, Button } from "@mui/material";

interface CommentInputFormProps {
  currentUserName: string;
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder: string;
  submitLabel: string;
}

export function CommentInputForm({
  currentUserName,
  value,
  onChange,
  onSubmit,
  placeholder,
  submitLabel,
}: CommentInputFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex items-start gap-3">
      <Avatar
        sx={{ width: 40, height: 40, bgcolor: "var(--color-bgc-highlight)" }}
      >
        {currentUserName.charAt(0).toUpperCase()}
      </Avatar>

      <div className="flex-1 flex flex-col gap-2">
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          slotProps={{
            input: {
              className: "text-sm text-text-contrast bg-bgc-page",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "& fieldset": { borderColor: "var(--color-bdc-primary)" },
              "&:hover fieldset": { borderColor: "var(--color-bdc-muted)" },
            },
          }}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="contained"
            disabled={!value.trim()}
            sx={{
              textTransform: "none",
              bgcolor: "var(--color-bgc-highlight)",
              color: "var(--color-text-pure)",
              fontWeight: "bold",
              borderRadius: "8px",
              px: 3,
              py: 0.75,
              "&:hover": { opacity: 0.9 },
              "&.Mui-disabled": { bgcolor: "var(--color-bdc-muted)", color: "var(--color-text-muted)" },
            }}
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CommentInputForm;
