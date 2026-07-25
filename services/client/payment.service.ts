import { CreatePaymentRequest } from "@/types/requests/payment.request";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { CreatePaymentResponse } from "@/types/responses/payment.response";

/**
 * Tạo lệnh thanh toán VNPAY với Idempotency-Key bắt buộc.
 */
export async function createPaymentOrder(
    request: CreatePaymentRequest,
    idempotencyKey: string,
): Promise<CreatePaymentResponse> {
    const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(request),
    });

    const result = await response.json();

    if (!response.ok) {
        const problem = result as ProblemDetail;
        throw new Error(
            problem.detail || result.message || "Không thể tạo giao dịch thanh toán.",
        );
    }

    const api = result as ApiResponse<CreatePaymentResponse>;
    return api.data ?? (result as CreatePaymentResponse);
}
