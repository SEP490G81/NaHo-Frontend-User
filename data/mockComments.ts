import type { Comment } from "@/modules/protected/comment-reaction/types/comment";
import type { Reaction } from "@/modules/protected/comment-reaction/types/reaction";

export const mockComments: Comment[] = [
    {
        id: 1,
        userId: "u02",
        userName: "Trần Thị Thanh An",
        userAvatar: "",
        questionId: "q1",
        parentId: null,
        content:
            "Câu này phát âm âm 'u' nhẹ thôi đúng không mọi người? Em nghe người Nhật hay nói lướt qua âm 'su'.",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
        id: 2,
        userId: "u09",
        userName: "Cô Phạm Ngọc Hà",
        userAvatar: "",
        questionId: "q1",
        parentId: 1,
        content:
            "Chính xác rồi An nhé! Đuôi 'desu' (です) hay 'masu' (ます) trong tiếng Nhật khi phát âm thường nuốt âm 'u', chỉ phát ra âm 's' gió nhẹ thôi.",
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    },
    {
        id: 3,
        userId: "u03",
        userName: "Lê Quốc Hùng",
        userAvatar: "",
        questionId: "q1",
        parentId: null,
        content:
            "Chào buổi sáng sếp lịch sự bằng câu này kết hợp cúi đầu nhẹ là ghi điểm tuyệt đối luôn.",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    },
    {
        id: 4,
        userId: "u10",
        userName: "Thầy Nguyễn Tấn Phát",
        userAvatar: "",
        questionId: "cm-1",
        parentId: null,
        content:
            "Mẫu câu hỏi giới thiệu bản thân kinh điển trong mọi buổi phỏng vấn BrSE. Các em nhớ chuẩn bị trước một kịch bản nói trôi chảy từ 1-2 phút nhé.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
        id: 5,
        userId: "u01",
        userName: "Nguyễn Minh Tuấn",
        userAvatar: "",
        questionId: "cm-1",
        parentId: 4,
        content:
            "Dạ em cảm ơn thầy ạ! Em đang luyện tập theo bài mẫu của thầy trên lớp để có ngữ điệu tự nhiên nhất.",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
];

export const mockReactions: Reaction[] = [
    {
        id: 1,
        userId: "u01",
        commentId: 1,
        questionId: "q1",
        reactionType: "LIKE",
    },
    {
        id: 2,
        userId: "u09",
        commentId: 1,
        questionId: "q1",
        reactionType: "LOVE",
    },
    {
        id: 3,
        userId: "u02",
        commentId: 2,
        questionId: "q1",
        reactionType: "LOVE",
    },
    {
        id: 4,
        userId: "u02",
        commentId: null, // React for question itself
        questionId: "q1",
        reactionType: "LIKE",
    },
    {
        id: 5,
        userId: "u01",
        commentId: null, // React for question itself
        questionId: "cm-1",
        reactionType: "LOVE",
    },
];
