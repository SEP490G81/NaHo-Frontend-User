import React from "react";
import { getTranslations } from "next-intl/server";
import LessonPath from "@/modules/protected/lesson-path/features/lesson.path";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<{ title: string }> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "common.metadata.title",
    });

    return {
        title: t("lessonPath"),
    };
}

const LessonPathPage = () => {
    return <LessonPath />;
};

export default LessonPathPage;
