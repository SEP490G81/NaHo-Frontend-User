import { Link } from "@/i18n/navigation";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

const ResetSuccessStep = () => {
    const t = useTranslations();

    return (
        <div className="flex w-full flex-col items-center gap-y-4 text-center">
            <CheckCircleOutlineIcon
                sx={{ fontSize: 56, color: "var(--color-text-success)" }}
            />
            <Link href={"/login"} className="w-full">
                <Button fullWidth color="primary" variant="contained">
                    {t("forgotPassword.done.loginButton")}
                </Button>
            </Link>
        </div>
    );
};

export default ResetSuccessStep;
