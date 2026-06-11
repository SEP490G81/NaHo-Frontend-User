import { STEP_ITEMS } from "@/modules/public/home/constants/home.constant";
import Reveal from "@/modules/public/home/components/reveal";
import { useTranslations } from "next-intl";

const HowItWorksSection = () => {
    const t = useTranslations();
    return (
        <section className="border-bdc-primary bg-bgc-app/60 border-y py-16 backdrop-blur-sm md:py-24">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-text-contrast text-2xl font-bold md:text-4xl">
                        {t("page.home.howItWorks.title")}
                    </h2>
                    <p className="text-text-muted mt-3 text-sm md:text-base">
                        {t("page.home.howItWorks.subtitle")}
                    </p>
                </Reveal>

                <Reveal
                    delay={150}
                    className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3"
                >
                    {STEP_ITEMS.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.id}
                                className="relative flex flex-col items-center text-center"
                            >
                                <div className="bg-bgc-highlight text-text-pure flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_0_20px_rgba(255,153,172,.45)]">
                                    <Icon />
                                </div>
                                <span className="text-text-highlight mt-4 text-xs font-bold tracking-[0.3em] uppercase">
                                    {`0${index + 1}`}
                                </span>
                                <h3 className="text-text-contrast mt-2 text-base font-bold">
                                    {t(
                                        `page.home.howItWorks.steps.${item.messageKey}.title`,
                                    )}
                                </h3>
                                <p className="text-text-muted mt-2 max-w-xs text-sm leading-relaxed">
                                    {t(
                                        `page.home.howItWorks.steps.${item.messageKey}.description`,
                                    )}
                                </p>
                            </div>
                        );
                    })}
                </Reveal>
            </div>
        </section>
    );
};

export default HowItWorksSection;
