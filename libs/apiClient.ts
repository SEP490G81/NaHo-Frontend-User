import { clientFetchJson } from "@/services/client/client.fetch";

export function hasApiConfigured(): boolean {
    return true;
}

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const finalPath = path.startsWith("/api") ? path : `/api${path.startsWith("/") ? "" : "/"}${path}`;
    return clientFetchJson<T>(finalPath, options);
}
