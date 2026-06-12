import { Link } from "@/i18n/navigation";
import ThemeSwitchButton from "@/layouts/public-header/components/theme.switch.button";
import RegisterForm from "@/modules/public/register/features/register.form";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useTranslations } from "next-intl";

const RightContent = () => {
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
                    href={"/home"}
                    className="text-text-muted hover:text-text-highlight mb-5 flex items-center justify-start gap-x-1 text-sm"
                >
                    <KeyboardBackspaceIcon fontSize="small" />
                    {t("register.backToHomePage")}
                </Link>

                <div className="my-4 md:my-5">
                    <h1 className="text-3xl leading-tight font-bold">
                        {t("register.welcome")}
                    </h1>
                    <p className="text-text-muted mt-2 mb-5 text-sm">
                        {t("register.registerDescription")}
                    </p>
                </div>

                <RegisterForm />
            </div>
        </div>
    );
};

export default RightContent;
