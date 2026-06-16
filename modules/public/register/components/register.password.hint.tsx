import { PASSWORD_RULES } from "@/modules/public/register/utils/register.validation";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useTranslations } from "next-intl";

const RegisterPasswordHint = ({
    value,
    showError = false,
}: {
    value: string;
    showError?: boolean;
}) => {
    const t = useTranslations();

    if (!showError) {
        return (
            <p className="text-text-muted pt-1 text-xs">
                {t("register.form.passwordHint")}
            </p>
        );
    }

    const missing = PASSWORD_RULES.filter((rule) => !rule.test(value));
    let message: string;
    if (value.length === 0) {
        message = t("register.form.pleaseEnterPassword");
    } else {
        const labels = missing.map((rule) =>
            t(rule.needKey as Parameters<typeof t>[0]),
        );
        const joined =
            labels.length > 1
                ? labels.slice(0, -1).join(", ") +
                t("register.form.passwordNeed.and") +
                labels[labels.length - 1]
                : labels[0];
        message = t("register.form.passwordNeed.prefix") + joined;
    }

    return (
        <p className="text-text-error flex items-center gap-x-1 pt-1 text-xs font-semibold">
            <WarningAmberRoundedIcon sx={{ fontSize: 14 }} />
            <span>{message}</span>
        </p>
    );
};

export default RegisterPasswordHint;
