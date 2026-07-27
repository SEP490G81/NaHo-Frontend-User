import {
    DailyMissionResponse,
    UserDailyMissionResponse,
} from "@/types/responses/daily.mission.response";

/**
 * Converts array of user daily missions into a Set of completed dailyMissionIds
 */
export function getCompletedMissionIdsSet(
    userMissions: UserDailyMissionResponse[],
): Set<number> {
    return new Set(userMissions.map((um) => um.dailyMissionId));
}

/**
 * Checks if a specific daily mission ID is completed
 */
export function isMissionCompleted(
    missionId: number,
    completedMissionIdsSet: Set<number>,
): boolean {
    return completedMissionIdsSet.has(missionId);
}

/**
 * Computes progress stats (completed count, total count, progress %, total earned & total available points)
 */
export function calculateMissionProgress(
    missions: DailyMissionResponse[],
    completedMissionIdsSet: Set<number>,
) {
    const totalCount = missions.length;
    let completedCount = 0;
    let totalPointsEarned = 0;
    let totalPointsPossible = 0;

    missions.forEach((m) => {
        const points = m.point || 0;
        totalPointsPossible += points;

        if (completedMissionIdsSet.has(m.id)) {
            completedCount += 1;
            totalPointsEarned += points;
        }
    });

    const progressPercentage =
        totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return {
        completedCount,
        totalCount,
        progressPercentage,
        totalPointsEarned,
        totalPointsPossible,
    };
}
