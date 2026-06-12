import React from "react";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { UpgradeOutlined } from "@mui/icons-material";

const UpdatePlanButton = () => {
    const t = useTranslations();
    return (
        <div className="flex items-start justify-between gap-y-5">
            <div>
                <p>{t("settings.billing.currentPlan")}</p>
                <span className="text-text-muted text-sm font-semibold">
                    {t("settings.billing.planExpiry")}
                </span>
            </div>
            <Button
                variant="contained"
                size="small"
                startIcon={<UpgradeOutlined fontSize="small" />}
            >
                {t("settings.billing.updatePlan")}
            </Button>
        </div>
    );
};

export default UpdatePlanButton;
