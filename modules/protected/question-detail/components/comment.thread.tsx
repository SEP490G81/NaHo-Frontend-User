"use client";
import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Tooltip,
} from "@mui/material";
import { Flag, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useReportStore } from "@/store/reportStore";
import type {
    CommentNode,
    ReactionType,
} from "@/types/responses/social.response";
import { resolveAvatarUrl } from "@/modules/protected/leaderboard/utils/leaderboard.util";
import UserAvatarImage from "@/layouts/sidebar/components/user.avatar.image";
import CommentInputForm from "@/modules/protected/comment-reaction/components/comment-input-form";
import CommentReactionBar from "./comment.reaction.bar";
import CommentAuthorCard from "./comment.author.card";

type CommentUser = NonNullable<CommentNode["userInfo"]>;

/** Bọc phần tử con bằng tooltip card thông tin người dùng (hiện lên phía trên). */
function AuthorCardTooltip({
    user,
    children,
}: {
    user: CommentUser;
    children: React.ReactElement;
}) {
    return (
        <Tooltip
            title={<CommentAuthorCard user={user} />}
            placement="top"
            slotProps={{
                tooltip: {
                    sx: {
                        bgcolor: "var(--color-bgc-app)",
                        color: "inherit",
                        border: "1px solid var(--color-bdc-primary)",
                        borderRadius: "12px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                        maxWidth: "none",
                        p: 1.5,
                    },
                },
            }}
        >
            {children}
        </Tooltip>
    );
}

interface Props {
    comment: CommentNode;
    currentUserName: string;
    currentUserAvatar?: string | null;
    /** Id user hiện tại — để bật Sửa/Xoá & ẩn Báo cáo cho comment của mình. */
    myUserId?: number;
    /** Người viết comment cha (để hiện @tên in đậm ở đầu reply). */
    parentUser?: CommentNode["userInfo"];
    /** Tier gói của user hiện tại — để tô aura cho comment của chính mình. */
    myTier?: string;
    now: number;
    onReply: (content: string, parentId: number) => void;
    onReact: (commentId: number, type: ReactionType) => void;
    onEdit: (commentId: number, newContent: string) => void;
    onDelete: (commentId: number) => void;
}

