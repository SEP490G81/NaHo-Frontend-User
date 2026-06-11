import { COMPANION_ITEMS } from "@/modules/public/home/constants/home.constant";
import Reveal from "@/modules/public/home/components/reveal";
import { useTranslations } from "next-intl";

const CompanionsSection = () => {
    const t = useTranslations();
    return (
        <section className="relative py-16 md:py-24">
            <div
                className="pointer-events-none absolute top-0 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
                style={{
                    background:
                        "radial-gradient(circle, #ff99ac 0%, transparent 70%)",
                }}
            />
            <div className="relative mx-auto max-w-6xl px-5 md:px-8">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-text-contrast text-2xl font-bold md:text-4xl">
                        {t("page.home.companions.title")}
                    </h2>
                    <p className="text-text-muted mt-3 text-sm md:text-base">
                        {t("page.home.companions.subtitle")}
                    </p>
                </Reveal>

                <Reveal
                    delay={150}
                    className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {COMPANION_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className="group border-bdc-primary bg-bgc-app/60 flex flex-col items-center rounded-2xl border p-6 text-center shadow-[0_8px_30px_-12px_rgba(255,153,172,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(255,153,172,0.45)]"
                        >
                            <div
                                className={`ring-bdc-primary flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold ring-4 ${item.accentClass}`}
                            >
                                {item.initials}
                            </div>
                            <h3 className="text-text-contrast mt-4 text-lg font-bold">
                                {item.name}
                            </h3>
                            <p className="text-text-highlight mt-1 text-xs font-medium">
                                {t(
                                    `page.home.companions.items.${item.messageKey}.role`,
                                )}
                            </p>
                            <p className="text-text-muted mt-3 flex-1 text-sm leading-relaxed">
                                {t(
                                    `page.home.companions.items.${item.messageKey}.description`,
                                )}
                            </p>
                            <span className="bg-bgc-highlight/15 text-text-highlight mt-4 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium">
                                {t("page.home.companions.levelLabel")}
                                {": "}
                                {t(
                                    `page.home.companions.items.${item.messageKey}.level`,
                                )}
                            </span>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
};

export default CompanionsSection;
