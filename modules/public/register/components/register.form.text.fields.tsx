import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import RegisterPasswordHint from "@/modules/public/register/components/register.password.hint";
import {
    MAX_PASSWORD_LENGTH,
    RegisterFieldErrors,
    RegisterValues,
    validateField,
} from "@/modules/public/register/utils/register.validation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { InputAdornment } from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

const ValidAdornment = () => (
    <InputAdornment position="end">
        <CheckCircleIcon
            sx={{ fontSize: 20, color: "var(--color-text-success)" }}
        />
    </InputAdornment>
);

const RegisterTextField = ({
    name,
    label,
    placeholder,
    value,
    errorKey,
    invalid,
    valid,
    hint,
    maxLength,
    onChange,
    onBlur,
    type = "text",
    endAdornment,
    footer,
}: {
    name: keyof RegisterValues;
    label: string;
    placeholder: string;
    value: string;
    errorKey?: string;
    invalid?: boolean;
    valid?: boolean;
    hint?: string;
    maxLength?: number;
    onChange: (name: keyof RegisterValues, value: string) => void;
    onBlur: (name: keyof RegisterValues) => void;
    type?: string;
    endAdornment?: ReactNode;
    footer?: ReactNode;
}) => {
    const t = useTranslations();
    const isError = invalid ?? Boolean(errorKey);
    const isValid = Boolean(valid) && !isError;
    const finalAdornment = isValid ? (
        <>
            <ValidAdornment />
            {endAdornment}
        </>
    ) : (
        endAdornment
    );
    const slotProps = {
        ...(finalAdornment ? { input: { endAdornment: finalAdornment } } : {}),
        ...(maxLength ? { htmlInput: { maxLength } } : {}),
    };
    return (
        <div className="flex w-full flex-col items-start gap-y-1.5">
            <label htmlFor={name} className="font-semibold">
                {label}
            </label>
            <TextFieldCustom
                name={name}
                id={name}
                type={type}
                placeholder={placeholder}
                size="small"
                fullWidth
                value={value}
                onChange={(event) => onChange(name, event.target.value)}
                onBlur={() => onBlur(name)}
                error={isError}
                sx={
                    isValid
                        ? {
                              "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "var(--color-text-success)",
                              },
                          }
                        : undefined
                }
                helperText={
                    errorKey ? (
                        <span className="text-text-error font-semibold">
                            {t(errorKey as Parameters<typeof t>[0])}
                        </span>
                    ) : null
                }
                slotProps={
                    Object.keys(slotProps).length > 0 ? slotProps : undefined
                }
            />
            {footer}
            {hint ? (
                <p className="text-text-muted text-xs">
                    {t(hint as Parameters<typeof t>[0])}
                </p>
            ) : null}
        </div>
    );
};

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
