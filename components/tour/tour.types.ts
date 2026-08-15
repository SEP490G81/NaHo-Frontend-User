export interface TourStepDef {
    id: string;
    /** Khớp với pathname (đã bỏ locale) để biết bước này thuộc trang nào. */
    routeTest: RegExp;
    /** Giá trị `data-tour-id` của phần tử thật cần khoanh sáng trên trang đó. */
    targetId: string;
}
