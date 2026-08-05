import ForgotPassword from "@/modules/public/forgot-password/components/forgot.password";
import { getCurrentUser } from "@/services/server/user.service";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

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
        title: t("forgotPassword"),
    };
}

const ForgotPasswordPage = async () => {
    let user = null;
    try {
        user = await getCurrentUser();
    } catch (error) {
        console.log(error);
    }

    if (user) {
        redirect("/dashboard");
    }

    return <ForgotPassword />;
};

export default ForgotPasswordPage;
