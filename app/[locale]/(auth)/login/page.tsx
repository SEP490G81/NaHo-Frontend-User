import Login from "@/modules/public/login/components/login";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/services/server/user.service";
import { redirect } from "next/navigation";

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
    try {
        const user = await getCurrentUser();
        if (user) {
            redirect("/dashboard");
        }
    } catch (error) {
        console.log(error);
    }

    return <Login />;
};

export default LoginPage;
