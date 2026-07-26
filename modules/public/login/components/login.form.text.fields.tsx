import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { LoginState } from "@/modules/public/login/types/login.ui.type";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, InputAdornment } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

const LoginFormTextFields = ({ state }: { state: LoginState }) => {
    const t = useTranslations();
    const [showPassword, setShowPassword] = useState(false);

    const handleChangePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="flex w-full flex-col items-start gap-y-1.5">
                <label htmlFor="usernameOrEmail" className="font-semibold">
                    {t("login.form.emailOrUsername")}
                </label>
                <TextFieldCustom
                    name="usernameOrEmail"
                    id="usernameOrEmail"
                    placeholder={t("login.form.enterEmailOrUsername")}
                    size="small"
                    fullWidth
                    defaultValue={state.usernameOrEmail.value}
                    error={state.usernameOrEmail.error}
                    helperText={
                        state.usernameOrEmail.error ? (
                            <span className="text-text-error font-semibold">
                                {t("login.form.pleaseEnterEmailOrUsername")}
                            </span>
                        ) : null
                    }
                />
            </div>

            <div className="flex w-full flex-col items-start gap-y-1.5">
                <label htmlFor="rawPassword" className="font-semibold">
                    {t("login.form.rawPassword")}
                </label>
                <TextFieldCustom
                    name="rawPassword"
                    id="rawPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.form.enterPassword")}
                    size="small"
                    fullWidth
                    defaultValue={state.rawPassword.value}
                    error={state.rawPassword.error}
                    helperText={
                        state.rawPassword.error ? (
                            <span className="text-text-error font-semibold">
                                {t("login.form.pleaseEnterPassword")}
                            </span>
                        ) : null
                    }
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={handleChangePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <VisibilityOutlinedIcon
                                                fontSize="small"
                                                color="disabled"
                                            />
                                        ) : (
                                            <VisibilityOffOutlinedIcon
                                                fontSize="small"
                                                color="disabled"
                                            />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>
        </>
    );
};

export default LoginFormTextFields;
