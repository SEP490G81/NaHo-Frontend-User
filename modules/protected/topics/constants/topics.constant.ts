import { FilterType } from "../types/topics.type";

export const getFiltersConfig = (t: any) => [
    { value: "all" as FilterType, label: t("filterAll") },
    { value: "office-it" as FilterType, label: "Office & IT" },
    { value: "travel-life" as FilterType, label: "Travel & Daily Life" },
    { value: "brse-interview" as FilterType, label: "BrSE Interview" },
];
