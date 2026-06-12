import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/services/server/user.service";
import { redirect } from "next/navigation";
import Login from "@/modules/public/login/components/login";
import GoogleOauth2Provider from "@/components/providers/google.oauth2.provider";

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

    return (
        <GoogleOauth2Provider>
            <Login />
        </GoogleOauth2Provider>
    );
};

export default LoginPage;
