"use client";
import { routing } from "@/i18n/routing";
import { AppLocale, applyLocale } from "@/libs/locale";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { Menu, MenuItem } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { MouseEvent, useState } from "react";

const LegalLanguageSelect = () => {
    const t = useTranslations();
    const currentLocale = useLocale() as AppLocale;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleSelect = (nextLocale: AppLocale) => {
        setAnchorEl(null);
        if (nextLocale !== currentLocale) applyLocale(nextLocale);
    };

    return (
        <>
            <button
                type="button"
                onClick={(event: MouseEvent<HTMLButtonElement>) =>
                    setAnchorEl(event.currentTarget)
                }
                className="hover:text-text-highlight flex cursor-pointer items-center gap-x-2 text-base font-medium transition-colors"
            >
                <LanguageOutlinedIcon fontSize="small" />
                {t(`common.metadata.language.${currentLocale}`)}
                <ExpandMoreIcon fontSize="small" />
            </button>

            <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                disableScrollLock
            >
                {routing.locales.map((locale) => (
                    <MenuItem
                        key={locale}
                        selected={locale === currentLocale}
                        onClick={() => handleSelect(locale)}
                    >
                        {t(`common.metadata.language.${locale}`)}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default LegalLanguageSelect;
