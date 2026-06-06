import Login from "@/modules/public/login/components/login";
import { getTranslations } from "next-intl/server";

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
        title: t("login"),
    };
}

const LoginPage = async () => {
    return <Login />;
};

export default LoginPage;
