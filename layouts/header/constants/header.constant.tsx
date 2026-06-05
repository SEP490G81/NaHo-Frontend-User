import {
    AccountMenuLinkItem,
    AccountMenuStaticItem,
} from "@/layouts/header/types/header.ui.type";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LanguageSwitch from "@/components/ui/language.switch";

export const ACCOUNT_MENU_ITEMS: (
    | AccountMenuLinkItem
    | AccountMenuStaticItem
)[] = [
    {
        id: "i-1",
        titleKey: "settings",
        redirectLink: "/settings",
        icon: <SettingsOutlinedIcon fontSize="small" />,
        type: "LINK",
    },
    {
        id: "i-2",
        component: <LanguageSwitch />,
        type: "STATIC",
    },
    {
        id: "i-3",
        titleKey: "getHelp",
        redirectLink: "/get-help",
        icon: <HelpOutlineOutlinedIcon fontSize="small" />,
        type: "LINK",
    },
];
