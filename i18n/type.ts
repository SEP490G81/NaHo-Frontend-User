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
    | "/verify-email"
    | "/topics"
    | "/books"
    | `/books/${string}` // "/books/[bookId]"
    | `/books/${string}/${string}/${string}` // "/books/[bookId]/topics/[topicId]"
    | `/books/${string}/${string}/${string}/${string}/${string}` // ".../topics/[topicId]/nodes/[nodeId]"
    | "/sandbox"
    | `/sandbox/${string}` // hoặc "/sandbox/[questionId]"
    | "/speaking-history"
    | `/speaking-history/${string}` // hoặc "/speaking-history/[historyId]"
    | "/point-history"
    | "/live-chatroom"
    | `/live-chatroom/${string}`
    | "/dialogue-history"
    | `/dialogue-history/${string}` // hoặc "/dialogue-history/[code]"
    | "/leaderboard"
    | "/speaking-result"
    | "/settings"
    | "/settings/account"
    | "/settings/security"
    | "/settings/billing"
    | "/orders"
    | "/reports"
    | "/persona-setup"
    | "/get-help"
    | "/features"
    | "/learner-feedback"
    | "/frequently-questions"
    | "/terms"
    | "/privacy";

export type RemoveDynamic<T> = T extends `${string}[${string}` ? never : T;
export type StaticRoute = RemoveDynamic<AllRoute>;
export type AnchorRoute = `${StaticRoute}#${string}`;
