import HeroSection from "@/modules/public/home/components/hero.section";
import FeaturesSection from "@/modules/public/home/components/features.section";
import CompanionsSection from "@/modules/public/home/components/companions.section";
import HowItWorksSection from "@/modules/public/home/components/how.it.works.section";
import LearnerFeedbackSection from "@/modules/public/home/components/learner.feedback.section";
import FaqSection from "@/modules/public/home/components/faq.section";
import CtaSection from "@/modules/public/home/components/cta.section";
import HomeFooter from "@/modules/public/home/components/home.footer";

const Home = () => {
    return (
        <div className="relative">
            <div
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,153,172,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(255,214,221,0.15), transparent 60%)",
                }}
            />
            <HeroSection />
            <FeaturesSection />
            <CompanionsSection />
            <HowItWorksSection />
            <LearnerFeedbackSection />
            <FaqSection />
            <CtaSection />
            <HomeFooter />
        </div>
    );
};

export default Home;
