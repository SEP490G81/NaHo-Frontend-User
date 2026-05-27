"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Checkbox } from "@mui/material";
import { Link, useRouter } from "@/intl/i18n/navigation";
import LoginFormTextFields from "@/pages/(public)/login/components/login.form.text.fields";
import LoginFormButtons from "@/pages/(public)/login/components/login.form.buttons";
import { credentialsLogin } from "@/services/user.service";

const LoginForm = () => {
    const t = useTranslations();
    const { push } = useRouter();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const usernameOrEmail = formData.get("usernameOrEmail");
        const password = formData.get("password");
        const remember = formData.get("remember");

        try {
            await credentialsLogin({
                username: usernameOrEmail?.toString() || "",
                rawPassword: password?.toString() || "",
            });
            push("/home");
        } catch (error) {
            console.log("hello");
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center gap-y-3"
        >
            <LoginFormTextFields />

            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-x-1.5">
                    <Checkbox
                        id="remember"
                        name="remember"
                        size="small"
                        sx={{ padding: 0 }}
                    />
                    <label
                        htmlFor="remember"
                        className="cursor-pointer text-sm select-none"
                    >
                        {t("page.login.form.rememberLogin")}
                    </label>
                </div>
                <Link
                    href={"/forgot-password"}
                    className="text-text-highlight text-sm select-none hover:underline"
                >
                    {t("page.login.form.forgotPassword")}
                </Link>
            </div>

            <LoginFormButtons />
        </form>
    );
};

export default LoginForm;
