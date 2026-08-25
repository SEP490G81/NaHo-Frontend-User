import { NextResponse } from "next/server";
import { fetchBackendWithAuth } from "./backend.fetch";

/**
 * Helper cho route handler (lớp 1) dành riêng cho SSE: mở kết nối tới BE kèm
 * access token trong cookie, hỗ trợ tự động xoay token khi 401, rồi trả thẳng body stream về client.
 * Truyền `request.signal` xuống BE để khi trình duyệt đóng EventSource thì kết nối phía
 * BE cũng được huỷ theo, tránh treo connection.
 */
export async function proxyStream(path: string, request: Request) {
    let result;
    try {
        result = await fetchBackendWithAuth(path, {
            headers: {
                Accept: "text/event-stream",
            },
            signal: request.signal,
        });
    } catch {
        return new NextResponse("Không kết nối được luồng sự kiện của BE.", {
            status: 502,
        });
    }

    const { response: backendResponse, setCookieHeaders } = result;

    if (!backendResponse.ok || !backendResponse.body) {
        return new NextResponse("Không kết nối được luồng sự kiện của BE.", {
            status: backendResponse.status || 502,
        });
    }

    const headers: Record<string, string> = {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        // Tắt buffering của reverse proxy để event tới client ngay lập tức.
        "X-Accel-Buffering": "no",
    };

    const nextResponse = new NextResponse(backendResponse.body, {
        headers,
    });

    if (setCookieHeaders && setCookieHeaders.length > 0) {
        setCookieHeaders.forEach((cookie) => {
            nextResponse.headers.append("set-cookie", cookie);
        });
    }

    return nextResponse;
}
