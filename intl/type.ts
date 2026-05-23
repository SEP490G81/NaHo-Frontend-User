import { Messages } from "next-intl";
import { routing } from "@/intl/i18n/routing";

export type MetadataTitleKey = keyof Messages["metadata"]["title"];
export type AllRoute = keyof typeof routing.pathnames;

export type RemoveDynamic<T> = T extends `${string}[${string}` ? never : T;
export type StaticRoute = RemoveDynamic<AllRoute>;
