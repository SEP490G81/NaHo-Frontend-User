const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
const USERNAME_REGEX = /^[a-z][a-z0-9]*$/;
const USERNAME_MIN_LENGTH = 4;
const USERNAME_MAX_LENGTH = 36;
const MIN_PASSWORD_LENGTH = 6;

export interface RegisterValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type RegisterFieldErrors = Partial<Record<keyof RegisterValues, string>>;

export function validateUsername(value: string): string | undefined {
    const v = value.trim();
    if (v.length === 0) return "page.register.form.pleaseEnterUsername";
    if (v.length < USERNAME_MIN_LENGTH || v.length > USERNAME_MAX_LENGTH)
        return "page.register.form.usernameInvalidLength";
    if (!USERNAME_REGEX.test(v))
        return "page.register.form.usernameInvalidFormat";
    return undefined;
}

export function validateEmail(value: string): string | undefined {
    const v = value.trim();
    if (v.length === 0) return "page.register.form.pleaseEnterEmail";
    if (!EMAIL_REGEX.test(v)) return "page.register.form.invalidEmail";
    return undefined;
}

export function validatePassword(value: string): string | undefined {
    if (value.length === 0) return "page.register.form.pleaseEnterPassword";
    if (value.length < MIN_PASSWORD_LENGTH)
        return "page.register.form.passwordTooShort";
    return undefined;
}

export function validateConfirmPassword(
    confirmPassword: string,
    password: string,
): string | undefined {
    if (confirmPassword.length === 0)
        return "page.register.form.pleaseConfirmPassword";
    if (confirmPassword !== password)
        return "page.register.form.passwordNotMatch";
    return undefined;
}

export function validateField(
    name: keyof RegisterValues,
    values: RegisterValues,
): string | undefined {
    switch (name) {
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
