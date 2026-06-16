import { Link } from "@/i18n/navigation";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

const RegisterFormButtons = ({
    pending,
    disabled,
    errorMessage,
}: {
    pending: boolean;
    disabled?: boolean;
    errorMessage?: string;
}) => {
    const t = useTranslations();

    return (
        <div className="w-full">
            <Button
                type="submit"
                loading={pending}
                disabled={disabled}
                fullWidth
                color="primary"
                variant="contained"
            >
                {t("register.form.registerButton")}
            </Button>

            {errorMessage && (
                <p className="text-text-error mt-1 text-xs font-semibold">
                    {errorMessage}
                </p>
            )}

            <div className="mt-5 flex items-center justify-center gap-x-1 text-sm md:mt-6">
                <p className="text-text-muted">
                    {t("register.form.haveAccount")}
                </p>
                <Link
                    href={"/login"}
                    className="text-text-highlight hover:underline"
                >
                    {t("register.form.loginNow")}
                </Link>
            </div>
        </div>
    );
};

export default RegisterFormButtons;
