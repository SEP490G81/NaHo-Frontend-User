import {
    FEEDBACK_BAR_ITEMS,
    SOUNDWAVE_BAR_HEIGHTS,
} from "@/modules/public/home/constants/home.constant";
import MicIcon from "@mui/icons-material/Mic";
import { useTranslations } from "next-intl";

const Soundwave = () => {
    return (
        <div className="flex h-6 items-end gap-[3px]">
            {SOUNDWAVE_BAR_HEIGHTS.map((height, index) => (
                <span
                    key={index}
                    className="bg-bgc-highlight animate-naho-wave w-[3px] rounded-full"
                    style={{
                        height: `${height * 100}%`,
                        animationDelay: `${index * 0.09}s`,
                    }}
                />
            ))}
        </div>
    );
};

const ChatMockup = () => {
    const t = useTranslations();
    return (
        <div className="relative flex items-center justify-center">
            <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-tr from-[#ff99ac]/30 to-transparent blur-2xl" />

            <div className="border-bdc-primary bg-bgc-app/70 relative w-full max-w-md rounded-3xl border p-5 shadow-[0_20px_60px_-20px_rgba(255,153,172,0.4)] backdrop-blur-xl">
                <div className="border-bdc-primary flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2">
                        <div className="bg-bgc-highlight flex h-9 w-9 items-center justify-center rounded-full font-bold text-[#333533]">
                            先
                        </div>
                        <div>
                            <div className="text-sm font-semibold">
                                {t("page.home.hero.mockup.senseiName")}
                            </div>
                            <div className="text-text-muted flex items-center gap-1 text-xs">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                {t("page.home.hero.mockup.speaking")}
                            </div>
                        </div>
                    </div>
                    <span className="bg-hbgc-app text-text-muted rounded-full px-2 py-0.5 text-[10px] font-medium">
                        {t("page.home.hero.mockup.topicTag")}
                    </span>
                </div>

                <div className="mt-4 space-y-3">
                    <div className="bg-hbgc-app max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">
                        {t("page.home.hero.mockup.questionJp")}
                        <div className="text-text-muted mt-1 text-[11px]">
                            {t("page.home.hero.mockup.questionTranslation")}
                        </div>
                    </div>

                    <div className="bg-bgc-highlight/90 ml-auto max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-[#333533]">
                        {t("page.home.hero.mockup.answerJp")}
                    </div>

                    <div className="bg-hbgc-app flex items-center gap-3 rounded-2xl rounded-tl-sm px-4 py-3">
                        <Soundwave />
                        <span className="text-text-muted text-xs">
                            {t("page.home.hero.mockup.aiResponding")}
                        </span>
                    </div>

                    <div className="border-bdc-primary bg-bgc-app/80 rounded-2xl border p-3 backdrop-blur">
                        <div className="flex items-center justify-between">
                            <div className="text-text-muted text-xs font-semibold tracking-wider uppercase">
                                {t("page.home.hero.mockup.aiFeedback")}
                            </div>
                            <div className="flex items-baseline gap-0.5">
                                <span className="text-bgc-highlight text-xl font-bold">
                                    8.5
                                </span>
                                <span className="text-text-muted text-xs">
                                    /10
                                </span>
                            </div>
                        </div>
                        <div className="mt-2 space-y-1.5">
                            {FEEDBACK_BAR_ITEMS.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-text-muted w-16 shrink-0 text-[11px]">
                                        {t(
                                            `page.home.hero.mockup.${item.messageKey}`,
                                        )}
                                    </span>
                                    <div className="bg-hbgc-app h-1.5 flex-1 overflow-hidden rounded-full">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-[#ff99ac] to-[#ff6b8a]"
                                            style={{
                                                width: `${item.value}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="w-8 text-right text-[11px] font-medium">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-bdc-primary mt-4 flex items-center justify-center border-t pt-3">
                    <span className="bg-bgc-highlight inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[#333533]">
                        <MicIcon sx={{ fontSize: 14 }} />
                        {t("page.home.hero.mockup.pressToSpeak")}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatMockup;
