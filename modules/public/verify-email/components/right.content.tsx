import { Link } from "@/i18n/navigation";
import ThemeSwitchButton from "@/layouts/public-header/components/theme.switch.button";
import VerifyEmailForm from "@/modules/public/verify-email/features/verify.email.form";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { useTranslations } from "next-intl";

const RightContent = ({ email }: { email: string }) => {
    const t = useTranslations();
    return (
        <div className="relative flex w-full items-center justify-center overflow-hidden px-5 py-10 md:w-1/2 md:px-10">
            <div className="bg-bgc-highlight pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full opacity-30 blur-3xl" />
            <div className="bg-bgc-highlight/50 pointer-events-none absolute -bottom-20 left-10 h-72 w-72 rounded-full opacity-20 blur-3xl" />

            <div className="absolute top-5 right-5">
                <ThemeSwitchButton />
            </div>

            <div className="border-bdc-primary bg-bgc-app/70 relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl border px-6 py-5 shadow-xl backdrop-blur-xl md:px-8 md:py-8">
                <Link
                    href={"/register"}
                    className="text-text-muted hover:text-text-highlight mb-5 flex items-center justify-start gap-x-1 text-sm"
                >
                    <KeyboardBackspaceIcon fontSize="small" />
                    {t("register.verifyEmail.backToRegister")}
                </Link>

                <div className="my-4 md:my-5">
                    <MarkEmailReadOutlinedIcon
                        sx={{
                            fontSize: 40,
                            color: "var(--color-text-highlight)",
                        }}
                    />
                    <h1 className="mt-2 text-3xl leading-tight font-bold">
                        {t("register.verifyEmail.title")}
                    </h1>
                    <p className="text-text-muted mt-2 mb-5 text-sm">
                        {t("register.verifyEmail.description")}
                    </p>
                </div>

                <VerifyEmailForm email={email} />
            </div>
        </div>
    );
};

export default RightContent;
