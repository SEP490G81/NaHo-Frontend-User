import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { RegisterFieldErrors, RegisterValues } from "@/modules/public/register/utils/register.validation";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, InputAdornment } from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";

const PasswordAdornment = ({
    show,
    onToggle,
}: {
    show: boolean;
    onToggle: () => void;
}) => (
    <InputAdornment position="end">
        <IconButton size="small" onClick={onToggle}>
            {show ? (
                <VisibilityOutlinedIcon fontSize="small" color="disabled" />
            ) : (
                <VisibilityOffOutlinedIcon fontSize="small" color="disabled" />
            )}
        </IconButton>
    </InputAdornment>
);

const RegisterTextField = ({
    name,
    label,
    placeholder,
    value,
    errorKey,
    onChange,
    onBlur,
    type = "text",
    endAdornment,
}: {
    name: keyof RegisterValues;
    label: string;
    placeholder: string;
    value: string;
    errorKey?: string;
    onChange: (name: keyof RegisterValues, value: string) => void;
    onBlur: (name: keyof RegisterValues) => void;
    type?: string;
    endAdornment?: ReactNode;
}) => {
    const t = useTranslations();
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
                error={Boolean(errorKey)}
                helperText={
                    errorKey ? (
                        <span className="text-text-error font-semibold">
                            {t(errorKey as Parameters<typeof t>[0])}
                        </span>
                    ) : null
                }
                slotProps={
                    endAdornment ? { input: { endAdornment } } : undefined
                }
            />
        </div>
    );
};

const RegisterFormTextFields = ({
    values,
    errors,
    onChange,
    onBlur,
}: {
    values: RegisterValues;
    errors: RegisterFieldErrors;
    onChange: (name: keyof RegisterValues, value: string) => void;
    onBlur: (name: keyof RegisterValues) => void;
}) => {
    const t = useTranslations();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <RegisterTextField
                name="username"
                label={t("page.register.form.username")}
                placeholder={t("page.register.form.enterUsername")}
                value={values.username}
                errorKey={errors.username}
                onChange={onChange}
                onBlur={onBlur}
            />
            <RegisterTextField
                name="email"
                label={t("page.register.form.email")}
                placeholder={t("page.register.form.enterEmail")}
                value={values.email}
                errorKey={errors.email}
                onChange={onChange}
                onBlur={onBlur}
            />
            <RegisterTextField
                name="password"
                type={showPassword ? "text" : "password"}
                label={t("page.register.form.rawPassword")}
                placeholder={t("page.register.form.enterPassword")}
                value={values.password}
                errorKey={errors.password}
                onChange={onChange}
                onBlur={onBlur}
                endAdornment={
                    <PasswordAdornment
                        show={showPassword}
                        onToggle={() => setShowPassword((prev) => !prev)}
                    />
                }
            />
            <RegisterTextField
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label={t("page.register.form.confirmPassword")}
                placeholder={t("page.register.form.enterConfirmPassword")}
                value={values.confirmPassword}
                errorKey={errors.confirmPassword}
                onChange={onChange}
                onBlur={onBlur}
                endAdornment={
                    <PasswordAdornment
                        show={showConfirmPassword}
                        onToggle={() => setShowConfirmPassword((prev) => !prev)}
                    />
                }
            />
        </>
    );
};

export default RegisterFormTextFields;
