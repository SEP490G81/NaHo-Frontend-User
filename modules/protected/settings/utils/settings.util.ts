export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 36;
export const USERNAME_PATTERN = /^[a-z][a-z0-9]*$/;

export const MIN_AGE = 8;
export const MAX_AGE = 65;

export type UsernameErrorKey = "usernameMinMaxError" | "usernamePatternError";
export type AgeErrorKey = "ageMinMaxError";

/**
 * Validates username string.
 * @param val The username input string.
 * @returns Translation error key string or null if valid.
 */
export function validateUsername(val: string): UsernameErrorKey | null {
    if (!val || val.trim() === "") return null;
    const trimmed = val.trim();
    if (
        trimmed.length < USERNAME_MIN_LENGTH ||
        trimmed.length > USERNAME_MAX_LENGTH
    ) {
        return "usernameMinMaxError";
    }
    if (!USERNAME_PATTERN.test(trimmed)) {
        return "usernamePatternError";
    }
    return null;
}

/**
 * Calculates age in years based on date of birth string (YYYY-MM-DD).
 * @param dobString Date of birth string.
 * @returns Calculated age number or null if invalid date.
 */
export function calculateAge(dobString: string): number | null {
    if (!dobString) return null;
    const birthDate = new Date(dobString);
    if (isNaN(birthDate.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }
    return age;
}

/**
 * Validates age from date of birth string (YYYY-MM-DD).
 * @param dobString Date of birth string.
 * @returns Translation error key string or null if valid.
 */
export function validateAge(dobString: string): AgeErrorKey | null {
    if (!dobString) return null;
    const age = calculateAge(dobString);
    if (age === null) return null;
    if (age < MIN_AGE || age > MAX_AGE) {
        return "ageMinMaxError";
    }
    return null;
}

export const PASSWORD_PATTERN =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!_~\-]).{8,}$/;

export type OldPasswordErrorKey = "oldPasswordRequired";
export type NewPasswordErrorKey =
    | "newPasswordRequired"
    | "passwordPatternError";
export type ConfirmPasswordErrorKey =
    | "confirmPasswordRequired"
    | "passwordMatchError";

export function validateOldPassword(val: string): OldPasswordErrorKey | null {
    if (!val || !val.trim()) return "oldPasswordRequired";
    return null;
}

export function validateNewPassword(val: string): NewPasswordErrorKey | null {
    if (!val || !val.trim()) return "newPasswordRequired";
    if (!PASSWORD_PATTERN.test(val)) return "passwordPatternError";
    return null;
}

export function validateConfirmPassword(
    newPassword: string,
    confirmPassword: string,
): ConfirmPasswordErrorKey | null {
    if (!confirmPassword || !confirmPassword.trim())
        return "confirmPasswordRequired";
    if (newPassword !== confirmPassword) return "passwordMatchError";
    return null;
}

export interface ChangePasswordValidationResult {
    currentPasswordErrorKey: OldPasswordErrorKey | null;
    newPasswordErrorKey: NewPasswordErrorKey | null;
    confirmPasswordErrorKey: ConfirmPasswordErrorKey | null;
    isValid: boolean;
}

export function validateChangePassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
): ChangePasswordValidationResult {
    const currentPasswordErrorKey = validateOldPassword(currentPassword);
    const newPasswordErrorKey = validateNewPassword(newPassword);
    const confirmPasswordErrorKey = validateConfirmPassword(
        newPassword,
        confirmPassword,
    );

    return {
        currentPasswordErrorKey,
        newPasswordErrorKey,
        confirmPasswordErrorKey,
        isValid:
            !currentPasswordErrorKey &&
            !newPasswordErrorKey &&
            !confirmPasswordErrorKey,
    };
}
