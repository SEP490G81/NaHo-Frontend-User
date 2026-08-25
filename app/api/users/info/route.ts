import { proxyBodyJson } from "@/services/server/backend.proxy";

export async function PATCH(request: Request) {
    return proxyBodyJson("PATCH", "/users/info", request);
}
