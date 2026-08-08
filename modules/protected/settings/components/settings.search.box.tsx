"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { useTranslations } from "next-intl";
import { InputAdornment, Paper, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useRouter } from "@/i18n/navigation";
import { SETTINGS_SEARCH_REGISTRY, SettingSearchItem } from "@/modules/protected/settings/constants/search.registry";

const SettingsSearchBox = () => {
    const tRaw = useTranslations();
    const t = tRaw as (key: string) => string;
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredSuggestions = useMemo(() => {
        const trimmed = query.trim().toLowerCase();
        if (!trimmed) return [];

        return SETTINGS_SEARCH_REGISTRY.filter((item) => {
            const title = t(item.titleKey).toLowerCase();
            const desc = t(item.descriptionKey).toLowerCase();
            const partName = t(`settings.page.${item.partKey}`).toLowerCase();

            const matchesQuery =
                title.includes(trimmed) ||
                desc.includes(trimmed) ||
                partName.includes(trimmed) ||
                item.keywords.some((kw) => kw.toLowerCase().includes(trimmed));

            return matchesQuery;
        });
    }, [query, t]);

    const handleSelectSuggestion = (item: SettingSearchItem) => {
        setIsOpen(false);
        setQuery("");
        router.push(`${item.route}?highlight=${item.settingId}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (filteredSuggestions.length > 0) {
                handleSelectSuggestion(filteredSuggestions[0]);
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full">
            <TextFieldCustom
                fullWidth
                variant="filled"
                size="small"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder={t("settings.searchPlaceholder")}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            {isOpen && query.trim() !== "" && (
                <Paper
                    elevation={4}
                    className="absolute left-0 top-full z-50 mt-1 max-h-72 w-full overflow-y-auto rounded-lg border border-bdc-primary/50 bg-bgc-modal p-1 shadow-xl"
                >
                    {filteredSuggestions.length > 0 ? (
                        <List disablePadding>
                            {filteredSuggestions.map((item) => (
                                <ListItemButton
                                    key={item.id}
                                    onClick={() => handleSelectSuggestion(item)}
                                    className="rounded-md hover:bg-hbgc-page transition-colors px-3 py-2"
                                >
                                    <ListItemText
                                        primary={
                                            <span className="text-sm font-semibold text-text-contrast">
                                                {t(item.titleKey)}
                                            </span>
                                        }
                                        secondary={
                                            <span className="flex flex-col text-xs text-text-muted">
                                                <span>{t(item.descriptionKey)}</span>
                                                <span className="mt-0.5 text-[11px] text-text-highlight font-medium">
                                                    {t(`settings.page.${item.partKey}`)}
                                                </span>
                                            </span>
                                        }
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    ) : (
                        <div className="p-4 text-center">
                            <Typography variant="body2" className="text-xs text-text-muted">
                                {t("settings.searchNoResults")}
                            </Typography>
                        </div>
                    )}
                </Paper>
            )}
        </div>
    );
};

export default SettingsSearchBox;
