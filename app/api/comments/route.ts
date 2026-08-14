import { proxyBodyJson, proxyGet } from "@/services/server/backend.proxy";

/** Danh sách comment (dạng cây) của một câu hỏi nói: ?speakingQuestionId= */
export async function GET(request: Request) {
    const search = new URL(request.url).searchParams;
    return proxyGet("/comments", search);
}

/** Tạo comment mới (userId lấy từ token BE). */
export async function POST(request: Request) {
    return proxyBodyJson("POST", "/comments", request);
}

/** Sửa nội dung comment. */
export async function PUT(request: Request) {
    return proxyBodyJson("PUT", "/comments", request);
}

/** Xoá comment (body { commentId }). */
export async function DELETE(request: Request) {
    return proxyBodyJson("DELETE", "/comments", request);
}
