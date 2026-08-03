"use client";
import { USER_ERROR_CODES } from "@/constants/error.code.constants";
import { Link, useRouter } from "@/i18n/navigation";
import { getErrorCode } from "@/libs/api.error";
import { queryKeys } from "@/libs/query.keys";
import OtpCodeInput from "@/modules/public/verify-email/components/otp.code.input";
import {
    OTP_EXPIRES_SECONDS,
    OTP_LENGTH,
    RESEND_COOLDOWN_SECONDS,
} from "@/modules/public/verify-email/constants/verify.email.constant";
import {
    createEmptyOtp,
    formatCountdown,
    maskEmail,
} from "@/modules/public/verify-email/utils/verify.email.util";
import { resendOtp, verifyEmail } from "@/services/client/user.service";
import { Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { FormEvent, useEffect, useRef, useState } from "react";

const VerifyEmailForm = ({ email }: { email: string }) => {
    const t = useTranslations();
    const { replace } = useRouter();
    const queryClient = useQueryClient();

    const [otpValues, setOtpValues] = useState<string[]>(createEmptyOtp);
    const [errorMessage, setErrorMessage] = useState("");
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
            setErrorMessage(t("register.verifyEmail.pleaseEnterOtp"));
            return;
        }

        if (isExpired) {
            setSuccessMessage("");
            setErrorMessage(t("register.verifyEmail.otpExpired"));
            return;
        }

        verifyingRef.current = true;
        setSubmitting(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            await verifyEmail({ email, otpCode: code });

            await queryClient.invalidateQueries({
                queryKey: queryKeys.auth.currentUser,
            });

            replace("/dashboard");
        } catch (error) {
            const errorCode = getErrorCode(error);

            if (errorCode === USER_ERROR_CODES.OTP_ATTEMPTS_EXCEEDED) {
                resetOtp();
                setExpiresIn(0);
                setErrorMessage(t("register.verifyEmail.attemptsExceeded"));
            } else if (errorCode === USER_ERROR_CODES.INVALID_OTP) {
                resetOtp();
                setErrorMessage(t("register.verifyEmail.invalidOtp"));
            } else if (error instanceof Error) {
                setErrorMessage(
                    error.message || t("register.verifyEmail.verifyFailed"),
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
            await resendOtp({ email });

            resetOtp();
            setExpiresIn(OTP_EXPIRES_SECONDS);
            setResendIn(RESEND_COOLDOWN_SECONDS);
            setSuccessMessage(t("register.verifyEmail.resendSuccess"));
        } catch (error) {
            const errorCode = getErrorCode(error);

            if (errorCode === USER_ERROR_CODES.OTP_COOLDOWN) {
                setResendIn(RESEND_COOLDOWN_SECONDS);
                setErrorMessage(t("register.verifyEmail.resendCooldown"));
            } else if (error instanceof Error) {
                setErrorMessage(
                    error.message || t("register.verifyEmail.resendFailed"),
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
                {t.rich("register.verifyEmail.sentTo", {
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
                    ? t("register.verifyEmail.otpExpired")
                    : t("register.verifyEmail.expiresIn", {
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
                    {t("register.verifyEmail.verifyButton")}
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
                        {t("register.verifyEmail.notReceived")}
                    </p>
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resendIn > 0 || resending}
                        className="text-text-highlight disabled:text-text-muted cursor-pointer hover:underline disabled:cursor-not-allowed disabled:no-underline"
                    >
                        {resendIn > 0
                            ? t("register.verifyEmail.resendIn", {
                                  seconds: resendIn,
                              })
                            : t("register.verifyEmail.resend")}
                    </button>
                </div>
                <p className="text-text-muted text-center text-xs">
                    {t("register.verifyEmail.checkSpam")}
                </p>
                <Link
                    href={"/register"}
                    className="text-text-highlight mt-2 hover:underline"
                >
                    {t("register.verifyEmail.useAnotherEmail")}
                </Link>
            </div>
        </form>
    );
};

export default VerifyEmailForm;
