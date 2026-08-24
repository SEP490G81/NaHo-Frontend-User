"use client";
import {hashAnchorId, useHashAnchor} from "@/hooks/use.hash.anchor";

/** BE gửi targetUrl của thông báo report dạng "/reports#report-<id>". */
const REPORT_ANCHOR_PREFIX = "report";

/** Id anchor của 1 dòng báo cáo trên DOM. */
export function reportAnchorId(reportId: number) {
    return hashAnchorId(REPORT_ANCHOR_PREFIX, reportId);
}

/** Cuộn tới báo cáo mà thông báo trỏ tới, trả về id cần nháy nền. */
export function useReportAnchor(isReady: boolean) {
    return useHashAnchor(REPORT_ANCHOR_PREFIX, isReady);
}
