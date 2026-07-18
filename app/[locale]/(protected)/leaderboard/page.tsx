import React from "react";
import { getTranslations } from "next-intl/server";
import Leaderboard from "@/modules/protected/leaderboard/components/leaderboard";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "common.metadata.title",
    });

    return {
        title: t("leaderboard"),
    };
}

const LeaderboardPage = () => {
    return <Leaderboard />;
};

export default LeaderboardPage;
