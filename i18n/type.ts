import { Messages } from "next-intl";

export type MetadataTitleKey = keyof Messages["common"]["metadata"]["title"];

export type AllRoute =
    | "/"
    | "/home"
    | "/dashboard"
    | "/login"
    | "/introduction"
    | "/forgot-password"
    | "/register"
    | "/topics"
    | `/topics/${string}` // hoặc "/topics/[topicId]" tùy thuộc vào cách config router của bạn
    | "/sandbox"
    | `/sandbox/${string}` // hoặc "/sandbox/[questionId]"
    | "/history"
    | `/history/${string}` // hoặc "/history/[historyId]"
    | "/custom-question"
    | `/sandbox-custom/${string}` // hoặc "/sandbox-custom/[id]"
    | "/history-custom"
    | "/community-library"
    | "/settings"
    | "/get-help"
    | "/features"
    | "/learner-feedback"
    | "/frequently-questions";

export type RemoveDynamic<T> = T extends `${string}[${string}` ? never : T;
export type StaticRoute = RemoveDynamic<AllRoute>;
export type AnchorRoute = `${StaticRoute}#${string}`;
