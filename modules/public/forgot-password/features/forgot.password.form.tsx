"use client";
import EmailStep from "@/modules/public/forgot-password/components/email.step";
import ForgotPasswordStepper from "@/modules/public/forgot-password/components/forgot.password.stepper";
import OtpStep from "@/modules/public/forgot-password/components/otp.step";
import ResetPasswordStep from "@/modules/public/forgot-password/components/reset.password.step";
import ResetSuccessStep from "@/modules/public/forgot-password/components/reset.success.step";
import { ForgotPasswordStep } from "@/modules/public/forgot-password/constants/forgot.password.constant";
import { useTranslations } from "next-intl";
import { useState } from "react";

const ForgotPasswordForm = () => {
    const t = useTranslations();

    const [step, setStep] = useState<ForgotPasswordStep>("email");
    const [email, setEmail] = useState("");
    // token do backend cấp sau khi xác thực OTP, chỉ giữ trong bộ nhớ
    // (không đưa lên URL) và là điều kiện để vào được bước đặt mật khẩu mới
    const [resetToken, setResetToken] = useState("");
    // lỗi cần báo lại cho bước OTP khi bị đẩy ngược từ bước đặt mật khẩu về
    const [otpNotice, setOtpNotice] = useState("");

    const handleChangeEmail = () => {
        setResetToken("");
        setOtpNotice("");
        setStep("email");
    };

    // token đổi mật khẩu chỉ sống 15 phút, hết hạn thì phải lấy mã OTP mới
    const handleTokenExpired = () => {
        setResetToken("");
        setOtpNotice(t("forgotPassword.reset.tokenExpired"));
        setStep("otp");
    };

    return (
        <div className="flex w-full flex-col items-center gap-y-5">
            <ForgotPasswordStepper step={step} />

            <div className="w-full">
                <h1 className="text-2xl leading-tight font-bold md:text-3xl">
                    {t(`forgotPassword.${step}.title`)}
                </h1>
                <p className="text-text-muted mt-2 text-sm">
                    {t(`forgotPassword.${step}.description`)}
                </p>
            </div>

            {step === "email" && (
                <EmailStep
                    email={email}
                    onSent={(sentEmail) => {
                        setEmail(sentEmail);
                        setOtpNotice("");
                        setStep("otp");
                    }}
                />
            )}

            {step === "otp" && (
                <OtpStep
                    email={email}
                    initialErrorMessage={otpNotice}
                    onVerified={(token) => {
                        setResetToken(token);
                        setStep("reset");
                    }}
                    onChangeEmail={handleChangeEmail}
                />
            )}

            {step === "reset" && resetToken && (
                <ResetPasswordStep
                    email={email}
                    resetToken={resetToken}
                    onSuccess={() => setStep("done")}
                    onTokenExpired={handleTokenExpired}
                />
            )}

            {step === "done" && <ResetSuccessStep />}
        </div>
    );
};

export default ForgotPasswordForm;
