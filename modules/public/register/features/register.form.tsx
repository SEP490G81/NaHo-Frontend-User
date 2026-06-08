"use client";
import { useRouter } from "@/intl/i18n/navigation";
import RegisterAgreeTerms from "@/modules/public/register/components/register.agree.terms";
import RegisterFormButtons from "@/modules/public/register/components/register.form.buttons";
import RegisterFormTextFields from "@/modules/public/register/components/register.form.text.fields";
import {
    RegisterFieldErrors,
    RegisterValues,
    validateAllFields,
    validateField,
} from "@/modules/public/register/utils/register.validation";
import { register } from "@/services/client/user.service";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

const initialValues: RegisterValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const RegisterForm = () => {
    const t = useTranslations();
    const { replace } = useRouter();

    const [values, setValues] = useState<RegisterValues>(initialValues);
    const [errors, setErrors] = useState<RegisterFieldErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreeTermsError, setAgreeTermsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (name: keyof RegisterValues, value: string) => {
        const nextValues = { ...values, [name]: value };
        setValues(nextValues);
        setErrorMessage("");
        setErrors((prev) => {
            const next = { ...prev };
            if (name === "confirmPassword") {
                // Không báo khớp/không khớp khi đang gõ; chỉ xoá lỗi cũ.
                next.confirmPassword = undefined;
            } else if (touched[name]) {
                next[name] = validateField(name, nextValues);
            }
            return next;
        });
    };

    const handleBlur = (name: keyof RegisterValues) => {
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, values) }));
    };

    const handleAgreeChange = (checked: boolean) => {
        setAgreeTerms(checked);
        setErrorMessage("");
        if (checked) setAgreeTermsError(false);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        const fieldErrors = validateAllFields(values);
        const notAgreed = !agreeTerms;
        setErrors(fieldErrors);
        setAgreeTermsError(notAgreed);
        setTouched({
            username: true,
            email: true,
            password: true,
            confirmPassword: true,
        });

        if (Object.keys(fieldErrors).length > 0 || notAgreed) return;

        try {
            setSubmitting(true);
            await register({
                username: values.username.trim(),
                email: values.email.trim(),
                password: values.password,
            });
            replace("/login");
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(
                    error.message || t("page.register.form.registerFailed"),
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
            <RegisterFormTextFields
                values={values}
                errors={errors}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <RegisterAgreeTerms
                agreeTerms={agreeTerms}
                onChange={handleAgreeChange}
                error={agreeTermsError}
            />
            <RegisterFormButtons
                pending={submitting}
                errorMessage={errorMessage}
            />
        </form>
    );
};

export default RegisterForm;
