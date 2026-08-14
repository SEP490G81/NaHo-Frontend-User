import React from "react";

/** Khối mục trong panel xem trước câu hỏi (icon + tiêu đề + nội dung). */
export function PreviewSection({
    icon,
    title,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="border-bdc-primary bg-bgc-app space-y-3 rounded-2xl border p-5 shadow-sm">
            <h4 className="text-text-contrast flex items-center gap-2 text-sm font-bold">
                <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                    style={{
                        background:
                            "color-mix(in srgb, var(--book-accent, var(--color-bgc-highlight)) 14%, transparent)",
                        color: "var(--book-accent, var(--color-bgc-highlight))",
                    }}
                >
                    {icon}
                </span>
                {title}
            </h4>
            {children}
        </section>
    );
}

export default PreviewSection;
