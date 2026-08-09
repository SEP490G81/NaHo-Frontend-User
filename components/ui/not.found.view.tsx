import React from "react";
import { Compass, Home } from "lucide-react";

/**
 * Giao diện 404 mang thương hiệu NaHo, render trực tiếp tại chỗ (không dùng
 * notFound() boundary để tránh re-render layout gây lỗi thẻ script của MUI).
 */
export function NotFoundView() {
    return (
        <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
            <div
                aria-hidden
                className="bg-bgc-highlight pointer-events-none absolute top-8 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-15 blur-[120px]"
            />

            <div className="pointer-events-none flex items-center justify-center gap-3 leading-none select-none">
                <span className="text-text-muted/15 text-[9rem] font-black md:text-[13rem]">
                    4
                </span>
                <span className="text-bgc-highlight/30 font-noto-jp text-[7rem] font-black md:text-[10rem]">
                    迷
                </span>
                <span className="text-text-muted/15 text-[9rem] font-black md:text-[13rem]">
                    4
                </span>
            </div>

            <h1 className="text-text-contrast mt-2 text-3xl font-bold md:text-4xl">
                Trang không tồn tại
            </h1>
            <p className="text-text-muted mt-3 max-w-md text-sm md:text-base">
                Có vẻ như bạn đã lạc đường. Trang bạn tìm không có trong hệ
                thống hoặc đã được di chuyển.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                    href="/dashboard"
                    className="bg-bgc-highlight text-text-pure inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-90"
                >
                    <Home className="h-4 w-4" />
                    Về trang chủ
                </a>
                <a
                    href="/books"
                    className="border-bdc-primary text-text-contrast hover:bg-hbgc-app inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition"
                >
                    <Compass className="h-4 w-4" />
                    Lộ trình Kaiwa
                </a>
            </div>

            <div className="border-bdc-primary bg-bgc-app text-text-muted mt-10 rounded-xl border px-4 py-2 text-sm">
                <span className="text-bgc-highlight font-noto-jp font-bold">
                    迷
                </span>{" "}
                (めい / mê) — nghĩa là &quot;lạc đường, bối rối&quot;
            </div>
        </div>
    );
}

export default NotFoundView;
