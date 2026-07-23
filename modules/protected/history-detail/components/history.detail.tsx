"use client";
import React from "react";
import { useParams } from "next/navigation";
import SpeakingResultView from "../features/speaking.result.view";

/** Màn báo cáo chi tiết: dữ liệu thật từ BE (GET /history/{id}). */
export function HistoryDetail() {
    const params = useParams();
    const historyId = params?.historyId as string;
    return <SpeakingResultView historyId={historyId} />;
}

export default HistoryDetail;
