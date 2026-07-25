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
