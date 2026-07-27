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
    | "/books"
    | `/books/${string}` // "/books/[bookId]"
    | `/books/${string}/${string}/${string}` // "/books/[bookId]/topics/[topicId]"
    | "/sandbox"
    | `/sandbox/${string}` // hoặc "/sandbox/[questionId]"
    | "/history"
    | `/history/${string}` // hoặc "/history/[historyId]"
    | "/point-history"
    | "/settings"
    | "/settings/account"
    | "/settings/security"
    | "/settings/billing"
    | "/settings/orders"
    | "/dialogue-setup"
    | "/get-help"
    | "/features"
    | "/learner-feedback"
    | "/frequently-questions";

export type RemoveDynamic<T> = T extends `${string}[${string}` ? never : T;
export type StaticRoute = RemoveDynamic<AllRoute>;
export type AnchorRoute = `${StaticRoute}#${string}`;
