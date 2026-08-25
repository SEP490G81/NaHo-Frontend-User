import { proxyGet } from "@/services/server/backend.proxy";

// BE v2: GET /api/v2/user-learning-progresses/me (thay endpoint v1 đã @Deprecated forRemoval)
const V2_URL = `${process.env.API_URL?.replace(/\/v1$/, "/v2")}/user-learning-progresses/me`;

export async function GET() {
    return proxyGet(V2_URL);
}
