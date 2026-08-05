"use client";
import OtpCodeInput from "@/components/ui/otp.code.input";
import { USER_ERROR_CODES } from "@/constants/error.code.constants";
import {
    OTP_EXPIRES_SECONDS,
    OTP_LENGTH,
    RESEND_COOLDOWN_SECONDS,
} from "@/constants/otp.constants";
import { getErrorCode } from "@/libs/api.error";
import { createEmptyOtp, formatCountdown, maskEmail } from "@/libs/otp";
import {
    forgotPassword,
    verifyForgotPasswordOtp,
} from "@/services/client/user.service";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { FormEvent, useEffect, useRef, useState } from "react";

const OtpStep = ({
    email,
    initialErrorMessage = "",
    onVerified,
    onChangeEmail,
}: {
    email: string;
    initialErrorMessage?: string;
    onVerified: (resetToken: string) => void;
    onChangeEmail: () => void;
}) => {
    const t = useTranslations();

    const [otpValues, setOtpValues] = useState<string[]>(createEmptyOtp);
    const [errorMessage, setErrorMessage] = useState(initialErrorMessage);
    const [successMessage, setSuccessMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [resending, setResending] = useState(false);
    const [expiresIn, setExpiresIn] = useState(OTP_EXPIRES_SECONDS);
    const [resendIn, setResendIn] = useState(RESEND_COOLDOWN_SECONDS);
    // tăng lên mỗi lần cần đưa con trỏ về ô OTP đầu tiên
    const [focusSignal, setFocusSignal] = useState(0);

    // chặn xác thực trùng khi vừa tự động gửi lúc nhập đủ mã vừa bấm nút
    const verifyingRef = useRef(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setExpiresIn((prev) => (prev > 0 ? prev - 1 : 0));
            setResendIn((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const isExpired = expiresIn === 0;

    const resetOtp = () => {
        setOtpValues(createEmptyOtp());
        setFocusSignal((prev) => prev + 1);
    };

    const handleVerify = async (code: string) => {
        if (verifyingRef.current) return;

        if (code.length < OTP_LENGTH) {
            setSuccessMessage("");
            setErrorMessage(t("forgotPassword.otp.pleaseEnterOtp"));
            return;
        }

        if (isExpired) {
            setSuccessMessage("");
            setErrorMessage(t("forgotPassword.otp.otpExpired"));
            return;
        }

        verifyingRef.current = true;
        setSubmitting(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const result = await verifyForgotPasswordOtp({
                email,
                otpCode: code,
            });
            onVerified(result.resetToken);
        } catch (error) {
            const errorCode = getErrorCode(error);

            if (errorCode === USER_ERROR_CODES.OTP_ATTEMPTS_EXCEEDED) {
                resetOtp();
                setExpiresIn(0);
                // backend đã xoá mã nên cho gửi lại ngay, không cần chờ cooldown
                setResendIn(0);
                setErrorMessage(t("forgotPassword.otp.attemptsExceeded"));
            } else if (errorCode === USER_ERROR_CODES.INVALID_OTP) {
                resetOtp();
                setErrorMessage(t("forgotPassword.otp.invalidOtp"));
            } else if (error instanceof Error) {
                setErrorMessage(
                    error.message || t("forgotPassword.otp.verifyFailed"),
                );
            }
        } finally {
            verifyingRef.current = false;
            setSubmitting(false);
        }
    };

    const handleResend = async () => {
        if (resendIn > 0 || resending) return;

        setResending(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            // gửi lại mã cho luồng quên mật khẩu dùng chung endpoint bước 1
            await forgotPassword({ email });

            resetOtp();
            setExpiresIn(OTP_EXPIRES_SECONDS);
            setResendIn(RESEND_COOLDOWN_SECONDS);
            setSuccessMessage(t("forgotPassword.otp.resendSuccess"));
        } catch (error) {
            const errorCode = getErrorCode(error);

            if (errorCode === USER_ERROR_CODES.OTP_COOLDOWN) {
                setResendIn(RESEND_COOLDOWN_SECONDS);
                setErrorMessage(t("forgotPassword.otp.resendCooldown"));
            } else if (error instanceof Error) {
                setErrorMessage(
                    error.message || t("forgotPassword.otp.resendFailed"),
                );
            }
        } finally {
            setResending(false);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleVerify(otpValues.join(""));
    };

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="flex w-full flex-col items-center gap-y-4"
        >
            <p className="text-text-muted w-full text-sm">
                {t.rich("forgotPassword.otp.sentTo", {
                    email: maskEmail(email),
                    strong: (chunks) => (
                        <span className="text-text-highlight font-semibold">
                            {chunks}
                        </span>
                    ),
                })}
            </p>

            <OtpCodeInput
                values={otpValues}
                error={Boolean(errorMessage)}
                disabled={submitting}
                focusSignal={focusSignal}
                onChange={(values) => {
                    setOtpValues(values);
                    setErrorMessage("");
                }}
                onComplete={handleVerify}
            />

            <p className="text-text-muted w-full text-center text-sm">
                {isExpired
                    ? t("forgotPassword.otp.otpExpired")
                    : t("forgotPassword.otp.expiresIn", {
                          time: formatCountdown(expiresIn),
                      })}
            </p>

            <div className="w-full">
                <Button
                    type="submit"
                    loading={submitting}
                    disabled={isExpired}
                    fullWidth
                    color="primary"
                    variant="contained"
                >
                    {t("forgotPassword.otp.verifyButton")}
                </Button>

                {errorMessage && (
                    <p className="text-text-error mt-1 text-xs font-semibold">
                        {errorMessage}
                    </p>
                )}

                {successMessage && (
                    <p className="text-text-success mt-1 text-xs font-semibold">
                        {successMessage}
                    </p>
                )}
            </div>

            <div className="flex w-full flex-col items-center gap-y-1 text-sm">
                <div className="flex items-center gap-x-1">
                    <p className="text-text-muted">
                        {t("forgotPassword.otp.notReceived")}
                    </p>
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resendIn > 0 || resending}
                        className="text-text-highlight disabled:text-text-muted cursor-pointer hover:underline disabled:cursor-not-allowed disabled:no-underline"
                    >
                        {resendIn > 0
                            ? t("forgotPassword.otp.resendIn", {
                                  seconds: resendIn,
                              })
                            : t("forgotPassword.otp.resend")}
                    </button>
                </div>
                <p className="text-text-muted text-center text-xs">
                    {t("forgotPassword.otp.checkSpam")}
                </p>
                <button
                    type="button"
                    onClick={onChangeEmail}
                    className="text-text-highlight mt-2 cursor-pointer hover:underline"
                >
                    {t("forgotPassword.otp.reEnterEmail")}
                </button>
            </div>
        </form>
    );
};

export default OtpStep;
