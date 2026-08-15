"use client";
import { useEffect, useState, useSyncExternalStore } from "react";

/** Chờ trang trượt tới nơi rồi mới nháy (ms). */
const SCROLL_SETTLE_DELAY = 600;

/** Id anchor trên DOM của một bản ghi: ("comment", 8) → "comment-8". */
export function hashAnchorId(prefix: string, id: number) {
    return `${prefix}-${id}`;
}

function subscribeHash(onChange: () => void) {
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
}

/**
 * Lấy id từ hash. Chấp nhận cả "#123" lẫn "#<prefix>-123" vì BE gửi targetUrl
 * theo dạng thứ hai. Bấm liên tiếp nhiều thông báo cùng trang thì Next nối hash
 * ("#comment-23#comment-18") — mảnh cuối là lần bấm mới nhất.
 */
function parseAnchorId(hash: string, prefix: string): number | null {
    let last = hash.split("#").pop() ?? "";
    if (last.startsWith(`${prefix}-`)) last = last.slice(prefix.length + 1);
    return /^\d+$/.test(last) ? Number(last) : null;
}

/**
 * Đọc id từ hash URL, cuộn tới đúng phần tử khi danh sách đã render xong, rồi
 * trả về id cần nháy để component tô sáng.
 *
 * Không dựa được vào cuộn-theo-hash mặc định của trình duyệt: dữ liệu nạp bất
 * đồng bộ nên lúc điều hướng xong phần tử chưa tồn tại trong DOM. Dùng
 * useSyncExternalStore thay vì đọc hash trong useEffect để không set state đồng
 * bộ trong effect (rule react-hooks/set-state-in-effect của repo).
 */
export function useHashAnchor(prefix: string, isReady: boolean) {
    const hash = useSyncExternalStore(
        subscribeHash,
        () => window.location.hash,
        () => "",
    );
    const targetId = parseAnchorId(hash, prefix);
    const [flashId, setFlashId] = useState<number | null>(null);

    useEffect(() => {
        if (targetId == null || !isReady) return;
        const target = document.getElementById(hashAnchorId(prefix, targetId));
        if (!target) return;

        target.scrollIntoView({ behavior: "smooth", block: "center" });
        // Đang đứng sẵn ở trang rồi bấm tiếp thông báo cùng trang thì Next nối
        // hash thay vì thay — viết lại URL cho sạch. replaceState không sinh
        // entry lịch sử và không bắn hashchange nên không lặp lại effect này.
        const canonicalHash = `#${hashAnchorId(prefix, targetId)}`;
        if (window.location.hash !== canonicalHash) {
            const { pathname, search } = window.location;
            window.history.replaceState(
                null,
                "",
                `${pathname}${search}${canonicalHash}`,
            );
        }
        // Bật cờ nháy ngay lúc render thì animation cháy hết trong lúc màn hình
        // còn đang trượt — tới nơi là đã tắt. Đợi cuộn xong rồi mới nháy.
        const timeoutId = setTimeout(
            () => setFlashId(targetId),
            SCROLL_SETTLE_DELAY,
        );
        return () => clearTimeout(timeoutId);
    }, [prefix, targetId, isReady]);

    return flashId;
}
