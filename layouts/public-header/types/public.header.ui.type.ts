import { AnchorRoute, MetadataTitleKey, StaticRoute } from "@/intl/type";

export interface HeaderLinkItem {
    id: string;
    titleKey: MetadataTitleKey;
    redirectLink: StaticRoute | AnchorRoute;
}
