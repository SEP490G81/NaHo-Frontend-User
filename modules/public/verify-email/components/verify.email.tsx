import LeftContent from "@/modules/public/register/components/left.content";
import RightContent from "@/modules/public/verify-email/components/right.content";

const VerifyEmail = ({ email }: { email: string }) => {
    return (
        <div className="flex min-h-screen">
            <LeftContent />
            <RightContent email={email} />
        </div>
    );
};

export default VerifyEmail;
