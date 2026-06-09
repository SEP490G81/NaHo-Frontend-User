export const getGaugeColor = (score: number) => {
    if (score >= 8.5) return "#10b981"; // Xanh lá
    if (score >= 7.0) return "#3b82f6"; // Xanh dương
    if (score >= 5.0) return "#f97316"; // Cam
    return "#ef4444"; // Đỏ
};

export const getDimensionProgressColor = (score: number) => {
    if (score >= 85) return "var(--color-bgc-highlight)";
    if (score >= 70) return "#3b82f6";
    if (score >= 50) return "#f97316";
    return "#ef4444";
};
