import { UserResponse } from "@/types/responses/user.response";

export const getUserFullName = (user: UserResponse | null | undefined) => {
    if (!user) {
        return "";
    }
    return user.fullName || user.username || user.email || "";
};

export const getFirstCharacter = (
    user: UserResponse | null | undefined,
): string => {
    if (!user) {
        return "";
    }
    const name =
        user.fullName && user.fullName.trim() !== ""
            ? user.fullName
            : user.username && user.username.trim() !== ""
              ? user.username
              : user.email && user.email.trim() !== ""
                ? user.email
                : "";

    return name ? name.trim().charAt(0).toUpperCase() : "";
};

export const getUserAvatarUrl = (
    user: UserResponse | null | undefined,
): string | undefined => {
    if (!user) {
        return undefined;
    }
    if (user.avatarUrl && user.avatarUrl.trim() !== "") {
        return user.avatarUrl;
    }

    const providers = user.authProviders || user.oAuthProviders;
    if (providers && providers.length > 0) {
        const providerWithAvatar = providers.find(
            (provider) =>
                provider.avatarUrl && provider.avatarUrl.trim() !== "",
        );
        if (providerWithAvatar?.avatarUrl) {
            return providerWithAvatar.avatarUrl;
        }
    }

    return undefined;
};
