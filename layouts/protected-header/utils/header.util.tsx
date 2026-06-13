import { UserResponse } from "@/types/responses/user.response";

export const getUserFullName = (user: UserResponse | null | undefined) => {
    if (!user) {
        return "";
    }
    return user.fullName || "";
};

export const getFirstCharacter = (user: UserResponse | null | undefined) => {
    if (!user) {
        return "";
    }
    const name = user.fullName || user.username || user.email;
    return name.charAt(0).toUpperCase();
};
