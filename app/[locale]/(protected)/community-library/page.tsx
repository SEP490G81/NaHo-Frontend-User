import React from "react";
import { getTranslations } from "next-intl/server";
import CommunityLibrary from "@/modules/protected/community-library/components/community-library";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata.title" });

    return {
        title: t("community-library"),
    };
}

const CommunityLibraryPage = () => {
    return <CommunityLibrary />;
};

export default CommunityLibraryPage;
