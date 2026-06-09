import React, { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { useTranslations } from "next-intl";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const LoginFormTextFields = () => {
    const t = useTranslations();
    const [showPassword, setShowPassword] = useState(false);

    const handleChangePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="flex w-full flex-col items-start gap-y-1.5">
                <label htmlFor="usernameOrEmail" className="font-semibold">
                    {t("page.login.form.emailOrUsername")}
                </label>
                <TextFieldCustom
                    name="usernameOrEmail"
                    id="usernameOrEmail"
                    placeholder={t("page.login.form.enterEmailOrUsername")}
                    size="small"
                    fullWidth
                    error
                    helperText={
                        <span className="text-text-error font-semibold">
                            {t("page.login.form.pleaseEnterEmail")}
                        </span>
                    }
                />
            </div>

            <div className="flex w-full flex-col items-start gap-y-1.5">
                <label htmlFor="password" className="font-semibold">
                    {t("page.login.form.password")}
                </label>
                <TextFieldCustom
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("page.login.form.enterPassword")}
                    size="small"
                    fullWidth
                    error
                    helperText={
                        <span className="text-text-error font-semibold">
                            {t("page.login.form.pleaseEnterPassword")}
                        </span>
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
