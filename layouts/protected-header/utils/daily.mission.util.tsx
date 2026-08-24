import {UserDailyMissionResponse} from "@/types/responses/daily.mission.response";

/**
 * Computes progress stats from user's daily missions list today
 */
export function calculateUserMissionProgress(
    userMissions: UserDailyMissionResponse[],
) {
    const totalCount = userMissions.length;
    let completedCount = 0;
    let earnedCount = 0;
    let claimableCount = 0;
    let inProgressCount = 0;
    let totalPointsEarned = 0;
    let totalPointsPossible = 0;

    userMissions.forEach((um) => {
        const points = um.dailyMission?.point || 0;
        totalPointsPossible += points;

        if (um.status === "EARNED") {
            earnedCount += 1;
            completedCount += 1;
            totalPointsEarned += points;
        } else if (um.status === "COMPLETED") {
            claimableCount += 1;
            completedCount += 1;
        } else if (um.status === "IN_PROGRESS") {
            inProgressCount += 1;
        }
    });

    const progressPercentage =
        totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return {
        completedCount,
        earnedCount,
        claimableCount,
        inProgressCount,
        totalCount,
        progressPercentage,
        totalPointsEarned,
        totalPointsPossible,
    };
}
