import {
    BookOpen,
    CreditCard,
    LifeBuoy,
    Mic,
    ShieldCheck,
    Sparkles,
    Trophy,
} from "lucide-react";
import { ComponentType } from "react";

type HelpIcon = ComponentType<{ className?: string }>;

/**
 * Icon gắn theo id chủ đề trong help.json — id giữ nguyên ở cả 3 ngôn ngữ nên
 * bảng map này dùng chung cho mọi locale.
 */
export const HELP_CATEGORY_ICONS: Record<string, HelpIcon> = {
    "getting-started": BookOpen,
    "speaking-ai": Mic,
    rewards: Trophy,
    billing: CreditCard,
    account: ShieldCheck,
};

export const HELP_FALLBACK_ICON: HelpIcon = LifeBuoy;

export const HELP_GUIDE_ICON: HelpIcon = Sparkles;

/** Id chủ đề rỗng nghĩa là đang xem toàn bộ câu hỏi. */
export const HELP_ALL_CATEGORY = "";

/** Anchor để thẻ chủ đề cuộn xuống đúng khối câu hỏi thường gặp. */
export const HELP_FAQ_SECTION_ID = "help-faq";

export const HELP_SUPPORT_EMAIL = "support@naho.edu.vn";
