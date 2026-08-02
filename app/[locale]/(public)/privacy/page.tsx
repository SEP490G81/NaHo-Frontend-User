import LegalDocumentView from "@/modules/public/legal/components/legal.document";
import { getTranslations } from "next-intl/server";

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
        title: t("privacy"),
    };
}

const PrivacyPage = () => {
    return <LegalDocumentView documentKey="privacy" />;
};

export default PrivacyPage;
