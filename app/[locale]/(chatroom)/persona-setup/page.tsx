import React from "react";
import { getTranslations } from "next-intl/server";
import { getAllPersonasServer } from "@/services/server/persona.service";
import { PersonaSetupProvider } from "@/modules/protected/persona-setup/providers/persona.setup.provider";
import PersonaSetupView from "@/modules/protected/persona-setup/features/persona.setup.view";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "common.metadata.title",
    });

    return {
        title: t("personaSetup"),
    };
}

const PersonaSetupPage = async () => {
    const personas = await getAllPersonasServer();

    return (
        <PersonaSetupProvider initialPersonas={personas}>
            <PersonaSetupView personas={personas} />
        </PersonaSetupProvider>
    );
};

export default PersonaSetupPage;
