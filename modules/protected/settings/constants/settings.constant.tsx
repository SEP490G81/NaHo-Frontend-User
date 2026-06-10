import { SettingsMenuItem } from "@/modules/protected/settings/types/settings.type";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";

export const SETTING_MENU_ITEMS: SettingsMenuItem[] = [
    {
        id: "st-1",
        titleKey: "general",
        redirectLink: "/settings",
        icon: <SettingsOutlinedIcon fontSize="small" />,
    },
    {
        id: "st-2",
        titleKey: "account",
        redirectLink: "/settings/account",
        icon: <AccountCircleOutlinedIcon fontSize="small" />,
    },
    {
        id: "st-3",
        titleKey: "billing",
        redirectLink: "/settings/billing",
        icon: <PaymentOutlinedIcon fontSize="small" />,
    },
];
