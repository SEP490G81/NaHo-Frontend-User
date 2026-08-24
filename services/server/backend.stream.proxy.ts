import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";

/**
 * Helper cho route handler (lớp 1) dành riêng cho SSE: mở kết nối tới BE kèm
 * access token trong cookie rồi trả thẳng body stream về client. Truyền
 * `request.signal` xuống BE để khi trình duyệt đóng EventSource thì kết nối phía
 * BE cũng được huỷ theo, tránh treo connection.
 */
export async function proxyStream(path: string, request: Request) {
    if (!process.env.API_URL) {
        return new NextResponse("API_URL chưa được cấu hình trên server.", {
            status: 500,
        });
    }

    const accessToken = (await cookies()).get(ACCESS_TOKEN_NAME)?.value;
    if (!accessToken) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    let backendResponse: Response;
    try {
        backendResponse = await fetch(`${process.env.API_URL}${path}`, {
            headers: {
                Accept: "text/event-stream",
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
            signal: request.signal,
        });
    } catch {
        return new NextResponse("Không kết nối được luồng sự kiện của BE.", {
            status: 502,
        });
    }

    if (!backendResponse.ok || !backendResponse.body) {
        return new NextResponse("Không kết nối được luồng sự kiện của BE.", {
            status: backendResponse.status || 502,
        });
    }

    return new NextResponse(backendResponse.body, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
            // Tắt buffering của reverse proxy để event tới client ngay lập tức.
            "X-Accel-Buffering": "no",
        },
    });
}
