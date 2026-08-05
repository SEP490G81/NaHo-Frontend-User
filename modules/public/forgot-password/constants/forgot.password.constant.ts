// 3 bước của luồng quên mật khẩu, "done" là màn báo đổi mật khẩu thành công.
// Bắt buộc đi tuần tự: nhập email -> nhập OTP -> đặt mật khẩu mới.
export const FORGOT_PASSWORD_STEPS = ["email", "otp", "reset"] as const;

export type ForgotPasswordStep =
    | (typeof FORGOT_PASSWORD_STEPS)[number]
    | "done";
