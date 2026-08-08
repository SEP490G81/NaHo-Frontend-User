const Gender = Object.freeze({
    MALE: "MALE",
    FEMALE: "FEMALE",
});
export type Gender = (typeof Gender)[keyof typeof Gender];

const JlptLevel = Object.freeze({
    N1: "N1",
    N2: "N2",
    N3: "N3",
    N4: "N4",
    N5: "N5",
});
export type JlptLevel = (typeof JlptLevel)[keyof typeof JlptLevel];

const UserStatus = Object.freeze({
    ACTIVE: "ACTIVE",
    UNACTIVE: "UNACTIVE",
    DELETED: "DELETED",
});
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const RoleName = Object.freeze({
    LEARNER: "LEARNER",
    CONTENT_MANAGER: "CONTENT_MANAGER",
    ADMIN: "ADMIN",
});
export type RoleName = (typeof RoleName)[keyof typeof RoleName];

export const OAuthProviderName = Object.freeze({
    GOOGLE: "GOOGLE",
    FACEBOOK: "FACEBOOK",
    APPLE: "APPLE",
});
export type OAuthProviderName =
    (typeof OAuthProviderName)[keyof typeof OAuthProviderName];

export const AuthProviderName = OAuthProviderName;
export type AuthProviderName = OAuthProviderName;
