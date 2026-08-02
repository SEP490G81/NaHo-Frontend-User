import { Link } from "@/i18n/navigation";
import { Checkbox } from "@mui/material";
import { useTranslations } from "next-intl";

const RegisterAgreeTerms = ({
    agreeTerms,
    onChange,
    error,
}: {
    agreeTerms: boolean;
    onChange: (checked: boolean) => void;
    error: boolean;
}) => {
    const t = useTranslations();
    return (
        <div className="w-full">
            <div className="flex items-start gap-x-1.5">
                <Checkbox
                    id="agreeTerms"
                    size="small"
                    sx={{ padding: 0, marginTop: "2px" }}
                    checked={agreeTerms}
                    onChange={(event) => onChange(event.target.checked)}
                />
                <label
                    htmlFor="agreeTerms"
                    className="cursor-pointer text-sm select-none"
                >
                    {t.rich("register.form.agreement", {
                        terms: (chunks) => (
                            <Link
                                href={"/terms"}
                                target="_blank"
                                className="text-text-highlight cursor-pointer hover:underline"
                            >
                                {chunks}
                            </Link>
                        ),
                        privacy: (chunks) => (
                            <Link
                                href={"/privacy"}
                                target="_blank"
                                className="text-text-highlight cursor-pointer hover:underline"
                            >
                                {chunks}
                            </Link>
                        ),
                    })}
                </label>
            </div>
            {error && (
                <p className="text-text-error mt-1 text-xs font-semibold">
                    {t("register.form.pleaseAgreeTerms")}
                </p>
            )}
        </div>
    );
};

export default RegisterAgreeTerms;
