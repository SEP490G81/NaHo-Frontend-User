"use client";
import React, { useRef } from "react";
import { Avatar, Button, TextField } from "@mui/material";

interface CommentInputFormProps {
    currentUserName: string;
    /** Avatar thật của người dùng hiện tại (fallback về chữ cái nếu trống). */
    avatarUrl?: string | null;
    /** Ẩn avatar (vd khi sửa comment — đã có avatar bên cạnh). */
    hideAvatar?: boolean;
    value: string;
    onChange: (val: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    placeholder: string;
    submitLabel: string;
    /** Có → hiện nút Huỷ (thoát trạng thái sửa/trả lời). */
    onCancel?: () => void;
    cancelLabel?: string;
}

export function CommentInputForm({
    currentUserName,
    avatarUrl,
    hideAvatar,
    value,
    onChange,
    onSubmit,
    placeholder,
    submitLabel,
    onCancel,
    cancelLabel = "Huỷ",
}: CommentInputFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    // Enter = đăng ngay; Shift+Enter = xuống dòng (giống Facebook/chat).
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    };
    return (
        <form
            ref={formRef}
            onSubmit={onSubmit}
            className="flex items-start gap-3"
        >
            {!hideAvatar && (
                <Avatar
                    src={avatarUrl ?? undefined}
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "var(--color-bgc-highlight)",
                    }}
                >
                    {currentUserName.charAt(0).toUpperCase()}
                </Avatar>
            )}

            <div className="flex flex-1 flex-col gap-2">
                <TextField
                    fullWidth
                    multiline
                    rows={2}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    slotProps={{
                        input: {
                            className: "text-sm text-text-contrast bg-bgc-page",
                        },
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "& fieldset": {
                                borderColor: "var(--color-bdc-primary)",
                            },
                            "&:hover fieldset": {
                                borderColor: "var(--color-bdc-muted)",
                            },
                        },
                    }}
                />
                <div className="flex justify-end gap-2">
                    {onCancel && (
                        <Button
                            type="button"
                            onClick={onCancel}
                            sx={{
                                textTransform: "none",
                                color: "var(--color-text-muted)",
                                fontWeight: 600,
                                borderRadius: "8px",
                                px: 2,
                                py: 0.75,
                                "&:hover": {
                                    bgcolor: "var(--color-hbgc-app)",
                                },
                            }}
                        >
                            {cancelLabel}
                        </Button>
                    )}
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
                            "&.Mui-disabled": {
                                bgcolor: "var(--color-bdc-muted)",
                                color: "var(--color-text-muted)",
                            },
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
