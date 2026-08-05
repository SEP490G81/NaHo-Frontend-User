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

export const getUserAvatarUrl = (
    user: UserResponse | null | undefined,
): string | undefined => {
    if (!user) {
        return undefined;
    }
    if (user.avatar?.accessUrl) {
        return user.avatar.accessUrl;
    }

    if (user.oAuthProviders && user.oAuthProviders.length > 0) {
        const oauthProvider = user.oAuthProviders.find(
            (provider) => provider.avatarUrl,
        );
        if (oauthProvider?.avatarUrl) {
            return oauthProvider.avatarUrl;
        }
    }

    return undefined;
};
