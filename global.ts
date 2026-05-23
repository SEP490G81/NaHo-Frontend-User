import messages from "@/intl/messages/vi.json";

declare module "next-intl" {
    interface AppConfig {
        Messages: typeof messages;
    }
}
