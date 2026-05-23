import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

const NotificationButton = () => {
    const t = useTranslations();
    return (
        <TooltipCustom arrow title={t("layout.header.notificationButton")}>
            <Button
                variant="text"
                color="primary"
                sx={{
                    width: "40px",
                    minWidth: "40px",
                    height: "40px",
                    borderRadius: "50%",
                }}
            >
                <NotificationsNoneOutlinedIcon />
            </Button>
        </TooltipCustom>
    );
};

export default NotificationButton;
