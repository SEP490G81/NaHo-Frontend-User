export type PaymentProvider = "VNPAY";

export interface CreatePaymentRequest {
    planCode: string;
    provider: PaymentProvider;
}
