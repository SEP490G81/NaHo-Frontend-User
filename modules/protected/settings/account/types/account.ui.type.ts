export type GenderType = "MALE" | "FEMALE" | "";

export interface AccountFormState {
    username: string;
    fullName: string;
    gender: GenderType;
    dob: string;
    level: string;
    avatarUrl: string | null;
}

export interface AccountFormErrors {
    usernameError: string | null;
    dobError: string | null;
}
