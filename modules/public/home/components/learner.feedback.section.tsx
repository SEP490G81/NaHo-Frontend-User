import {
    HOME_SECTION_IDS,
    TESTIMONIAL_ITEMS,
} from "@/modules/public/home/constants/home.constant";
import Reveal from "@/modules/public/home/components/reveal";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useTranslations } from "next-intl";

const LearnerFeedbackSection = () => {
    const t = useTranslations();
    return (
        <section
            id={HOME_SECTION_IDS.learnerFeedback}
            className="scroll-mt-5 py-16 md:py-24"
        >
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <span className="text-text-highlight text-xs font-semibold tracking-wider uppercase">
                        {t("home.learnerFeedback.eyebrow")}
                    </span>
                    <h2 className="text-text-contrast mt-3 text-2xl font-bold md:text-4xl">
                        {t("home.learnerFeedback.title")}
                    </h2>
                    <p className="text-text-muted mt-3 text-sm md:text-base">
                        {t("home.learnerFeedback.subtitle")}
                    </p>
                </Reveal>

                <Reveal
                    delay={150}
                    className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3"
                >
                    {TESTIMONIAL_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className="border-bdc-primary bg-bgc-app/60 flex flex-col rounded-2xl border p-6 shadow-[0_8px_30px_-12px_rgba(255,153,172,0.25)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(255,153,172,0.45)]"
                        >
                            <FormatQuoteIcon className="text-bgc-highlight rotate-180" />
                            <p className="text-text-contrast mt-3 flex-1 text-sm leading-relaxed">
                                {t(
                                    `home.learnerFeedback.items.${item.messageKey}.quote`,
                                )}
                            </p>
                            <div className="border-bdc-primary mt-5 flex items-center gap-3 border-t pt-4">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${item.avatarClass}`}
                                >
                                    {t(
                                        `home.learnerFeedback.items.${item.messageKey}.name`,
                                    ).charAt(0)}
                                </div>
                                <div>
                                    <div className="text-text-contrast text-sm font-bold">
                                        {t(
                                            `home.learnerFeedback.items.${item.messageKey}.name`,
                                        )}
                                    </div>
                                    <div className="text-text-muted text-xs">
                                        {t(
                                            `home.learnerFeedback.items.${item.messageKey}.role`,
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
};

export default LearnerFeedbackSection;
