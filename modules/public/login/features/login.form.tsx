"use client";
import { handleCredentialsLogin } from "@/modules/public/login/actions/login.action";
import LoginFormButtons from "@/modules/public/login/components/login.form.buttons";
import LoginFormTextFields from "@/modules/public/login/components/login.form.text.fields";
import LoginRememberMe from "@/modules/public/login/components/login.remember.me";
import { LoginState } from "@/modules/public/login/types/login.ui.type";
import { useActionState, useState } from "react";

const initialState: LoginState = {
    usernameOrEmail: {
        value: "",
        error: false,
    },
    rawPassword: {
        value: "",
        error: false,
    },
    error: false,
};

const LoginForm = () => {
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const [state, formAction, pending] = useActionState(
        handleCredentialsLogin.bind(null, rememberMe),
        initialState,
    );

    return (
        <form
            action={formAction}
            className="flex w-full flex-col items-center gap-y-3"
        >
            <LoginFormTextFields state={state} />
            <LoginRememberMe
                rememberMe={rememberMe}
                setRememberMe={setRememberMe}
            />
            <LoginFormButtons pending={pending} state={state} />
        </form>
    );
};

export default LoginForm;
