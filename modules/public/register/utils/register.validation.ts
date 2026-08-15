const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
const USERNAME_REGEX = /^[a-z][a-z0-9]*$/;
const USERNAME_MIN_LENGTH = 4;
const USERNAME_MAX_LENGTH = 36;
const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 16;
const FULL_NAME_MIN_LENGTH = 2;
export const FULL_NAME_MAX_LENGTH = 100;

const SPECIAL_REGEX = /[@#$%^&+=!_~-]/;

export interface PasswordRule {
    needKey: string;
    test: (value: string) => boolean;
}

export const PASSWORD_RULES: PasswordRule[] = [
    {
        needKey: "register.form.passwordNeed.minLength",
        test: (v) => v.length >= MIN_PASSWORD_LENGTH,
    },
    {
        needKey: "register.form.passwordNeed.lowercase",
        test: (v) => /[a-z]/.test(v),
    },
    {
        needKey: "register.form.passwordNeed.uppercase",
        test: (v) => /[A-Z]/.test(v),
    },
    {
        needKey: "register.form.passwordNeed.number",
        test: (v) => /\d/.test(v),
    },
    {
        needKey: "register.form.passwordNeed.special",
        test: (v) => SPECIAL_REGEX.test(v),
    },
];

export interface RegisterValues {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type RegisterFieldErrors = Partial<Record<keyof RegisterValues, string>>;

export function validateFullName(value: string): string | undefined {
    const v = value.trim();
    if (v.length === 0) return "register.form.pleaseEnterFullName";
    if (v.length < FULL_NAME_MIN_LENGTH || v.length > FULL_NAME_MAX_LENGTH)
        return "register.form.fullNameInvalidLength";
    return undefined;
}

export function validateUsername(value: string): string | undefined {
    const v = value.trim();
    if (v.length === 0) return "register.form.pleaseEnterUsername";
    if (v.length < USERNAME_MIN_LENGTH || v.length > USERNAME_MAX_LENGTH)
        return "register.form.usernameInvalidLength";
    if (!USERNAME_REGEX.test(v)) return "register.form.usernameInvalidFormat";
    return undefined;
}

export function validateEmail(value: string): string | undefined {
    const v = value.trim();
    if (v.length === 0) return "register.form.pleaseEnterEmail";
    if (!EMAIL_REGEX.test(v)) return "register.form.invalidEmail";
    return undefined;
}

export function validatePassword(value: string): string | undefined {
    if (value.length === 0) return "register.form.pleaseEnterPassword";
    if (PASSWORD_RULES.some((rule) => !rule.test(value)))
        return "register.form.passwordTooWeak";
    return undefined;
}

export function validateConfirmPassword(
    confirmPassword: string,
    password: string,
): string | undefined {
    if (confirmPassword.length === 0)
        return "register.form.pleaseConfirmPassword";
    if (confirmPassword !== password) return "register.form.passwordNotMatch";
    return undefined;
}

export function validateField(
    name: keyof RegisterValues,
    values: RegisterValues,
): string | undefined {
    switch (name) {
        case "fullName":
            return validateFullName(values.fullName);
        case "username":
            return validateUsername(values.username);
        case "email":
            return validateEmail(values.email);
        case "password":
            return validatePassword(values.password);
        case "confirmPassword":
            return validateConfirmPassword(
                values.confirmPassword,
                values.password,
            );
        default:
            return undefined;
    }
}

export function validateAllFields(values: RegisterValues): RegisterFieldErrors {
    const errors: RegisterFieldErrors = {};
    (Object.keys(values) as (keyof RegisterValues)[]).forEach((name) => {
        const errorKey = validateField(name, values);
        if (errorKey) errors[name] = errorKey;
    });
    return errors;
}
