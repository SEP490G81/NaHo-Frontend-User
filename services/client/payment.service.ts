import { CreatePaymentRequest } from "@/types/requests/payment.request";
import {
    CancelPaymentResponse,
    CreatePaymentResponse,
    PaymentOrderResponse,
} from "@/types/responses/payment.response";
import { clientFetchJson } from "./client.fetch";

/**
 * Tạo lệnh thanh toán VNPAY với Idempotency-Key bắt buộc.
 */
export async function createPaymentOrder(
    request: CreatePaymentRequest,
    idempotencyKey: string,
): Promise<CreatePaymentResponse> {
    return clientFetchJson<CreatePaymentResponse>("/api/payments/create", {
        method: "POST",
        headers: {
            "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(request),
    });
}

/**
 * Lấy danh sách lịch sử hóa đơn thanh toán của user hiện tại.
 */
export async function getMyPaymentOrders(): Promise<PaymentOrderResponse[]> {
    const result = await clientFetchJson<PaymentOrderResponse[]>(
        "/api/payments/my-orders",
        {
            method: "GET",
            cache: "no-store",
        },
    );
    return result || [];
}

/**
 * Hủy lệnh thanh toán theo orderCode.
 */
export async function cancelPaymentOrder(
    orderCode: string,
): Promise<CancelPaymentResponse> {
    return clientFetchJson<CancelPaymentResponse>(
        `/api/payments/${orderCode}/cancel`,
        {
            method: "POST",
        },
    );
}
