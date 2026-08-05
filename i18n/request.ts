import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const MESSAGE_FILES = [
    "common",
    "login",
    "register",
    "forgot-password",
    "home",
    "dashboard",
    "history",
    "question",
    "topic",
    "sandbox",
    "settings",
    "live-chatroom",
    "dialogue-setup",
    "speaking-result",
    "marugoto",
    "leaderboard",
    "point-history",
    "daily-reward",
    "daily-mission",
    "legal",
    "help",
];

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;

    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    const importedMessages = await Promise.all(
        MESSAGE_FILES.map(async (file) => {
            return (await import(`./messages/${locale}/${file}.json`)).default;
        }),
    );

    const messages = Object.assign({}, ...importedMessages);

    return {
        locale,
        messages,
    };
});
