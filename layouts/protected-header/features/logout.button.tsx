import React from "react";
import { useTranslations } from "next-intl";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "@/services/client/user.service";
import { useRouter } from "@/i18n/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";

const LogoutButton = () => {
    const t = useTranslations();
    const { replace } = useRouter();
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        try {
            await logout();

            queryClient.setQueryData(queryKeys.auth.currentUser, null);

            replace("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="px-1 py-2">
            <button
                className="hover:text-text-highlight hover:bg-hbgc-page flex h-10 w-full cursor-pointer items-center justify-start rounded-md px-5 transition-all duration-150"
                onClick={handleLogout}
            >
                <span className="flex h-10 w-10 items-center">
                    <LogoutIcon fontSize="small" />
                </span>
                <p className="text-sm font-semibold whitespace-nowrap">
                    {t("common.layout.header.logoutButton")}
                </p>
            </button>
        </div>
    );
};

export default LogoutButton;
