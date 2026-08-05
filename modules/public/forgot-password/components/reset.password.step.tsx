"use client";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { USER_ERROR_CODES } from "@/constants/error.code.constants";
import { getErrorCode } from "@/libs/api.error";
import RegisterPasswordHint from "@/modules/public/register/components/register.password.hint";
import {
    MAX_PASSWORD_LENGTH,
    validateConfirmPassword,
    validatePassword,
} from "@/modules/public/register/utils/register.validation";
import { resetPassword } from "@/services/client/user.service";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, InputAdornment } from "@mui/material";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

// dấu tích xanh khi ô đã hợp lệ, đồng bộ với màn đăng ký
const ValidAdornment = () => (
    <InputAdornment position="end">
        <CheckCircleIcon
            sx={{ fontSize: 20, color: "var(--color-text-success)" }}
        />
    </InputAdornment>
);

const ResetPasswordStep = ({
    email,
    resetToken,
    onSuccess,
    onTokenExpired,
}: {
    email: string;
    resetToken: string;
    onSuccess: () => void;
    onTokenExpired: () => void;
}) => {
    const t = useTranslations();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState<string | undefined>(
        undefined,
    );
    const [confirmError, setConfirmError] = useState<string | undefined>(
        undefined,
    );
    const [errorMessage, setErrorMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // chỉ báo hợp lệ khi đã nhập và không còn lỗi, giống màn đăng ký
    const isPasswordValid =
        password.length > 0 && !passwordError && !validatePassword(password);
    const isConfirmValid =
        confirmPassword.length > 0 &&
        !confirmError &&
        !validateConfirmPassword(confirmPassword, password);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        const nextPasswordError = validatePassword(password);
        const nextConfirmError = validateConfirmPassword(
            confirmPassword,
            password,
        );
        setPasswordError(nextPasswordError);
        setConfirmError(nextConfirmError);

        if (nextPasswordError || nextConfirmError) return;

        try {
            setSubmitting(true);
            await resetPassword({
                email,
                resetToken,
                newPassword: password,
                confirmPassword,
            });
            onSuccess();
        } catch (error) {
            const errorCode = getErrorCode(error);

            if (errorCode === USER_ERROR_CODES.PASSWORD_SAME_AS_OLD) {
                setErrorMessage(t("forgotPassword.reset.passwordSameAsOld"));
            } else if (errorCode === USER_ERROR_CODES.PASSWORD_NOT_MATCH) {
                setConfirmError("register.form.passwordNotMatch");
            } else if (errorCode === USER_ERROR_CODES.INVALID_RESET_TOKEN) {
                // token hết hạn (15 phút) hoặc đã dùng, phải xác thực OTP lại
                onTokenExpired();
            } else if (error instanceof Error) {
                setErrorMessage(
                    error.message || t("forgotPassword.reset.resetFailed"),
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="flex w-full flex-col items-center gap-y-3"
        >
            <div className="flex w-full flex-col items-start gap-y-1.5">
                <label htmlFor="newPassword" className="font-semibold">
                    {t("forgotPassword.reset.newPassword")}
                </label>
                <TextFieldCustom
                    name="newPassword"
                    id="newPassword"
                    type="password"
                    placeholder={t("forgotPassword.reset.enterNewPassword")}
                    size="small"
                    fullWidth
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                        setPasswordError(undefined);
                        setConfirmError(undefined);
                        setErrorMessage("");
                    }}
                    onBlur={() => setPasswordError(validatePassword(password))}
                    error={Boolean(passwordError)}
                    sx={
                        isPasswordValid
                            ? {
                                  "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "var(--color-text-success)",
                                  },
                              }
                            : undefined
                    }
                    slotProps={{
                        htmlInput: { maxLength: MAX_PASSWORD_LENGTH },
                        ...(isPasswordValid
                            ? { input: { endAdornment: <ValidAdornment /> } }
                            : {}),
                    }}
                />
                <RegisterPasswordHint
                    value={password}
                    showError={Boolean(passwordError)}
                />
            </div>

            <div className="flex w-full flex-col items-start gap-y-1.5">
                <label htmlFor="confirmNewPassword" className="font-semibold">
                    {t("forgotPassword.reset.confirmNewPassword")}
                </label>
                <TextFieldCustom
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                    type="password"
                    placeholder={t("forgotPassword.reset.enterConfirmPassword")}
                    size="small"
                    fullWidth
                    value={confirmPassword}
                    onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        setConfirmError(undefined);
                        setErrorMessage("");
                    }}
                    onBlur={() =>
                        setConfirmError(
                            validateConfirmPassword(confirmPassword, password),
                        )
                    }
                    error={Boolean(confirmError)}
                    sx={
                        isConfirmValid
                            ? {
                                  "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "var(--color-text-success)",
                                  },
                              }
                            : undefined
                    }
                    slotProps={{
                        htmlInput: { maxLength: MAX_PASSWORD_LENGTH },
                        ...(isConfirmValid
                            ? { input: { endAdornment: <ValidAdornment /> } }
                            : {}),
                    }}
                    helperText={
                        confirmError ? (
                            <span className="text-text-error font-semibold">
                                {t(confirmError as Parameters<typeof t>[0])}
                            </span>
                        ) : null
                    }
                />
            </div>

            <div className="mt-1 w-full">
                <Button
                    type="submit"
                    loading={submitting}
                    fullWidth
                    color="primary"
                    variant="contained"
                >
                    {t("forgotPassword.reset.resetButton")}
                </Button>

                {errorMessage && (
                    <p className="text-text-error mt-1 text-xs font-semibold">
                        {errorMessage}
                    </p>
                )}
            </div>
        </form>
    );
};

export default ResetPasswordStep;
