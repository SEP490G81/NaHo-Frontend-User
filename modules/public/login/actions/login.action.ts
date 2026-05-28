"use server";

import { signIn } from "@/auth";
import { getPathname } from "@/intl/i18n/navigation";
import { AuthError } from "@auth/core/errors";
import { getLocale } from "next-intl/server";
import { LoginState } from "../types/login.ui.type";

export async function handleCredentialsLogin(
    rememberMe: boolean,
    prevState: LoginState,
    formData: FormData,
) {
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
        error: false,
    };

    result.usernameOrEmail.value = usernameOrEmail;
    result.rawPassword.value = rawPassword;

    if (usernameOrEmail.trim().length === 0) {
        result.usernameOrEmail.error = true;
    }

    if (rawPassword.trim().length === 0) {
        result.rawPassword.error = true;
    }

    if (result.usernameOrEmail.error || result.rawPassword.error) return result;

    try {
        const locale = await getLocale();
        const localizedHome = getPathname({
            href: "/home",
            locale,
        });

        await signIn("credentials", {
            usernameOrEmail: usernameOrEmail,
            rawPassword: rawPassword,
            redirectTo: localizedHome,
        });

        return result;
    } catch (error) {
        if (error instanceof AuthError) {
            result.error = true;
            return result;
        }
        throw error;
    }
}
