"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CompassCalibrationIcon from "@mui/icons-material/CompassCalibration";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { ContainerBox } from "@/components/ui/container.box";
import { getCurrentUserClient } from "@/services/client/user.service";
import { useMySubscription } from "@/hooks/use.my.subscription";
import { useUserLearningProgress } from "@/components/providers/user.learning.progress.provider";
import {
    getLearningPathNodeDetail,
    listBooks,
    listTopicsByBook,
} from "@/services/client/book.service";

interface WelcomeBannerProps {
    name?: string;
    t: any;
}

export function WelcomeBanner({ name, t }: WelcomeBannerProps) {
    const hour = new Date().getHours();
    const greetingKey =
        hour < 12
            ? "greetingMorning"
            : hour < 18
              ? "greetingAfternoon"
              : "greetingEvening";

    // 1. User Profile Data
    const { data: userData } = useQuery({
        queryKey: ["user-me"],
        queryFn: getCurrentUserClient,
        staleTime: 5 * 60 * 1000,
    });

    const displayName =
        userData?.fullName ||
        userData?.username ||
        (userData?.email ? userData.email.split("@")[0] : name || "Learner");

    const tBilling = useTranslations("settings.billing");

    // 2. User Subscription Data & Expiration Info (Safe fallback for both UserSubscriptionResponse and SubscriptionPlanResponse)
    const { data: userSubscription } = useMySubscription();
    const subAny = userSubscription as any;

    const planObj = subAny?.subscriptionPlan || subAny?.plan || subAny;
    const tier = planObj?.tier || subAny?.tier || "FREE";
    const planName =
        planObj?.name ||
        subAny?.name ||
        (tier === "FREE"
            ? tBilling("freePlan")
            : tier === "BASIC"
              ? tBilling("basicPlan")
              : tier === "PREMIUM"
                ? tBilling("premiumPlan")
                : tier);
    const isPremium = tier === "PREMIUM";

    // Expiration Due Date
    let expireText = t("subscriptionPermanent");
    if (tier !== "FREE" && userSubscription) {
        const rawEndTime = subAny?.endTime || subAny?.plan?.endTime;
        if (rawEndTime) {
            const expDate = new Date(rawEndTime);
            if (!isNaN(expDate.getTime())) {
                const formattedDate = expDate.toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
                expireText = t("subscriptionDueDate", { date: formattedDate });
            }
        } else {
            const days = planObj?.durationDays || 30;
            const expDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
            const formattedDate = expDate.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
            expireText = t("subscriptionDueDate", { date: formattedDate });
        }
    }

    // 3. User Learning Progress & Next Available Node (+1)
    const { progress } = useUserLearningProgress();
    const nextNodeId =
        progress?.farthestAvailableNodeId || progress?.lastLearningNodeId;

    const { data: nodeDetail } = useQuery({
        queryKey: ["learning-node-detail", nextNodeId],
        queryFn: () => getLearningPathNodeDetail(nextNodeId!),
        enabled: !!nextNodeId,
    });

    // 4. Resolve Book & Topic for non-speaking nodes (e.g. /books/1/topics/2)
    const { data: booksData } = useQuery({
        queryKey: ["books-list"],
        queryFn: listBooks,
        staleTime: 10 * 60 * 1000,
    });

    const firstBookId = booksData?.[0]?.id;

    const { data: topicsData } = useQuery({
        queryKey: ["topics-by-book", firstBookId],
        queryFn: () => listTopicsByBook(firstBookId!),
        enabled: !!firstBookId,
        staleTime: 10 * 60 * 1000,
    });

    const targetTopic = topicsData?.find((tp) => {
        if (
            tp.firstNodeGlobalOrderIndex != null &&
            tp.lastNodeGlobalOrderIndex != null &&
            nodeDetail?.globalOrderIndex != null
        ) {
            return (
                nodeDetail.globalOrderIndex >= tp.firstNodeGlobalOrderIndex &&
                nodeDetail.globalOrderIndex <= tp.lastNodeGlobalOrderIndex
            );
        }
        return false;
    });

    const topicHref = targetTopic
        ? `/books/${targetTopic.bookId}/topics/${targetTopic.id}`
        : firstBookId && topicsData?.[0]
          ? `/books/${firstBookId}/topics/${topicsData[0].id}`
          : "/topics";

    // Dynamic Next Node Title, Subtitle, and Direct Navigation URL
    let topicTitle = t("defaultNextTopic");
    let topicSubtitle = t("defaultNextSubtitle");
    let practiceHref: string = topicHref;

    if (nodeDetail) {
        if (
            nodeDetail.nodeType === "SPEAKING_QUESTION" &&
            nodeDetail.speakingQuestion
        ) {
            topicTitle =
                nodeDetail.speakingQuestion.japaneseName ||
                t("defaultNextTopic");
            topicSubtitle =
                nodeDetail.speakingQuestion.vietnameseName ||
                t("defaultNextSubtitle");
            // Direct practice link into sandbox for speaking node
            practiceHref = `/sandbox/${nodeDetail.speakingQuestion.id}?node=${nodeDetail.id}`;
        } else if (
            nodeDetail.nodeType === "VOCABULARY_QUESTION" &&
            nodeDetail.vocabularyQuestion
        ) {
            const firstVocab = nodeDetail.vocabularyQuestion.vocabularies?.[0];
            topicTitle = firstVocab?.japanese
                ? t("nodeVocabTitle", { name: firstVocab.japanese })
                : t("defaultNextTopic");
            topicSubtitle =
                firstVocab?.vietnameseMeaningText || t("nodeVocabSubtitle");
            practiceHref = topicHref;
        } else if (nodeDetail.nodeType === "CHEST" && nodeDetail.chest) {
            topicTitle = nodeDetail.chest.title || t("nodeChestTitle");
            topicSubtitle =
                nodeDetail.chest.description || t("nodeChestSubtitle");
            practiceHref = topicHref;
        }
    }

    return (
        <ContainerBox className="border-bdc-primary from-bgc-card via-bgc-card relative overflow-hidden border bg-gradient-to-br to-[#ff99ac]/10 p-5 sm:p-6 lg:p-7">
            {/* Sakura ambient glow circles */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#ff99ac]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#ff758f]/10 blur-2xl" />

            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* CỘT TRÁI: Gom gọn thông tin */}
                <div className="flex-1 space-y-2.5">
                    {/* Hàng 1: Greeting Badge + VIP Chip */}
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff99ac]/30 bg-[#ff99ac]/15 px-3 py-0.5 text-xs font-bold text-[#ff758f]">
                            <CompassCalibrationIcon style={{ fontSize: 13 }} />
                            <span>{t(greetingKey)}</span>
                        </span>

                        {isPremium && (
                            <Chip
                                icon={
                                    <AutoAwesomeIcon
                                        style={{ fontSize: 13 }}
                                        className="text-amber-500"
                                    />
                                }
                                label={t("highestPlanBadge")}
                                size="small"
                                className="border border-amber-500/40 bg-amber-500/15 text-xs font-black text-amber-600 dark:text-amber-400"
                            />
                        )}
                    </div>

                    {/* Hàng 2: Tiêu đề + Slogan */}
                    <div>
                        <h1 className="text-text-primary text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                            {t("welcome", { name: displayName })}
                        </h1>
                        <p className="text-text-muted mt-1 text-sm leading-normal font-medium">
                            {t("slogan")}
                        </p>
                    </div>

                    {/* Hàng 3: Metadata (Gói dịch vụ, Due date, Upgrade) */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                        <Chip
                            icon={
                                <WorkspacePremiumIcon
                                    style={{ fontSize: 14 }}
                                />
                            }
                            label={t("subscriptionLabel", { name: planName })}
                            size="small"
                            className="border-bdc-primary/60 bg-bgc-subtle text-text-primary border font-bold"
                        />
                        <Chip
                            icon={<AccessTimeIcon style={{ fontSize: 13 }} />}
                            label={expireText}
                            size="small"
                            className="border-bdc-primary/40 bg-bgc-card/80 text-text-muted border text-xs font-semibold"
                        />

                        {!isPremium && (
                            <Button
                                component={Link}
                                href="/settings/billing"
                                size="small"
                                variant="outlined"
                                startIcon={
                                    <AutoAwesomeIcon
                                        fontSize="small"
                                        className="text-[#ff758f]"
                                    />
                                }
                                endIcon={<ArrowForwardIcon fontSize="small" />}
                                className="rounded-xl border-[#ff99ac]/60 bg-[#ff99ac]/10 px-3 py-1 text-xs font-extrabold text-[#ff758f] transition-all hover:border-[#ff758f] hover:bg-[#ff99ac]/20"
                            >
                                {t("upgradeBannerBtnNow")}
                            </Button>
                        )}
                    </div>
                </div>

                {/* CỘT PHẢI: Mở rộng chiều ngang card tiếp tục luyện tập */}
                <div className="bg-bgc-card/80 flex w-full flex-col justify-between gap-3 rounded-2xl border border-[#ff99ac]/30 p-5 shadow-sm backdrop-blur-md transition-all hover:border-[#ff758f]/50 lg:w-[380px] lg:shrink-0 xl:w-[420px]">
                    <div>
                        <div className="mb-1.5 flex items-center gap-1.5">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff758f]" />
                            <span className="text-xs font-extrabold tracking-wider text-[#ff758f] uppercase">
                                {t("nextLessonTag")}
                            </span>
                        </div>

                        <div className="my-1 space-y-1">
                            <h4 className="text-text-primary line-clamp-1 text-base font-extrabold">
                                {topicTitle}
                            </h4>
                            <p className="text-text-muted line-clamp-2 text-xs leading-relaxed font-medium">
                                {topicSubtitle}
                            </p>
                        </div>
                    </div>

                    <Button
                        component={Link}
                        href={practiceHref as any}
                        variant="contained"
                        size="large"
                        startIcon={<PlayArrowIcon />}
                        className="w-full rounded-xl bg-[#ff758f] py-3 text-sm font-black text-white shadow-md transition-all hover:bg-[#ff99ac] hover:shadow-lg active:scale-[0.98]"
                    >
                        {t("continuePracticeBtn")}
                    </Button>
                </div>
            </div>
        </ContainerBox>
    );
}

export default WelcomeBanner;
