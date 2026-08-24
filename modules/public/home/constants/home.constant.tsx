import {
    CompanionItem,
    FaqItem,
    FeatureItem,
    FeedbackBarItem,
    FooterLinkItem,
    HeroPetalItem,
    StepItem,
    TestimonialItem,
} from "@/modules/public/home/types/home.ui.type";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ForumIcon from "@mui/icons-material/Forum";
import InsightsIcon from "@mui/icons-material/Insights";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MicIcon from "@mui/icons-material/Mic";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export const FEATURE_ITEMS: FeatureItem[] = [
    {
        id: "f-1",
        icon: RecordVoiceOverIcon,
        messageKey: "topics",
    },
    {
        id: "f-2",
        icon: AutoAwesomeIcon,
        messageKey: "aiFeedback",
    },
    {
        id: "f-3",
        icon: ForumIcon,
        messageKey: "freeConversation",
    },
    {
        id: "f-4",
        icon: InsightsIcon,
        messageKey: "history",
    },
];

export const STEP_ITEMS: StepItem[] = [
    {
        id: "s-1",
        icon: PersonAddAltIcon,
        messageKey: "step1",
    },
    {
        id: "s-2",
        icon: MicIcon,
        messageKey: "step2",
    },
    {
        id: "s-3",
        icon: TrendingUpIcon,
        messageKey: "step3",
    },
];

export const COMPANION_ITEMS: CompanionItem[] = [
    {
        id: "c-1",
        name: "Sakura",
        initials: "SA",
        messageKey: "sakura",
        accentClass: "bg-bgc-highlight/15 text-text-highlight",
    },
    {
        id: "c-2",
        name: "Kenji",
        initials: "KE",
        messageKey: "kenji",
        accentClass: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
    },
    {
        id: "c-3",
        name: "Yuki",
        initials: "YU",
        messageKey: "yuki",
        accentClass: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
    },
    {
        id: "c-4",
        name: "Tanaka",
        initials: "TA",
        messageKey: "tanaka",
        accentClass: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
    },
];

export const TESTIMONIAL_ITEMS: TestimonialItem[] = [
    {
        id: "t-1",
        messageKey: "t1",
        avatarClass: "bg-[#ffd6dd] text-[#b4445c]",
    },
    {
        id: "t-2",
        messageKey: "t2",
        avatarClass: "bg-[#d6e6ff] text-[#3b5fa0]",
    },
    {
        id: "t-3",
        messageKey: "t3",
        avatarClass: "bg-[#fff3c4] text-[#9a7b1a]",
    },
];

export const FAQ_ITEMS: FaqItem[] = [
    {
        id: "q-1",
        messageKey: "q1",
    },
    {
        id: "q-2",
        messageKey: "q2",
    },
    {
        id: "q-3",
        messageKey: "q3",
    },
];

export const FEEDBACK_BAR_ITEMS: FeedbackBarItem[] = [
    {
        id: "fb-1",
        messageKey: "pronunciation",
        value: 88,
    },
    {
        id: "fb-2",
        messageKey: "grammar",
        value: 82,
    },
];

export const SOUNDWAVE_BAR_HEIGHTS: number[] = [
    0.45, 0.85, 0.6, 1, 0.7, 0.95, 0.5, 0.8,
];

export const HERO_PETAL_ITEMS: HeroPetalItem[] = [
    {
        id: "p-1",
        left: 6,
        size: 14,
        delay: 0,
        duration: 11,
    },
    {
        id: "p-2",
        left: 18,
        size: 10,
        delay: 3,
        duration: 13,
    },
    {
        id: "p-3",
        left: 34,
        size: 12,
        delay: 6,
        duration: 10,
    },
    {
        id: "p-4",
        left: 52,
        size: 9,
        delay: 1.5,
        duration: 14,
    },
    {
        id: "p-5",
        left: 68,
        size: 13,
        delay: 4.5,
        duration: 12,
    },
    {
        id: "p-6",
        left: 82,
        size: 10,
        delay: 7.5,
        duration: 11,
    },
    {
        id: "p-7",
        left: 93,
        size: 12,
        delay: 2.5,
        duration: 13,
    },
];

export const FOOTER_LEGAL_LINKS: FooterLinkItem[] = [
    {
        id: "l-1",
        titleKey: "terms",
        redirectLink: "/terms",
    },
    {
        id: "l-2",
        titleKey: "privacy",
        redirectLink: "/privacy",
    },
];

export const HOME_SECTION_IDS = {
    features: "features",
    learnerFeedback: "learner-feedback",
    frequentlyQuestions: "frequently-questions",
} as const;
