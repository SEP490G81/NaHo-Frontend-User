import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["vi", "en", "jp"],

    // Used when no locale matches
    defaultLocale: "vi",

    // Disable locale prefix in URL paths
    localePrefix: "never",
});
