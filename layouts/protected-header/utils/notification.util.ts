/**
 * Chuẩn hoá targetUrl của thông báo thành đường dẫn nội bộ (giữ nguyên query +
 * hash). BE có thể gửi đường dẫn tương đối ("/books/1/topics/1/nodes/2#8") hoặc
 * URL tuyệt đối kèm origin ("http://localhost:3636/..."). Đẩy nguyên bản tuyệt
 * đối vào router sẽ tải lại cả trang, và nếu origin đó là của môi trường khác
 * thì bấm vào là văng khỏi app — nên luôn cắt origin trước khi điều hướng.
 */
export function toInternalPath(targetUrl: string): string | null {
    const raw = targetUrl.trim();
    if (!raw) return null;
    try {
        const url = new URL(raw, window.location.origin);
        // Gộp hash bị nối chồng ("#comment-18#comment-23") về mảnh cuối, tránh
        // đẩy tiếp một URL rác vào lịch sử trình duyệt.
        const fragment = url.hash.split("#").pop();
        const hash = fragment ? `#${fragment}` : "";
        return `${url.pathname}${url.search}${hash}`;
    } catch {
        return null;
    }
}
