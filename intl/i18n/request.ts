import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Mỗi namespace là 1 file json trong thư mục messages/<locale>/
const NAMESPACES = [
    "common",
    "login",
    "register",
    "dashboard",
    "topics",
    "topicDetail",
    "sandbox",
    "history",
    "historyDetail",
    "customQuestion",
    "sandboxCustom",
    "historyCustom",
    "communityLibrary",
] as const;

type Messages = Record<string, unknown>;

// Gộp sâu nhiều file message thành 1 object (để các key lồng nhau như
// "page.login", "page.register"... hợp nhất thay vì ghi đè lẫn nhau)
const deepMerge = (target: Messages, source: Messages): Messages => {
    for (const key of Object.keys(source)) {
        const sourceValue = source[key];
        const targetValue = target[key];
        if (
            sourceValue &&
            typeof sourceValue === "object" &&
            !Array.isArray(sourceValue)
        ) {
            target[key] = deepMerge(
                (targetValue as Messages) ?? {},
                sourceValue as Messages,
            );
        } else {
            target[key] = sourceValue;
        }
    }
    return target;
};

// Nạp toàn bộ namespace có sẵn của 1 locale (namespace nào thiếu thì bỏ qua)
const loadMessages = async (locale: string): Promise<Messages> => {
    const acc: Messages = {};
    await Promise.all(
        NAMESPACES.map(async (ns) => {
            try {
                const mod = await import(`../messages/${locale}/${ns}.json`);
                deepMerge(acc, mod.default as Messages);
            } catch {
                // Locale này chưa có namespace đó -> bỏ qua, sẽ fallback từ
                // locale mặc định
            }
        }),
    );
    return acc;
};

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;

    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    // Lấy locale mặc định (đầy đủ namespace) làm nền, rồi overlay locale hiện
    // tại -> key/namespace chưa dịch tự fallback về mặc định thay vì lỗi
    const messages = await loadMessages(routing.defaultLocale);
    if (locale !== routing.defaultLocale) {
        deepMerge(messages, await loadMessages(locale));
    }

    return { locale, messages };
});