import {
    FAQ_ITEMS,
    HOME_SECTION_IDS,
} from "@/modules/public/home/constants/home.constant";
import Reveal from "@/modules/public/home/components/reveal";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslations } from "next-intl";

const FaqSection = () => {
    const t = useTranslations();
    return (
        <section
            id={HOME_SECTION_IDS.frequentlyQuestions}
            className="border-bdc-primary bg-bgc-app/60 scroll-mt-5 border-t py-16 backdrop-blur-sm md:py-24"
        >
            <div className="mx-auto max-w-3xl px-5 md:px-8">
                <Reveal className="text-center">
                    <span className="text-text-highlight text-xs font-semibold tracking-wider uppercase">
                        {t("page.home.faq.eyebrow")}
                    </span>
                    <h2 className="text-text-contrast mt-3 text-2xl font-bold md:text-4xl">
                        {t("page.home.faq.title")}
                    </h2>
                </Reveal>

                <Reveal
                    delay={150}
                    className="border-bdc-primary bg-bgc-app mt-12 overflow-hidden rounded-2xl border px-2 shadow-[0_8px_30px_-12px_rgba(255,153,172,0.25)]"
                >
                    {FAQ_ITEMS.map((item) => (
                        <Accordion
                            key={item.id}
                            disableGutters
                            elevation={0}
                            sx={{
                                backgroundColor: "transparent",
                                "&:before": { display: "none" },
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <span className="text-text-contrast text-sm font-semibold md:text-base">
                                    {t(
                                        `page.home.faq.items.${item.messageKey}.question`,
                                    )}
                                </span>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p className="text-text-muted text-sm leading-relaxed">
                                    {t(
                                        `page.home.faq.items.${item.messageKey}.answer`,
                                    )}
                                </p>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Reveal>
            </div>
        </section>
    );
};

export default FaqSection;
