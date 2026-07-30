import { CreatePaymentRequest } from "@/types/requests/payment.request";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { CancelPaymentResponse, CreatePaymentResponse, PaymentOrderResponse } from "@/types/responses/payment.response";

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
            problem.detail ||
                result.message ||
                "Không thể tạo giao dịch thanh toán.",
        );
    }

    const api = result as ApiResponse<CreatePaymentResponse>;
    return api.data ?? (result as CreatePaymentResponse);
}

/**
 * Lấy danh sách lịch sử hóa đơn thanh toán của user hiện tại.
 */
export async function getMyPaymentOrders(): Promise<PaymentOrderResponse[]> {
    const response = await fetch("/api/payments/my-orders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        const problem = result as ProblemDetail;
        throw new Error(
            problem.detail ||
                result.message ||
                "Không thể lấy danh sách hóa đơn thanh toán.",
        );
    }

    const api = result as ApiResponse<PaymentOrderResponse[]>;
    return api.data ?? (result as PaymentOrderResponse[]);
}

/**
 * Hủy lệnh thanh toán theo orderCode.
 */
export async function cancelPaymentOrder(
    orderCode: string,
): Promise<CancelPaymentResponse> {
    const response = await fetch(`/api/payments/${orderCode}/cancel`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();

    if (!response.ok) {
        const problem = result as ProblemDetail;
        throw new Error(
            problem.detail ||
                result.message ||
                "Không thể hủy giao dịch thanh toán.",
        );
    }

    const api = result as ApiResponse<CancelPaymentResponse>;
    return api.data ?? (result as CancelPaymentResponse);
}
