import RegisterPasswordHint from "@/modules/public/register/components/register.password.hint";
import RegisterTextField from "@/modules/public/register/components/register.text.field";
import {
    MAX_PASSWORD_LENGTH,
    FULL_NAME_MAX_LENGTH,
    RegisterFieldErrors,
    RegisterValues,
    validateField,
} from "@/modules/public/register/utils/register.validation";
import { useTranslations } from "next-intl";

const RegisterFormTextFields = ({
    values,
    errors,
    touched,
    onChange,
    onBlur,
}: {
    values: RegisterValues;
    errors: RegisterFieldErrors;
    touched: Record<string, boolean>;
    onChange: (name: keyof RegisterValues, value: string) => void;
    onBlur: (name: keyof RegisterValues) => void;
}) => {
    const t = useTranslations();

    const isValid = (name: keyof RegisterValues) =>
        Boolean(touched[name]) &&
        values[name].length > 0 &&
        !validateField(name, values);

    return (
        <>
            <RegisterTextField
                name="fullName"
                label={t("register.form.fullName")}
                placeholder={t("register.form.enterFullName")}
                value={values.fullName}
                errorKey={errors.fullName}
                valid={isValid("fullName")}
                maxLength={FULL_NAME_MAX_LENGTH}
                onChange={onChange}
                onBlur={onBlur}
            />
            <RegisterTextField
                name="username"
                label={t("register.form.username")}
                placeholder={t("register.form.enterUsername")}
                value={values.username}
                errorKey={errors.username}
                valid={isValid("username")}
                hint="register.form.usernameHint"
                onChange={onChange}
                onBlur={onBlur}
            />
            <RegisterTextField
                name="email"
                label={t("register.form.email")}
                placeholder={t("register.form.enterEmail")}
                value={values.email}
                errorKey={errors.email}
                valid={isValid("email")}
                onChange={onChange}
                onBlur={onBlur}
            />
            <RegisterTextField
                name="password"
                type="password"
                label={t("register.form.rawPassword")}
                placeholder={t("register.form.enterPassword")}
                value={values.password}
                invalid={Boolean(errors.password)}
                valid={isValid("password")}
                maxLength={MAX_PASSWORD_LENGTH}
                onChange={onChange}
                onBlur={onBlur}
                footer={
                    <RegisterPasswordHint
                        value={values.password}
                        showError={Boolean(errors.password)}
                    />
                }
            />
            <RegisterTextField
                name="confirmPassword"
                type="password"
                label={t("register.form.confirmPassword")}
                placeholder={t("register.form.enterConfirmPassword")}
                value={values.confirmPassword}
                errorKey={errors.confirmPassword}
                valid={isValid("confirmPassword")}
                maxLength={MAX_PASSWORD_LENGTH}
                onChange={onChange}
                onBlur={onBlur}
            />
        </>
    );
};

export default RegisterFormTextFields;
