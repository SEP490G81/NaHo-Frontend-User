import { GenderType } from "../types/account.ui.type";

export interface GenderOption {
    value: GenderType;
    labelKey: "genderUnspecified" | "genderMale" | "genderFemale";
}

export const GENDER_OPTIONS: GenderOption[] = [
    { value: "", labelKey: "genderUnspecified" },
    { value: "MALE", labelKey: "genderMale" },
    { value: "FEMALE", labelKey: "genderFemale" },
];

export const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
