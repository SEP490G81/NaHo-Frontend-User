import { AnchorRoute, MetadataTitleKey, StaticRoute } from "@/i18n/type";

export interface HeaderLinkItem {
    id: string;
    titleKey: MetadataTitleKey;
    redirectLink: StaticRoute | AnchorRoute;
}
