import Reveal from "@/modules/public/home/components/reveal";
import { Link } from "@/i18n/navigation";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

const CtaSection = () => {
    const t = useTranslations();
    return (
        <section className="relative py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                <Reveal className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#ff99ac_0%,#ff6b8a_100%)] px-6 py-14 text-center shadow-[0_25px_70px_-25px_rgba(255,153,172,0.55)] md:px-12 md:py-20">
                    <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white opacity-30 blur-3xl" />
                    <h2 className="text-text-pure relative text-2xl font-bold md:text-4xl">
                        {t("home.cta.title")}
                    </h2>
                    <p className="text-text-pure/90 relative mx-auto mt-3 max-w-xl text-sm md:text-base">
                        {t("home.cta.subtitle")}
                    </p>
                    <div className="relative mt-8 flex justify-center">
                        <Link
                            href={"/register"}
                            className="transition-all duration-300 hover:scale-105"
                        >
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    backgroundColor:
                                        "var(--color-text-pure)",
                                    color: "#ff6b8a",
                                    "&:hover": {
                                        backgroundColor:
                                            "var(--color-text-pure)",
                                    },
                                }}
                            >
                                {t("home.cta.button")}
                            </Button>
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default CtaSection;
