import { TourStepDef } from "@/components/tour/tour.types";

export const MARUGOTO_TOUR_ID = "marugoto";

/** Bám theo pathname thật (đã bỏ locale) của từng chặng trong luồng Marugoto. */
export const MARUGOTO_TOUR_STEPS: TourStepDef[] = [
    {
        id: "chooseBook",
        routeTest: /^\/books$/,
        targetId: "tour-marugoto-book",
    },
    {
        id: "chooseTopic",
        routeTest: /^\/books\/[^/]+$/,
        targetId: "tour-marugoto-topic",
    },
    {
        id: "roadmap",
        routeTest: /^\/books\/[^/]+\/topics\/[^/]+$/,
        targetId: "tour-marugoto-roadmap",
    },
    {
        id: "practice",
        routeTest: /^\/books\/[^/]+\/topics\/[^/]+\/nodes\/[^/]+$/,
        targetId: "tour-marugoto-practice",
    },
    {
        id: "record",
        routeTest: /^\/sandbox\/[^/]+$/,
        targetId: "tour-marugoto-record",
    },
];
