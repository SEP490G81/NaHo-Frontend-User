import {
    AccountMenuLinkItem,
    AccountMenuStaticItem,
} from "@/layouts/protected-header/types/protected.header.type";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

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
        titleKey: "getHelp",
        redirectLink: "/get-help",
        icon: <HelpOutlineOutlinedIcon fontSize="small" />,
        type: "LINK",
    },
];
