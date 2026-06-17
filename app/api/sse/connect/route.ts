import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;

    if (!accessToken) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const responseStream = new ReadableStream({
        async start(controller) {
            const backendUrl = `${process.env.API_URL}/sse/connect`;

            try {
                const response = await fetch(backendUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    cache: "no-store",
                });

                if (!response.ok || !response.body) {
                    const errorMsg = "event: error\ndata: Failed to connect to backend sse\n\n";
                    controller.enqueue(new TextEncoder().encode(errorMsg));
                    controller.close();
                    return;
                }

                const reader = response.body.getReader();

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        break;
                    }
                    controller.enqueue(value);
                }
            } catch (error) {
                console.error("Error in SSE proxy stream:", error);
                controller.error(error);
            } finally {
                controller.close();
            }
        },
    });

    return new NextResponse(responseStream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
        },
    });
}
