import { Link } from "@/i18n/navigation";
import { Button, Divider } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { queryKeys } from "@/libs/query.keys";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import GoogleIcon from "@/components/ui/icons/google.icon";
import { getDeviceId } from "@/modules/public/login/utils/login.util";

const LoginFormButtons = ({ errorMessage }: { errorMessage: string }) => {
    const t = useTranslations();
    const queryClient = useQueryClient();

    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);

            getDeviceId();
            globalThis.location.href = "/api/auth/login/google";

            await queryClient.invalidateQueries({
                queryKey: queryKeys.auth.currentUser,
            });
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <Button type="submit" fullWidth color="primary" variant="contained">
                {t("login.form.loginButton")}
            </Button>

            {errorMessage.trim().length > 0 && (
                <p className="text-text-error mt-1 text-xs font-semibold">
                    {errorMessage}
                </p>
            )}

            <Divider textAlign="center" sx={{ my: "12px" }}>
                <p className="text-text-muted text-xs uppercase select-none">
                    {t("common.common.or")}
                </p>
            </Divider>

            <Button
                type="button"
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<GoogleIcon />}
                onClick={() => handleGoogleLogin()}
                loading={isLoading}
            >
                {t("login.form.loginByGoogle")}
            </Button>

            <div className="mt-5 flex items-center justify-center gap-x-1 text-sm md:mt-8">
                <p className="text-text-muted">{t("login.form.noAccount")}</p>
                <Link
                    href={"/register"}
                    className="text-text-highlight hover:underline"
                >
                    {t("login.form.registerNow")}
                </Link>
            </div>
        </div>
    );
};

export default LoginFormButtons;
