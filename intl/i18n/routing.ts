import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["vi", "en", "jp"],

    // Used when no locale matches
    defaultLocale: "vi",
    // Hide all prefix in the url such as /en, /vi, /ja
    // localePrefix: 'never',

    pathnames: {
        "/home": {
            vi: "/trang-chu",
        },
        "/login": {
            vi: "/dang-nhap",
        },
        "/forgot-password": {
            vi: "/quen-mat-khau",
        },
        "/register": {
            vi: "/dang-ky",
        },
        "/settings": {
            vi: "/cai-dat",
        },
        "/get-help": {
            vi: "/tro-giup",
        },
    },
});
