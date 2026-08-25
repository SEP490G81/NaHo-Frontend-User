import { useAuthStore } from "@/store/authStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.naho.io.vn/api/v1";

export function hasApiConfigured(): boolean {
    return !!BASE_URL;
}

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    if (!BASE_URL) {
        throw new Error("API base URL is not configured");
    }

    // Lấy token từ Zustand Auth Store (tự động khôi phục từ localStorage)
    const token = useAuthStore.getState().token;

    const headers = new Headers(options.headers);

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    // Chỉ set Content-Type là application/json nếu body không phải FormData
    if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
            // Bỏ qua lỗi parse JSON nếu response không có body JSON hợp lệ
        }
        throw new Error(errorMessage);
    }

    return response.json() as Promise<T>;
}
