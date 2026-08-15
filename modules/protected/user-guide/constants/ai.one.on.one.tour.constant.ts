import { TourStepDef } from "@/components/tour/tour.types";

export const AI_ONE_ON_ONE_TOUR_ID = "aiOneOnOne";

/**
 * Bám theo pathname thật của luồng AI 1:1: thiết lập (chọn persona → bắt đầu)
 * → phòng chat (trò chuyện → kết thúc) → kết quả. 2 cặp bước đầu/giữa cùng nằm
 * trên 1 route — engine tự tiến khi người dùng bấm đúng phần tử đang khoanh sáng.
 */
export const AI_ONE_ON_ONE_TOUR_STEPS: TourStepDef[] = [
    {
        id: "persona",
        routeTest: /^\/dialogue-setup$/,
        targetId: "tour-ai1on1-persona",
    },
    {
        id: "start",
        routeTest: /^\/dialogue-setup$/,
        targetId: "tour-ai1on1-start",
    },
    {
        id: "chat",
        routeTest: /^\/live-chatroom$/,
        targetId: "tour-ai1on1-chat",
    },
    {
        id: "end",
        routeTest: /^\/live-chatroom$/,
        targetId: "tour-ai1on1-end",
    },
    {
        id: "result",
        routeTest: /^\/speaking-result$/,
        targetId: "tour-ai1on1-result",
    },
];
