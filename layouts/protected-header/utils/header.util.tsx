import { UserResponse } from "@/types/responses/user.response";

export const getUserFullName = (user: UserResponse | null | undefined) => {
    if (!user) {
        return "";
    }
    if (!user.firstName || user.firstName.trim().length === 0) {
        return "";
    }
    if (!user.lastName || user.lastName.trim().length === 0) {
        return "";
    }
    return user.firstName + " " + user.lastName;
};

export const getFirstCharacter = (user: UserResponse | null | undefined) => {
    if (!user) {
        return "";
    }
    return user.email.charAt(0).toUpperCase();
};
