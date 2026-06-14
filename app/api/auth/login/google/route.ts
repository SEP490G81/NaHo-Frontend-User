import { ProblemDetail } from "@/types/responses/base.response";
import { NextResponse } from "next/server";

export async function GET() {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
        return NextResponse.json(
            {
                detail: "Backend URL is not configured on the server.",
            } as ProblemDetail,
            { status: 500 },
        );
    }

    return NextResponse.redirect(`${backendUrl}/oauth2/authorization/google`);
}
