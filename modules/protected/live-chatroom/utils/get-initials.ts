export const getInitials = (fullName: string): string => {
    if (!fullName) return "";
    return fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
};
