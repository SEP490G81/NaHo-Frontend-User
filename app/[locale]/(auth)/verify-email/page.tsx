import VerifyEmail from "@/modules/public/verify-email/components/verify.email";
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
        title: t("verifyEmail"),
    };
}

const VerifyEmailPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ email?: string }>;
}) => {
    let user = null;
    try {
        user = await getCurrentUser();
    } catch (error) {
        console.log(error);
    }

    if (user) {
        redirect("/dashboard");
    }

    const { email } = await searchParams;

    // không có email thì không thể xác thực, quay lại màn đăng ký
    if (!email || !email.includes("@")) {
        redirect("/register");
    }

    return <VerifyEmail email={email} />;
};

export default VerifyEmailPage;
