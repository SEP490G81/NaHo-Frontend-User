"use client";
import { USER_ERROR_CODES } from "@/constants/error.code.constants";
import { getErrorCode } from "@/libs/api.error";
import LoginFormButtons from "@/modules/public/login/features/login.form.buttons";
import LoginFormTextFields from "@/modules/public/login/components/login.form.text.fields";
import { LoginState } from "@/modules/public/login/types/login.ui.type";
import React, { useState } from "react";
import { validateLoginForm } from "@/modules/public/login/actions/login.action";
import { Link, useRouter } from "@/i18n/navigation";
import { credentialsLogin } from "@/services/client/user.service";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import { useTranslations } from "next-intl";
import { getDeviceId } from "@/modules/public/login/utils/login.util";

const initialState: LoginState = {
    usernameOrEmail: {
        value: "",
        error: false,
    },
    rawPassword: {
        value: "",
        error: false,
    },
};

const LoginForm = () => {
    const [state, setState] = useState<LoginState>(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const { replace } = useRouter();
    const queryClient = useQueryClient();
    const t = useTranslations();

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrorMessage("");
        const newState = validateLoginForm(new FormData(event.currentTarget));
        setState(newState);

        if (!newState.usernameOrEmail.error && !newState.rawPassword.error) {
            try {
                await credentialsLogin({
                    usernameOrEmail: newState.usernameOrEmail.value,
                    rawPassword: newState.rawPassword.value,
                    deviceId: getDeviceId(),
                });

                await queryClient.invalidateQueries({
                    queryKey: queryKeys.auth.currentUser,
                });

                replace("/dashboard");
            } catch (error) {
                console.log(error);

                const usernameOrEmail = newState.usernameOrEmail.value.trim();
                // tài khoản chưa xác thực email: backend đã gửi lại OTP,
                // chỉ chuyển sang màn nhập OTP khi người dùng đăng nhập bằng email
                if (
                    getErrorCode(error) === USER_ERROR_CODES.EMAIL_UNVERIFIED &&
                    usernameOrEmail.includes("@")
                ) {
                    replace(
                        `/verify-email?email=${encodeURIComponent(usernameOrEmail)}`,
                    );
                    return;
                }

                if (error instanceof Error) {
                    setErrorMessage(error.message);
                }
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center gap-y-3"
        >
            <LoginFormTextFields state={state} />
            <div className="flex w-full justify-end">
                <Link
                    href={"/forgot-password"}
                    className="text-text-highlight text-sm text-nowrap select-none hover:underline"
                >
                    {t("login.form.forgotPassword")}
                </Link>
            </div>
            <LoginFormButtons errorMessage={errorMessage} />
        </form>
    );
};

export default LoginForm;
