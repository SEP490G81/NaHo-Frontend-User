import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["vi"],

    // Used when no locale matches
    defaultLocale: "vi",
    // Hide all prefix in the url such as /en, /vi, /ja
    localePrefix: 'never',

    pathnames: {
        "/dashboard": {
            vi: "/trang-chu",
        },
        "/login": {
            vi: "/dang-nhap",
        },
        "/introduction": {
            vi: "/gioi-thieu",
        },
        "/forgot-password": {
            vi: "/quen-mat-khau",
        },
        "/register": {
            vi: "/dang-ky",
        },
        "/topics": {
            vi: "/chu-de-kaiwa",
        },
        "/topics/[topicId]": {
            vi: "/chu-de-kaiwa/[topicId]",
        },
        "/sandbox": {
            vi: "/phong-luyen",
        },
        "/sandbox/[questionId]": {
            vi: "/phong-luyen/[questionId]",
        },
        "/history": {
            vi: "/lich-su-luyen-tap",
        },
        "/history/[historyId]": {
            vi: "/lich-su-luyen-tap/[historyId]",
        },
        "/custom-question": {
            vi: "/de-chon-tu-phat",
        },
        "/sandbox-custom/[id]": {
            vi: "/phong-luyen-tu-phat/[id]",
        },
        "/history-custom": {
            vi: "/lich-su-luyen-tap-tu-phat",
        },
        "/community-library": {
            vi: "/thu-vien-cong-dong",
        },
    },
});
