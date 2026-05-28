import { auth } from "@/auth";
import { redirect } from "@/intl/i18n/navigation";
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

const LoginPage = async ({ params }: { params: { locale: string } }) => {
    const { locale } = await params;
    const session = await auth();

    if (session?.user) {
        redirect({
            href: "/home",
            locale,
        });
    }

    return <Login />;
};

export default LoginPage;
