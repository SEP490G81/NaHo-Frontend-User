import React from "react";
import Button from "@mui/material/Button";
import { useTranslations } from "next-intl";
import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";

interface UpdatePlanButtonProps {
    onOpenModal: () => void;
}

const UpdatePlanButton: React.FC<UpdatePlanButtonProps> = ({ onOpenModal }) => {
    const t = useTranslations("settings.billing");

    return (
        <Button
            variant="contained"
            size="medium"
            startIcon={<UpgradeOutlinedIcon fontSize="small" />}
            onClick={onOpenModal}
            className="bg-primary hover:bg-primary/90 font-bold text-white shadow"
        >
            {t("updatePlan")}
        </Button>
    );
};

export default UpdatePlanButton;
