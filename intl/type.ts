import { Messages } from "next-intl";

export type MetadataTitleKey = keyof Messages["metadata"]["title"];

export type AllRoute =
    | "/"
    | "/home"
    | "/login"
    | "/forgot-password"
    | "/register"
    | "/settings"
    | "/get-help"
    | "/features"
    | "/learner-feedback"
    | "/frequently-questions"
    | "/dashboard"
    | "/settings/account"
    | "/settings/billing";

export type RemoveDynamic<T> = T extends `${string}[${string}` ? never : T;
export type StaticRoute = RemoveDynamic<AllRoute>;
