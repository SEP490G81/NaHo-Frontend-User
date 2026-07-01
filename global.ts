import common from "@/i18n/messages/vi/common.json";
import login from "@/i18n/messages/vi/login.json";
import register from "@/i18n/messages/vi/register.json";
import home from "@/i18n/messages/vi/home.json";
import dashboard from "@/i18n/messages/vi/dashboard.json";
import history from "@/i18n/messages/vi/history.json";
import question from "@/i18n/messages/vi/question.json";
import topic from "@/i18n/messages/vi/topic.json";
import sandbox from "@/i18n/messages/vi/sandbox.json";
import communityLibrary from "@/i18n/messages/vi/community-library.json";
import settings from "@/i18n/messages/vi/settings.json";
import liveChatroom from "@/i18n/messages/vi/live-chatroom.json";
import dialogueSetup from "@/i18n/messages/vi/dialogue-setup.json";

declare module "next-intl" {
    interface AppConfig {
        Messages: typeof common &
            typeof login &
            typeof register &
            typeof home &
            typeof dashboard &
            typeof history &
            typeof question &
            typeof topic &
            typeof sandbox &
            typeof settings &
            typeof communityLibrary &
            typeof liveChatroom &
            typeof dialogueSetup;
    }
}
