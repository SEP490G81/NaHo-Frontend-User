"use client";
import React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { MenuItem, type MenuProps, Select } from "@mui/material";
import type {
    PointAmountType,
    PointTransactionType,
} from "@/types/responses/point.response";
import { POINT_TYPES } from "../utils/point.util";
import { ContainerBox } from "@/components/ui/container.box";

const dateInputCls =
    "border-bdc-primary bg-bgc-app text-text-contrast focus:border-bgc-highlight h-11 rounded-xl border px-3 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none transition-colors [color-scheme:light] dark:[color-scheme:dark]";

const selectSx = {
    minWidth: 200,
    height: 44,
    backgroundColor: "var(--color-bgc-app)",
    color: "var(--color-text-contrast)",
    borderRadius: "12px",
    fontSize: 14,
    fontWeight: 500,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    transition: "border-color .15s ease",
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--color-bdc-primary)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor:
            "color-mix(in srgb, var(--color-bgc-highlight) 55%, transparent)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--color-bgc-highlight)",
        borderWidth: "1.5px",
    },
    "& .MuiSvgIcon-root": { color: "var(--color-text-muted)" },
};

const menuProps: Partial<MenuProps> = {
    slotProps: {
        paper: {
            sx: {
                mt: 1,
                borderRadius: "12px",
                border: "1px solid var(--color-bdc-primary)",
                backgroundColor: "var(--color-bgc-app)",
                color: "var(--color-text-contrast)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                "& .MuiMenuItem-root": {
                    fontSize: 14,
                    borderRadius: "8px",
                    mx: 0.5,
                    my: 0.25,
                    "&.Mui-selected": {
                        backgroundColor:
                            "color-mix(in srgb, var(--color-bgc-highlight) 14%, transparent)",
                        color: "var(--color-bgc-highlight)",
                        fontWeight: 600,
                    },
                    "&:hover": { backgroundColor: "var(--color-hbgc-app)" },
                },
            },
        },
    },
};

interface Props {
    type: PointTransactionType | "ALL";
    amount: PointAmountType | "ALL";
    from: string;
    to: string;
    onType: (v: PointTransactionType | "ALL") => void;
    onAmount: (v: PointAmountType | "ALL") => void;
    onFrom: (v: string) => void;
    onTo: (v: string) => void;
    onClearDates: () => void;
}

/** Thanh lọc theo loại hoạt động, cộng/trừ điểm & khoảng ngày. */
export function PointHistoryToolbar({
    type,
    amount,
    from,
    to,
    onType,
    onAmount,
    onFrom,
    onTo,
    onClearDates,
}: Props) {
    const t = useTranslations("pointHistory");

    return (
        <ContainerBox className="border-bdc-primary flex flex-wrap items-center gap-3 border">
            <span className="text-text-muted inline-flex items-center gap-1.5 pr-1 text-sm font-semibold">
                <SlidersHorizontal className="h-4 w-4" />
                {t("filterBy")}
            </span>
            <Select
                size="small"
                value={type}
                onChange={(e) =>
                    onType(e.target.value as PointTransactionType | "ALL")
                }
                sx={selectSx}
                MenuProps={menuProps}
            >
                <MenuItem value="ALL">
                    {t("filterType")}: {t("all")}
                </MenuItem>
                {POINT_TYPES.map((ty) => (
                    <MenuItem key={ty} value={ty}>
                        {t(`types.${ty}`)}
                    </MenuItem>
                ))}
            </Select>

            <Select
                size="small"
                value={amount}
                onChange={(e) =>
                    onAmount(e.target.value as PointAmountType | "ALL")
                }
                sx={selectSx}
                MenuProps={menuProps}
            >
                <MenuItem value="ALL">
                    {t("filterAmount")}: {t("all")}
                </MenuItem>
                <MenuItem value="POSITIVE">{t("amountPositive")}</MenuItem>
                <MenuItem value="NEGATIVE">{t("amountNegative")}</MenuItem>
            </Select>

            <div className="flex items-center gap-2">
                <label className="text-text-muted flex items-center gap-1.5 text-sm">
                    <span className="font-medium">{t("dateFrom")}</span>
                    <input
                        type="date"
                        value={from}
                        max={to || undefined}
                        onChange={(e) => onFrom(e.target.value)}
                        className={dateInputCls}
                    />
                </label>
                <label className="text-text-muted flex items-center gap-1.5 text-sm">
                    <span className="font-medium">{t("dateTo")}</span>
                    <input
                        type="date"
                        value={to}
                        min={from || undefined}
                        onChange={(e) => onTo(e.target.value)}
                        className={dateInputCls}
                    />
                </label>
                {(from || to) && (
                    <button
                        type="button"
                        onClick={onClearDates}
                        title={t("clearDates")}
                        aria-label={t("clearDates")}
                        className="text-text-muted hover:text-text-contrast hover:bg-hbgc-app inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </ContainerBox>
    );
}

export default PointHistoryToolbar;
