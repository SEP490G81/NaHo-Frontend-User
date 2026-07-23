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
        <section className="border-bdc-primary bg-bgc-page space-y-2 rounded-xl border p-4">
            <h4 className="text-text-contrast flex items-center gap-2 text-sm font-semibold">
                <span className="text-bgc-highlight">{icon}</span>
                {title}
            </h4>
            {children}
        </section>
    );
}

export default PreviewSection;