/** Một comment + các reply lồng nhau (đệ quy). */
export function CommentThread({
    comment,
    currentUserName,
    currentUserAvatar,
    myUserId,
    parentUser,
    myTier,
    now,
    onReply,
    onReact,
    onEdit,
    onDelete,
}: Props) {
    const t = useTranslations("marugoto.questionDetail");
    const openReport = useReportStore((s) => s.openModal);
    const [showReply, setShowReply] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(comment.content);
    const [confirmDel, setConfirmDel] = useState(false);

    const user = comment.userInfo;
    const author = user?.fullName || t("commenter", { id: user?.id ?? "?" });
    const isMine = myUserId != null && user?.id === myUserId;
    // Tier gói để tô aura avatar: comment của mình lấy theo gói hiện tại (biết
    // chắc); người khác lấy từ userInfo.subscriptionTier (BE bổ sung dần).
    const tier = (isMine ? myTier : user?.subscriptionTier) ?? "FREE";
    // "đã sửa" chỉ hiện khi thời điểm sửa cách lúc tạo > 1s (bỏ chênh lệch tạo mới).
    const edited =
        new Date(comment.modifiedTime).getTime() -
            new Date(comment.createdTime).getTime() >
        1000;

    // Trả lời chính mình thì không gắn @tên (giống Facebook).
    const isSelfReply =
        parentUser?.id != null && user?.id != null && parentUser.id === user.id;
    // Nếu là reply người khác và nội dung mở đầu bằng tên họ → tách ra để hiển
    // thị phần tên đó in đậm xanh + hover ra card (kiểu Facebook @mention).
    const parentName = parentUser?.fullName;
    const mention =
        comment.parentId != null &&
        parentName &&
        !isSelfReply &&
        comment.content.startsWith(parentName + " ")
            ? parentName
            : null;
    const bodyText = mention
        ? comment.content.slice(mention.length)
        : comment.content;

    const relTime = (iso: string) => {
        const diff = now - new Date(iso).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return t("justNow");
        if (mins < 60) return t("minutesAgo", { count: mins });
        const hours = Math.floor(mins / 60);
        if (hours < 24) return t("hoursAgo", { count: hours });
        return new Date(iso).toLocaleDateString("vi-VN");
    };

    const openReplyBox = () => setShowReply((v) => !v);
    const sendReply = (e: React.FormEvent) => {
        e.preventDefault();
        const body = replyText.trim();
        if (!body) return;
        // Đính @tên người được trả lời ra trước — trừ khi tự trả lời mình.
        const content = isMine ? body : `${author} ${body}`;
        onReply(content, comment.commentId);
        setReplyText("");
        setShowReply(false);
    };
    const saveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editText.trim()) return;
        onEdit(comment.commentId, editText);
        setEditing(false);
    };
    const actionBtn =
        "text-text-muted flex cursor-pointer items-center gap-1 text-xs transition-colors";

    const avatarEl = (
        <span className="shrink-0 cursor-default">
            <UserAvatarImage
                user={{
                    fullName: user?.fullName ?? null,
                    avatarUrl: resolveAvatarUrl(
                        user?.avatarUrl,
                        user?.authAvatarUrl,
                    ),
                }}
                tier={tier}
                size={36}
            />
        </span>
    );

    return (
        <div className="space-y-3">
            <div className="flex items-start gap-3">
                {!editing &&
                    (user ? (
                        <AuthorCardTooltip user={user}>
                            {avatarEl}
                        </AuthorCardTooltip>
                    ) : (
                        avatarEl
                    ))}

                <div className="flex-1 space-y-1">
                    {editing ? (
                        <CommentInputForm
                            currentUserName={currentUserName}
                            hideAvatar
                            value={editText}
                            onChange={setEditText}
                            onSubmit={saveEdit}
                            onCancel={() => setEditing(false)}
                            cancelLabel={t("cancel")}
                            placeholder={t("commentPlaceholder")}
                            submitLabel={t("save")}
                        />
                    ) : (
                        <div className="border-bdc-primary bg-bgc-page inline-block max-w-full rounded-2xl border px-4 py-2">
                            <div className="flex items-center gap-2">
                                <span className="text-text-contrast text-sm font-bold">
                                    {author}
                                </span>
                                <span className="text-text-muted text-[10px]">
                                    {relTime(comment.createdTime)}
                                    {edited ? ` · ${t("edited")}` : ""}
                                </span>
                            </div>
                            <p className="text-text-contrast mt-1 text-sm leading-relaxed break-words whitespace-pre-wrap">
                                {mention && parentUser ? (
                                    <AuthorCardTooltip user={parentUser}>
                                        <span className="cursor-pointer font-semibold text-blue-500 hover:underline">
                                            {mention}
                                        </span>
                                    </AuthorCardTooltip>
                                ) : null}
                                {bodyText}
                            </p>
                        </div>
                    )}

                    {!editing && (
                        <div className="flex flex-wrap items-center gap-4 pl-2">
                            <CommentReactionBar
                                summary={comment.reactionSummary}
                                onReact={(type) =>
                                    onReact(comment.commentId, type)
                                }
                            />
                            <button
                                onClick={openReplyBox}
                                className={`${actionBtn} hover:text-text-contrast`}
                            >
                                {t("reply")}
                            </button>
                            {isMine && (
                                <button
                                    onClick={() => {
                                        setEditText(comment.content);
                                        setEditing(true);
                                    }}
                                    className={`${actionBtn} hover:text-text-contrast`}
                                >
                                    <Pencil className="h-3 w-3" />
                                    {t("edit")}
                                </button>
                            )}
                            {isMine && (
                                <button
                                    onClick={() => setConfirmDel(true)}
                                    className={`${actionBtn} hover:text-red-500`}
                                >
                                    <Trash2 className="h-3 w-3" />
                                    {t("delete")}
                                </button>
                            )}
                            {/* Không cho tự báo cáo comment của chính mình */}
                            {!isMine && (
                                <button
                                    onClick={() =>
                                        openReport(
                                            "COMMENT",
                                            String(comment.questionId),
                                            comment.commentId,
                                        )
                                    }
                                    className={`${actionBtn} hover:text-red-500`}
                                >
                                    <Flag className="h-3 w-3" />
                                    {t("report")}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {showReply && (
                <div className="ml-12 space-y-1">
                    {!isMine && user && (
                        <div className="text-text-muted flex items-center gap-1 pl-1 text-xs">
                            <span>{t("replyingTo")}</span>
                            <AuthorCardTooltip user={user}>
                                <span className="cursor-pointer font-semibold text-blue-500 hover:underline">
                                    {author}
                                </span>
                            </AuthorCardTooltip>
                        </div>
                    )}
                    <CommentInputForm
                        currentUserName={currentUserName}
                        avatarUrl={currentUserAvatar}
                        value={replyText}
                        onChange={setReplyText}
                        onSubmit={sendReply}
                        onCancel={() => {
                            setShowReply(false);
                            setReplyText("");
                        }}
                        cancelLabel={t("cancel")}
                        placeholder={t("replyPlaceholder")}
                        submitLabel={t("send")}
                    />
                </div>
            )}

            <Dialog
                open={confirmDel}
                onClose={() => setConfirmDel(false)}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: "16px",
                            bgcolor: "var(--color-bgc-app)",
                            backgroundImage: "none",
                        },
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        fontWeight: 700,
                        color: "var(--color-text-contrast)",
                    }}
                >
                    {t("deleteTitle")}
                </DialogTitle>
                <DialogContent>
                    <p className="text-text-muted text-sm">
                        {t("deleteConfirm")}
                    </p>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={() => setConfirmDel(false)}
                        sx={{
                            textTransform: "none",
                            color: "var(--color-text-muted)",
                            fontWeight: 600,
                        }}
                    >
                        {t("cancel")}
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            onDelete(comment.commentId);
                            setConfirmDel(false);
                        }}
                        sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                        {t("delete")}
                    </Button>
                </DialogActions>
            </Dialog>

            {comment.children.length > 0 && (
                <div className="border-bdc-primary ml-6 space-y-3 border-l-2 pl-4">
                    {comment.children.map((child) => (
                        <CommentThread
                            key={child.commentId}
                            comment={child}
                            currentUserName={currentUserName}
                            currentUserAvatar={currentUserAvatar}
                            myUserId={myUserId}
                            parentUser={user}
                            myTier={myTier}
                            now={now}
                            onReply={onReply}
                            onReact={onReact}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CommentThread;
