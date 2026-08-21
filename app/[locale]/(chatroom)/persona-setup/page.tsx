import { getTranslations } from "next-intl/server";
import { getAllPersonas } from "@/services/client/persona.service";

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
        title: t("dialogueSetup"),
    };
}

const DialogueSetupPage = async () => {
    const personaResponse = await getAllPersonas();
    const personas = personaResponse.data;
};

export default DialogueSetupPage;
