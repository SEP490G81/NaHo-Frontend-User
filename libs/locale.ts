import { routing } from "@/i18n/routing";

export type AppLocale = (typeof routing.locales)[number];

// Đổi locale bằng cookie + full reload thay vì soft navigation để tránh
// React render lại các thẻ <script> khởi tạo theme trong root layout
// (script không được thực thi lại khi client re-render).
export const applyLocale = (nextLocale: AppLocale) => {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
};
