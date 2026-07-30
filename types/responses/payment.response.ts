export type PaymentOrderStatus = "PAID" | "PENDING" | "CANCELLED" | "EXPIRED";

export interface CreatePaymentResponse {
    paymentOrderId: number;
    orderCode: string;
    amount: number;
    currency: string;
    status: string;
    paymentUrl: string;
    expiresTime: string;
    reused: boolean;
    reuseReason?: string | null;
}

export interface PaymentOrderResponse {
    id: number;
    orderCode: string;
    userId: number;
    subscriptionPlanId: number;
    amount: number;
    currency: string;
    provider: string;
    status: PaymentOrderStatus;
    providerTransactionId?: string | null;
    createdTime: string;
    expiresTime: string;
    paidTime?: string | null;
    modifiedTime: string;
    paymentUrl?: string;
}

export interface CancelPaymentResponse {
    orderCode: string;
    status: PaymentOrderStatus;
    message?: string;
}
