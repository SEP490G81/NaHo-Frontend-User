import Gate from "@/modules/public/login/components/gate";
import LogoButton from "@/modules/public/login/components/logo.button";
import { DOT_POSITION_LIST } from "@/modules/public/login/constants/login.constant";
import { useTranslations } from "next-intl";

const LeftContent = () => {
    const t = useTranslations();
    return (
        <div className="relative hidden w-1/2 overflow-hidden bg-[linear-gradient(135deg,#1E293B_0%,#0f172a_60%,#1e1b3a_100%)] md:flex md:flex-col md:items-center md:justify-center md:p-12">
            <div className="absolute top-5 left-5">
                <LogoButton>
                    <h1 className="text-2xl font-bold whitespace-nowrap text-[#fdfffc]">
                        {t("common.appName")}
                    </h1>
                </LogoButton>
            </div>

            <div className="pointer-events-none absolute inset-0">
                {DOT_POSITION_LIST.map((dot) => (
                    <span
                        key={dot.id}
                        className="bg-bgc-highlight absolute rounded-full opacity-40 shadow-[0_0_8px_#ff99ac]"
                        style={{
                            left: `${dot.x}%`,
                            top: `${dot.y}%`,
                            width: dot.size,
                            aspectRatio: 1,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <Gate />
                <div className="mt-10 max-w-md text-center">
                    <p className="text-text-pure dark:text-text-contrast text-xl leading-relaxed font-medium whitespace-pre-line md:text-2xl">
                        {t("login.slogan")}
                    </p>
                    <div className="text-bgc-highlight mt-5 flex items-center justify-center gap-2 text-xs tracking-[0.3em] uppercase">
                        <span className="bg-bgc-highlight/60 h-px w-8" />
                        {t("common.appName")}
                        <span className="bg-bgc-highlight/60 h-px w-8" />
                    </div>
                </div>
            </div>

            <p className="text-text-muted absolute bottom-5 left-1/2 -translate-x-1/2 text-sm font-semibold text-nowrap">
                {t("common.copyright")}
            </p>
        </div>
    );
};

export default LeftContent;
