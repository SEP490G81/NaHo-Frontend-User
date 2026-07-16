import React from "react";
import { getTranslations } from "next-intl/server";
import BookDetail from "@/modules/protected/topics/features/book.detail";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<{ title: string }> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "common.metadata.title" });

    return {
        title: t("topics"),
    };
}

const BookDetailPage = () => {
    return <BookDetail />;
};

export default BookDetailPage;
