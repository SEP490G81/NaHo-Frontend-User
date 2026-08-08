"use client";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { USER_ERROR_CODES } from "@/constants/error.code.constants";
import { getErrorCode } from "@/libs/api.error";
import { validateEmail } from "@/modules/public/register/utils/register.validation";
import { forgotPassword } from "@/services/client/user.service";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

const EmailStep = ({
    email,
    onSent,
}: {
    email: string;
    onSent: (email: string) => void;
}) => {
    const t = useTranslations();

    const [value, setValue] = useState(email);
    const [errorKey, setErrorKey] = useState<string | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        const nextErrorKey = validateEmail(value);
        setErrorKey(nextErrorKey);
        if (nextErrorKey) return;

        const trimmedEmail = value.trim();

        try {
            setSubmitting(true);
            await forgotPassword({ email: trimmedEmail });
            onSent(trimmedEmail);
        } catch (error) {
            const errorCode = getErrorCode(error);

            if (errorCode === USER_ERROR_CODES.NOT_FOUND) {
                setErrorKey("forgotPassword.email.emailNotFound");
            } else if (
                errorCode ===
                USER_ERROR_CODES.SOCIAL_LOGIN_CANNOT_RESET_PASSWORD
            ) {
                setErrorMessage(t("forgotPassword.email.socialLoginAccount"));
            } else if (errorCode === USER_ERROR_CODES.OTP_COOLDOWN) {
                // mã cũ vẫn còn hiệu lực, cho đi tiếp sang bước nhập OTP
                onSent(trimmedEmail);
            } else if (error instanceof Error) {
                setErrorMessage(
                    error.message || t("forgotPassword.email.sendFailed"),
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
            className="flex w-full flex-col items-center gap-y-4"
        >
            <div className="flex w-full flex-col items-start gap-y-1.5">
                <label htmlFor="email" className="font-semibold">
                    {t("forgotPassword.email.label")}
                </label>
                <TextFieldCustom
                    name="email"
                    id="email"
                    type="email"
                    placeholder={t("forgotPassword.email.placeholder")}
                    size="small"
                    fullWidth
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                        setErrorKey(undefined);
                        setErrorMessage("");
                    }}
                    onBlur={() => setErrorKey(validateEmail(value))}
                    error={Boolean(errorKey)}
                    helperText={
                        errorKey ? (
                            <span className="text-text-error font-semibold">
                                {t(errorKey as Parameters<typeof t>[0])}
                            </span>
                        ) : null
                    }
                />
                <p className="text-text-muted text-xs">
                    {t("forgotPassword.email.hint")}
                </p>
            </div>

            <div className="w-full">
                <Button
                    type="submit"
                    loading={submitting}
                    fullWidth
                    color="primary"
                    variant="contained"
                >
                    {t("forgotPassword.email.sendButton")}
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

export default EmailStep;
