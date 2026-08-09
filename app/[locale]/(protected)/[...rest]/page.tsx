import React from "react";
import NotFoundView from "@/components/ui/not.found.view";

export async function generateMetadata(): Promise<{
    title: string;
}> {
    return {
        title: "404",
    };
}

/**
 * Bắt mọi URL không khớp route nào → hiển thị trang 404 tuỳ biến NGAY TRONG
 * shell (sidebar + header) để đồng bộ với 404 của các route hợp lệ.
 */
const CatchAllNotFoundPage = () => {
    return <NotFoundView />;
};

export default CatchAllNotFoundPage;
