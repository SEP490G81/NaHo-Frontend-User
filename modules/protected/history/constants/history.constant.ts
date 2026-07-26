export const getScoreBadgeClass = (score: number) => {
    if (score >= 8.5)
        return "bg-green-500/15 text-green-600 dark:text-green-400";
    if (score >= 7.0) return "bg-blue-500/15 text-blue-600 dark:text-blue-400";
    if (score >= 5.0)
        return "bg-orange-500/15 text-orange-600 dark:text-orange-400";
    return "bg-red-500/15 text-red-600 dark:text-red-400";
};
