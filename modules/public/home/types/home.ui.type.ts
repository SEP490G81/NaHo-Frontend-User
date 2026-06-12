import { Messages } from "next-intl";
import { SvgIconComponent } from "@mui/icons-material";

export type HomeFeatureKey =
    keyof Messages["home"]["features"]["items"];

export type HomeStepKey = keyof Messages["home"]["howItWorks"]["steps"];

export type HomeTestimonialKey =
    keyof Messages["home"]["learnerFeedback"]["items"];

export type HomeFaqKey = keyof Messages["home"]["faq"]["items"];

export type HomeCompanionKey =
    keyof Messages["home"]["companions"]["items"];

export type HomeFeedbackBarKey = Extract<
    keyof Messages["home"]["hero"]["mockup"],
    "pronunciation" | "grammar"
>;

export interface FeatureItem {
    id: string;
    icon: SvgIconComponent;
    messageKey: HomeFeatureKey;
}

export interface StepItem {
    id: string;
    icon: SvgIconComponent;
    messageKey: HomeStepKey;
}

export interface TestimonialItem {
    id: string;
    messageKey: HomeTestimonialKey;
    avatarClass: string;
}

export interface FaqItem {
    id: string;
    messageKey: HomeFaqKey;
}

export interface CompanionItem {
    id: string;
    name: string;
    initials: string;
    messageKey: HomeCompanionKey;
    accentClass: string;
}

export interface FeedbackBarItem {
    id: string;
    messageKey: HomeFeedbackBarKey;
    value: number;
}

export interface HeroPetalItem {
    id: string;
    left: number;
    size: number;
    delay: number;
    duration: number;
}
