import { Noto_Sans_JP, Quicksand } from "next/font/google";

export const fontQuicksand = Quicksand({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-quicksand",
});

export const fontNotoSansJP = Noto_Sans_JP({
    weight: ["400", "500", "700"],
    display: "swap",
    variable: "--font-noto-sans-jp"
});

