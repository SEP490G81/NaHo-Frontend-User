// Type của Messages lấy từ locale mặc định (vi) — nơi có đầy đủ namespace.
import common from "@/intl/messages/vi/common.json";
import login from "@/intl/messages/vi/login.json";
import register from "@/intl/messages/vi/register.json";
import dashboard from "@/intl/messages/vi/dashboard.json";
import topics from "@/intl/messages/vi/topics.json";
import topicDetail from "@/intl/messages/vi/topicDetail.json";
import sandbox from "@/intl/messages/vi/sandbox.json";
import history from "@/intl/messages/vi/history.json";
import historyDetail from "@/intl/messages/vi/historyDetail.json";
import customQuestion from "@/intl/messages/vi/customQuestion.json";
import sandboxCustom from "@/intl/messages/vi/sandboxCustom.json";
import historyCustom from "@/intl/messages/vi/historyCustom.json";
import communityLibrary from "@/intl/messages/vi/communityLibrary.json";

type Messages = typeof common &
    typeof login &
    typeof register &
    typeof dashboard &
    typeof topics &
    typeof topicDetail &
    typeof sandbox &
    typeof history &
    typeof historyDetail &
    typeof customQuestion &
    typeof sandboxCustom &
    typeof historyCustom &
    typeof communityLibrary;

declare module "next-intl" {
    interface AppConfig {
        Messages: Messages;
    }
}
