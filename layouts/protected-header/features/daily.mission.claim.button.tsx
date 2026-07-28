"use client";

import React, { useState } from "react";
import { Gift, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { earnUserDailyMissionReward } from "@/services/client/daily.mission.service";
import { UserDailyMissionResponse } from "@/types/responses/daily.mission.response";

interface DailyMissionClaimButtonProps {
    userMissionId: number;
    onEarnSuccess: (updatedMission: UserDailyMissionResponse) => void;
}

const DailyMissionClaimButton: React.FC<DailyMissionClaimButtonProps> = ({
    userMissionId,
    onEarnSuccess,
}) => {
    const t = useTranslations("dailyMission");
    const [loading, setLoading] = useState(false);

    const handleClaim = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (loading) return;

        setLoading(true);
        try {
            const updated = await earnUserDailyMissionReward(userMissionId);
            toast.success(t("claimSuccess"));
            onEarnSuccess(updated);
        } catch (error) {
            console.error("Claim Daily Mission Reward Error:", error);
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClaim}
            disabled={loading}
            className="group relative inline-flex cursor-pointer items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/30 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
        >
            {loading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
                <Gift className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
            )}
            <span>{t("claimBtn")}</span>
        </button>
    );
};

export default DailyMissionClaimButton;
