import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();
    
    // Clear cookies set on login
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    // Forward logout to backend API
    try {
        await fetch(`${process.env.API_URL}/auth/logout`, {
            method: "POST",
            cache: "no-store",
        });
    } catch (error) {
        console.error("Failed to notify backend logout:", error);
    }

    return NextResponse.json({ success: true });
}
