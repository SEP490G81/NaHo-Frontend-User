const Gender = Object.freeze({
    MALE: "MALE",
    FEMALE: "FEMALE",
});
export type Gender = (typeof Gender)[keyof typeof Gender];

const JlptLevel = Object.freeze({
    N1: "N1",
    N2: "N2",
    N3: "N3",
    N4: "N4",
    N5: "N5",
});
export type JlptLevel = (typeof JlptLevel)[keyof typeof JlptLevel];
