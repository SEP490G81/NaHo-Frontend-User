import { NextResponse } from "next/server";
import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME,
} from "@/constants/app.constants";

export async function POST() {
    const response = new NextResponse(null, { status: 204 });
    response.cookies.delete(ACCESS_TOKEN_NAME);
    response.cookies.delete(REFRESH_TOKEN_NAME);
    return response;
}
