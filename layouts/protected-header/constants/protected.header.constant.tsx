import {
    AccountMenuLinkItem,
    AccountMenuStaticItem,
} from "@/layouts/protected-header/types/protected.header.type";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";

export const ACCOUNT_MENU_ITEMS: (
    | AccountMenuLinkItem
    | AccountMenuStaticItem
)[] = [
    {
        id: "i-orders",
        titleKey: "orders",
        redirectLink: "/orders",
        icon: <ReceiptLongOutlinedIcon fontSize="small" />,
        type: "LINK",
    },
    {
        id: "i-point-history",
        titleKey: "pointHistory",
        redirectLink: "/point-history",
        icon: <StarsOutlinedIcon fontSize="small" />,
        type: "LINK",
    },
    {
        id: "i-speaking-history",
        titleKey: "speakingHistory",
        redirectLink: "/speaking-history",
        icon: <HistoryOutlinedIcon fontSize="small" />,
        type: "LINK",
    },
    {
        id: "i-2",
        titleKey: "getHelp",
        redirectLink: "/get-help",
        icon: <HelpOutlineOutlinedIcon fontSize="small" />,
        type: "LINK",
    },
    {
        id: "report-menu-item",
        titleKey: "report",
        redirectLink: "/reports",
        icon: <OutlinedFlagIcon fontSize="small" />,
        type: "LINK",
    },
];
