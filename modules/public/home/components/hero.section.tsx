import ChatMockup from "@/modules/public/home/components/chat.mockup";
import {
    HERO_PETAL_ITEMS,
    HOME_SECTION_IDS,
} from "@/modules/public/home/constants/home.constant";
import { Link } from "@/i18n/navigation";
import { Button } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useTranslations } from "next-intl";

const HeroSection = () => {
    const t = useTranslations();
    return (
        <section className="relative">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full opacity-50 blur-3xl"
                    style={{
                        background:
                            "radial-gradient(circle, #ff99ac 0%, transparent 70%)",
                    }}
                />
                <div
                    className="absolute -right-24 -bottom-40 h-[32rem] w-[32rem] rounded-full opacity-40 blur-3xl"
                    style={{
                        background:
                            "radial-gradient(circle, #ffd6dd 0%, transparent 70%)",
                    }}
                />
                <div
                    className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
                    style={{
                        background:
                            "radial-gradient(circle, #ff99ac 0%, transparent 70%)",
                    }}
                />
            </div>

            <div className="pointer-events-none absolute -top-[72px] right-0 bottom-0 left-0 overflow-hidden">
                {HERO_PETAL_ITEMS.map((petal) => (
                    <span
                        key={petal.id}
                        className="bg-bgc-highlight/60 animate-naho-petal-fall absolute top-0 rounded-tl-full rounded-br-full"
                        style={{
                            left: `${petal.left}%`,
                            width: petal.size,
                            height: petal.size * 1.4,
                            animationDelay: `${petal.delay}s`,
                            animationDuration: `${petal.duration}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:gap-10 md:px-8 md:py-24 lg:min-h-[80vh] lg:py-28">
                <div className="flex flex-col justify-center">
                    <span className="border-bdc-primary bg-bgc-app/60 text-text-muted animate-naho-fade-up inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md">
                        <AutoAwesomeIcon
                            sx={{ fontSize: 14 }}
                            className="text-bgc-highlight"
                        />
                        {t("home.hero.badge")}
                    </span>

                    <h1
                        className="text-text-contrast animate-naho-fade-up mt-5 text-4xl leading-[1.15] font-bold tracking-tight md:text-5xl"
                        style={{ animationDelay: "0.1s" }}
                    >
                        {t.rich("home.hero.title", {
                            highlight: (chunks) => (
                                <span className="bg-gradient-to-r from-[#ff99ac] to-[#ff6b8a] bg-clip-text text-transparent">
                                    {chunks}
                                </span>
                            ),
                        })}
                    </h1>

                    <p
                        className="text-text-muted animate-naho-fade-up mt-5 max-w-xl text-base leading-relaxed md:text-lg"
                        style={{ animationDelay: "0.2s" }}
                    >
                        {t("home.hero.description")}
                    </p>

                    <div
                        className="animate-naho-fade-up mt-8 flex flex-wrap gap-3"
                        style={{ animationDelay: "0.3s" }}
                    >
                        <Link
                            href={"/register"}
                            className="transition-all duration-300 hover:scale-105"
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                {t("home.hero.startNow")}
                            </Button>
                        </Link>
                        <Link href={`/home#${HOME_SECTION_IDS.features}`}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                            >
                                {t("home.hero.exploreFeatures")}
                            </Button>
                        </Link>
                    </div>
                </div>

                <div
                    className="animate-naho-fade-up"
                    style={{ animationDelay: "0.25s" }}
                >
                    <ChatMockup />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
