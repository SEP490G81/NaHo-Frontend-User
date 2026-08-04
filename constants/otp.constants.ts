// Số ký tự của mã OTP (backend sinh mã 6 chữ số)
export const OTP_LENGTH = 6;

// Thời gian sống của mã OTP ở backend là 5 phút (OTP_TTL_MINUTES = 5)
export const OTP_EXPIRES_SECONDS = 300;

// Backend chặn gửi lại mã trong 1 phút đầu kể từ lần gửi gần nhất
export const RESEND_COOLDOWN_SECONDS = 60;
