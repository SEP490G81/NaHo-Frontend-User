import { CredentialsLoginRequest } from "@/types/requests/user.request";
import { LoginApiResponse } from "@/types/api/auth.response";

export async function credentialsLogin(
    request: CredentialsLoginRequest,
): Promise<LoginApiResponse> {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    const result: LoginApiResponse = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }
    return result;
}
