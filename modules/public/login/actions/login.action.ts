import { LoginState } from "../types/login.ui.type";

export function validateLoginForm(formData: FormData) {
    const usernameOrEmailEntry = formData.get("usernameOrEmail");
    const rawPasswordEntry = formData.get("rawPassword");

    const usernameOrEmail =
        typeof usernameOrEmailEntry === "string" ? usernameOrEmailEntry : "";
    const rawPassword =
        typeof rawPasswordEntry === "string" ? rawPasswordEntry : "";

    const result: LoginState = {
        usernameOrEmail: {
            value: usernameOrEmail,
            error: false,
        },
        rawPassword: {
            value: rawPassword,
            error: false,
        },
    };

    result.usernameOrEmail.value = usernameOrEmail;
    result.rawPassword.value = rawPassword;

    if (usernameOrEmail.trim().length === 0) {
        result.usernameOrEmail.error = true;
    }

    if (rawPassword.trim().length === 0) {
        result.rawPassword.error = true;
    }

    return result;
}
