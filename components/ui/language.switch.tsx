"use client";
import React, { useEffect, useRef, useState } from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Button, Menu } from "@mui/material";
import { useTranslations } from "next-intl";
import { routing } from "@/intl/i18n/routing";
import { usePathname, useRouter } from "@/intl/i18n/navigation";
import { useParams } from "next/navigation";

export interface LanguageSwitchProps {
    variant?: "menu-item" | "icon-button";
}

const LanguageSwitch = ({ variant = "menu-item" }: LanguageSwitchProps) => {
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();

    const t = useTranslations();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setAnchorEl(null);
        }, 150);
    };

    const handleMenuMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleMenuMouseLeave = () => {
        handleClose();
    };

    const handleChangeLanguage = (
        nextLocale: (typeof routing.locales)[number],
    ) => {
        router.replace(
            // @ts-expect-error next-intl typed pathname does not include params for static routes
            { pathname, params },
            { locale: nextLocale },
        );
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            {variant === "menu-item" ? (
                <button
                    onMouseEnter={handleOpen}
                    onMouseLeave={handleClose}
                    className="hover:text-text-highlight group hover:bg-hbgc-page flex h-10 w-full cursor-pointer items-center justify-between rounded-md px-5 transition-all duration-150"
                >
                    <div className="flex items-center justify-start">
                        <span className="flex h-10 w-10 items-center">
                            <LanguageOutlinedIcon fontSize="small" />
                        </span>
                        <p className="text-sm font-semibold whitespace-nowrap">
                            {t("layout.header.accountMenu.language")}
                        </p>
                    </div>
                    <span className="text-text-muted group-hover:text-text-highlight">
                        <ChevronRightOutlinedIcon fontSize="small" />
                    </span>
                </button>
            ) : (
                <Button
                    onMouseEnter={handleOpen}
                    onMouseLeave={handleClose}
                    variant="outlined"
                    color="primary"
                    sx={{
                        width: "40px",
                        minWidth: "40px",
                        height: "40px",
                    }}
                >
                    <LanguageOutlinedIcon fontSize="small" />
                </Button>
            )}

            <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                style={{ pointerEvents: "none" }}
                disableScrollLock
                disableRestoreFocus
                autoFocus={false}
                slotProps={{
                    paper: {
                        style: { pointerEvents: "auto" },
                        onMouseEnter: handleMenuMouseEnter,
                        onMouseLeave: handleMenuMouseLeave,
                    },
                }}
            >
                <main className="flex flex-col rounded-md px-1">
                    {routing.locales.map((locale) => {
                        return (
                            <button
                                onClick={() => handleChangeLanguage(locale)}
                                key={locale}
                                className="hover:bg-hbgc-page h-10 w-full cursor-pointer rounded-md pr-10 pl-5 text-left transition-all duration-150"
                            >
                                <p>{t(`metadata.language.${locale}`)}</p>
                            </button>
                        );
                    })}
                </main>
            </Menu>
        </>
    );
};

export default LanguageSwitch;
