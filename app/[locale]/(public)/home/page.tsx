import { getTranslations } from "next-intl/server";
import Home from "@/modules/public/home/components/home";

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
        title: t("home"),
    };
}

const HomePage = () => {
    return <Home />;
};

export default HomePage;
