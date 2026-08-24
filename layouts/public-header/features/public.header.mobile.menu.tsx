"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Box, Divider, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslations } from "next-intl";
import LanguageSwitch from "@/components/ui/language.switch";
import ThemeSwitchButton from "@/layouts/public-header/components/theme.switch.button";
import AuthButtons from "@/layouts/public-header/components/auth.buttons";
import { HEADER_LINK_ITEMS } from "@/layouts/public-header/constants/public.header.constant";
import { useCurrentUser } from "@/hooks/use.current.user";
import UserAvatar from "@/layouts/sidebar/components/user.avatar";

const PublicHeaderMobileMenu = () => {
    const t = useTranslations();
    const { data: user } = useCurrentUser();
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <IconButton
                onClick={() => setIsOpen(true)}
                aria-label={t("common.layout.header.openMenu")}
                className="text-text-contrast"
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                anchor="right"
                open={isOpen}
                onClose={closeMenu}
                ModalProps={{ keepMounted: true }}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: 280,
                        boxSizing: "border-box",
                        backgroundColor: "var(--color-bgc-app)",
                    },
                }}
            >
                <div className="flex h-full flex-col">
                    <div className="border-bdc-primary flex items-center justify-between border-b px-4 py-3.5">
                        <span className="text-text-contrast text-base font-bold">
                            {t("common.appName")}
                        </span>
                        <IconButton
                            onClick={closeMenu}
                            aria-label={t("common.layout.header.closeMenu")}
                            className="text-text-contrast"
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <Box className="flex flex-1 flex-col gap-1 px-3 py-4">
                        {HEADER_LINK_ITEMS.map((item) => (
                            <Link
                                key={item.id}
                                href={item.redirectLink}
                                onClick={closeMenu}
                                className="text-text-contrast hover:bg-hbgc-app flex h-11 items-center rounded-md px-3 text-sm font-semibold transition-all duration-150"
                            >
                                {t(
                                    `common.metadata.title.${item.titleKey}`,
                                )}
                            </Link>
                        ))}
                    </Box>

                    <Divider className="border-bdc-primary" />

                    <div className="flex items-center justify-between px-4 py-4">
                        <LanguageSwitch
                            variant="icon-button"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        />
                        <ThemeSwitchButton />
                    </div>

                    <div className="border-bdc-primary border-t px-4 py-4">
                        {user ? (
                            <UserAvatar />
                        ) : (
                            <div onClick={closeMenu}>
                                <AuthButtons />
                            </div>
                        )}
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default PublicHeaderMobileMenu;
