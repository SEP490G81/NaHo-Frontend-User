"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { Compass } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useTourStore } from "@/store/tourStore";
import { MARUGOTO_TOUR_ID } from "@/modules/protected/user-guide/constants/marugoto.tour.constant";

/**
 * Hỏi ngay khi mới vào web: đã biết cách học trên NaHo chưa. Chưa biết → bấm
 * "Chưa, hướng dẫn tôi" sẽ khởi động tour khoanh sáng của luồng Marugoto (đưa
 * người dùng qua /books để tour tự bắt đầu). Chỉ hỏi 1 lần cho mỗi tài khoản.
 */
export function OnboardingPrompt() {
    const t = useTranslations("userGuide.onboardingPrompt");
    const router = useRouter();
    const hasSeen = useTourStore((s) => s.hasSeenOnboardingPrompt);
    const markSeen = useTourStore((s) => s.markOnboardingPromptSeen);
    const startTour = useTourStore((s) => s.startTour);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (hasSeen) return;
        // Trễ nhẹ để tránh chồng lên hiệu ứng vào trang.
        const timer = setTimeout(() => setOpen(true), 500);
        return () => clearTimeout(timer);
    }, [hasSeen]);

    const handleAnswer = (alreadyKnows: boolean) => {
        markSeen();
        setOpen(false);
        if (!alreadyKnows) {
            startTour(MARUGOTO_TOUR_ID);
            router.push("/books");
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => handleAnswer(true)}
            maxWidth="xs"
            fullWidth
            slotProps={{
                paper: {
                    style: {
                        borderRadius: 24,
                        backgroundColor: "var(--color-bgc-app)",
                        backgroundImage: "none",
                        border: "1px solid var(--color-bdc-primary)",
                    },
                },
            }}
        >
            <div className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="bg-bgc-highlight/10 flex h-14 w-14 items-center justify-center rounded-2xl">
                    <Compass className="text-bgc-highlight h-7 w-7" />
                </div>
                <div>
                    <h2 className="text-text-contrast text-lg font-bold">
                        {t("title")}
                    </h2>
                    <p className="text-text-muted mt-1 text-sm">
                        {t("subtitle")}
                    </p>
                </div>
                <div className="mt-2 flex w-full flex-col gap-2">
                    <Button
                        onClick={() => handleAnswer(false)}
                        variant="contained"
                        fullWidth
                        className="!text-text-pure !rounded-xl !font-bold capitalize hover:opacity-90"
                        sx={{ backgroundColor: "var(--color-bgc-highlight)" }}
                    >
                        {t("noLabel")}
                    </Button>
                    <Button
                        onClick={() => handleAnswer(true)}
                        variant="outlined"
                        fullWidth
                        className="!rounded-xl !font-bold capitalize"
                    >
                        {t("yesLabel")}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default OnboardingPrompt;
