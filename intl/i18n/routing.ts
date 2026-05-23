import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["vi"],

    // Used when no locale matches
    defaultLocale: "vi",
    // Hide all prefix in the url such as /en, /vi, /ja
    // localePrefix: 'never',

    pathnames: {
        "/home": {
            vi: "/trang-chu",
        },
    },
});
