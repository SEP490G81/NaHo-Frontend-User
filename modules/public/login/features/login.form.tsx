"use client";
import LoginFormButtons from "@/modules/public/login/components/login.form.buttons";
import LoginFormTextFields from "@/modules/public/login/components/login.form.text.fields";
import LoginRememberMe from "@/modules/public/login/components/login.remember.me";
import { LoginState } from "@/modules/public/login/types/login.ui.type";
import React, { useState } from "react";
import { validateLoginForm } from "@/modules/public/login/actions/login.action";
import { useRouter } from "@/intl/i18n/navigation";
import { credentialsLogin } from "@/services/client/user.service";

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
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [state, setState] = useState<LoginState>(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const { replace, refresh } = useRouter();

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
                });

                refresh();
                replace("/home");
            } catch (error) {
                console.log(error);
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
            <LoginRememberMe
                rememberMe={rememberMe}
                setRememberMe={setRememberMe}
            />
            <LoginFormButtons errorMessage={errorMessage} />
        </form>
    );
};

export default LoginForm;
