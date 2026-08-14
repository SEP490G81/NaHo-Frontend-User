import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { RegisterValues } from "@/modules/public/register/utils/register.validation";
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

export default RegisterTextField;
