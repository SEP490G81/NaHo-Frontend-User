import React from "react";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { UpgradeOutlined } from "@mui/icons-material";

const UpdatePlanButton = () => {
    const t = useTranslations();
    return (
        <div className="flex items-start justify-between gap-y-5">
            <div>
                <p>Naho Go</p>
                <span className="text-text-muted text-sm font-semibold">
                    Gói của bạn sẽ tự động gia hạn vào 30 thg 6, 2026
                </span>
            </div>
            <Button
                variant="contained"
                size="small"
                startIcon={<UpgradeOutlined fontSize="small" />}
            >
                {t("page.settings.items.updatePlan")}
            </Button>
        </div>
    );
};

export default UpdatePlanButton;
