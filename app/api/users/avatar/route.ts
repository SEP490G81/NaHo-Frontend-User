import { proxyPatchForm } from "@/services/server/backend.proxy";

export async function PATCH(request: Request) {
    return proxyPatchForm("/users/avatar", request);
}
