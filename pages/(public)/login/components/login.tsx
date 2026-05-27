import React from "react";
import LeftContent from "@/pages/(public)/login/components/left.content";
import RightContent from "@/pages/(public)/login/components/right.content";

const Login = () => {
    return (
        <div className="flex h-screen">
            <LeftContent />
            <RightContent />
        </div>
    );
};

export default Login;
