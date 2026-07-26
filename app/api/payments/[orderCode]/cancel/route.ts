import { proxyPostJson } from "@/services/server/backend.proxy";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ orderCode: string }> },
) {
    const { orderCode } = await params;
    return proxyPostJson(`/payments/${orderCode}/cancel`, request);
}
