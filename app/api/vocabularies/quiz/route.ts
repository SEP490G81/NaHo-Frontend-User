import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

export async function GET(req: NextRequest) {
    return proxyGet("/vocabularies/quiz", req.nextUrl.searchParams);
}
