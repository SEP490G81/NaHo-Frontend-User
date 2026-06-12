import {
    FEATURE_ITEMS,
    HOME_SECTION_IDS,
} from "@/modules/public/home/constants/home.constant";
import Reveal from "@/modules/public/home/components/reveal";
import { useTranslations } from "next-intl";

const FeaturesSection = () => {
    const t = useTranslations();
    return (
        <section
            id={HOME_SECTION_IDS.features}
            className="border-bdc-primary bg-bgc-app/60 scroll-mt-5 border-y py-16 backdrop-blur-sm md:py-24"
        >
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <span className="text-text-highlight text-xs font-semibold tracking-wider uppercase">
                        {t("home.features.eyebrow")}
                    </span>
                    <h2 className="text-text-contrast mt-3 text-2xl font-bold md:text-4xl">
                        {t("home.features.title")}
                    </h2>
                    <p className="text-text-muted mt-3 text-sm md:text-base">
                        {t("home.features.subtitle")}
                    </p>
                </Reveal>

                <Reveal
                    delay={150}
                    className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {FEATURE_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.id}
                                className="group border-bdc-primary bg-bgc-app rounded-2xl border p-6 shadow-[0_8px_30px_-12px_rgba(255,153,172,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(255,153,172,0.45)]"
                            >
                                <div className="bg-bgc-highlight/15 text-text-highlight group-hover:bg-bgc-highlight flex h-12 w-12 items-center justify-center rounded-xl transition-colors group-hover:text-[#333533]">
                                    <Icon />
                                </div>
                                <h3 className="text-text-contrast mt-5 text-lg font-bold">
                                    {t(
                                        `home.features.items.${item.messageKey}.title`,
                                    )}
                                </h3>
                                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                                    {t(
                                        `home.features.items.${item.messageKey}.description`,
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

export default FeaturesSection;
