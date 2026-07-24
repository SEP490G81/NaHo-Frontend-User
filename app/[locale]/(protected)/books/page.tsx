import React from "react";
import { getTranslations } from "next-intl/server";
import Topics from "@/modules/protected/topics/components/topics";

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

const BooksLibraryPage = () => {
    return <Topics />;
};

export default BooksLibraryPage;
