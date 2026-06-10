import React from "react";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { useTranslations } from "next-intl";
import { InputAdornment } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SettingsSearchBox = () => {
    const t = useTranslations();
    return (
        <div>
            <TextFieldCustom
                fullWidth
                variant="filled"
                size="small"
                placeholder={t("page.settings.searchPlaceholder")}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position={"start"}>
                                <SearchOutlinedIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </div>
    );
};

export default SettingsSearchBox;
