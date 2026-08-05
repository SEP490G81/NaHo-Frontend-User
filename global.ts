import common from "@/i18n/messages/vi/common.json";
import login from "@/i18n/messages/vi/login.json";
import register from "@/i18n/messages/vi/register.json";
import forgotPassword from "@/i18n/messages/vi/forgot-password.json";
import home from "@/i18n/messages/vi/home.json";
import dashboard from "@/i18n/messages/vi/dashboard.json";
import history from "@/i18n/messages/vi/history.json";
import question from "@/i18n/messages/vi/question.json";
import topic from "@/i18n/messages/vi/topic.json";
import sandbox from "@/i18n/messages/vi/sandbox.json";
import settings from "@/i18n/messages/vi/settings.json";
import liveChatroom from "@/i18n/messages/vi/live-chatroom.json";
import dialogueSetup from "@/i18n/messages/vi/dialogue-setup.json";
import speakingResult from "@/i18n/messages/vi/speaking-result.json";
import marugoto from "@/i18n/messages/vi/marugoto.json";
import leaderboard from "@/i18n/messages/vi/leaderboard.json";
import pointHistory from "@/i18n/messages/vi/point-history.json";
import dailyReward from "@/i18n/messages/vi/daily-reward.json";
import dailyMission from "@/i18n/messages/vi/daily-mission.json";
import legal from "@/i18n/messages/vi/legal.json";
import help from "@/i18n/messages/vi/help.json";

declare module "next-intl" {
    interface AppConfig {
        Messages: typeof common &
            typeof login &
            typeof register &
            typeof forgotPassword &
            typeof home &
            typeof dashboard &
            typeof history &
            typeof question &
            typeof topic &
            typeof sandbox &
            typeof settings &
            typeof liveChatroom &
            typeof dialogueSetup &
            typeof speakingResult &
            typeof marugoto &
            typeof leaderboard &
            typeof pointHistory &
            typeof dailyReward &
            typeof dailyMission &
            typeof legal &
            typeof help;
    }
}
