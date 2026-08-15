"use client";
import TourSpotlight from "@/components/tour/tour.spotlight";
import {
    MARUGOTO_TOUR_ID,
    MARUGOTO_TOUR_STEPS,
} from "@/modules/protected/user-guide/constants/marugoto.tour.constant";
import {
    AI_ONE_ON_ONE_TOUR_ID,
    AI_ONE_ON_ONE_TOUR_STEPS,
} from "@/modules/protected/user-guide/constants/ai.one.on.one.tour.constant";

/**
 * Danh sách tour đang bật, tự khai báo steps (chứa RegExp) ngay trong Client
 * Component thay vì nhận qua props — Server Component không được phép truyền
 * RegExp/class xuống Client Component.
 */
export default function ActiveTours() {
    return (
        <>
            <TourSpotlight
                tourId={MARUGOTO_TOUR_ID}
                steps={MARUGOTO_TOUR_STEPS}
                i18nNamespace="userGuide.tours.marugoto"
            />
            <TourSpotlight
                tourId={AI_ONE_ON_ONE_TOUR_ID}
                steps={AI_ONE_ON_ONE_TOUR_STEPS}
                i18nNamespace="userGuide.tours.aiOneOnOne"
            />
        </>
    );
}
