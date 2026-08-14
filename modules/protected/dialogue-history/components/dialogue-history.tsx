"use client";
import { useMemo, useState } from "react";
import { ChevronRight, Clock, MessagesSquare, Search } from "lucide-react";
import { Avatar, Button } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
    getPersonas,
    getSpeakingSessions,
} from "@/services/client/speaking.service";
import { resolveCompanions } from "@/modules/protected/live-chatroom/constants/live-chatroom.constant";
import { getInitials } from "@/modules/protected/live-chatroom/utils/get-initials";
import type { Companion } from "@/modules/protected/live-chatroom/types/live-chatroom.type";
import type { SpeakingSessionStatus } from "@/types/responses/speaking.response";
import { cn } from "@/libs/utils";

type StatusFilter = "" | SpeakingSessionStatus;

const PAGE_SIZE = 8;

function formatWhen(iso: string | null): string {
    if (!iso) return "—";
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? iso : d.toLocaleString();
}

function formatDuration(sec: number): string {
    if (!sec) return "0:00";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export function DialogueHistory() {
    const t = useTranslations("dialogueHistory");

    const [status, setStatus] = useState<StatusFilter>("");
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);

    const { data: personas } = useQuery({
        queryKey: ["personas"],
        queryFn: getPersonas,
        staleTime: 5 * 60 * 1000,
    });

    const companionMap = useMemo(() => {
        const m = new Map<number, Companion>();
        if (personas?.length) {
            resolveCompanions(personas).forEach((c) => {
                if (c.personaId != null) m.set(c.personaId, c);
            });
        }
        return m;
    }, [personas]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["speaking-sessions", { status, search, page }],
        queryFn: () =>
            getSpeakingSessions({
                page,
                size: PAGE_SIZE,
                status: status || null,
                search: search || null,
            }),
        placeholderData: keepPreviousData,
    });

    const items = data?.items ?? [];
    const totalPages = data?.pageMeta?.totalPages ?? 1;

    const applyFilter = (next: StatusFilter) => {
        setStatus(next);
        setPage(0);
    };
    const submitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchInput.trim());
        setPage(0);
    };

    return (
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
            {/* Hero */}
            <header className="border-bdc-primary bg-bgc-app relative overflow-hidden rounded-2xl border p-6 shadow-sm sm:p-8">
                <span
                    aria-hidden
                    className="bg-bgc-highlight absolute inset-y-0 left-0 w-1.5"
                />
                <div className="pl-2">
                    <h1 className="text-text-contrast text-2xl font-bold tracking-tight sm:text-3xl">
                        {t("title")}
                    </h1>
                    <p className="text-text-muted mt-1 text-sm">
                        {t("subtitle")}
                    </p>
                </div>
            </header>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                    {(
                        [
                            ["", t("filterAll")],
                            ["COMPLETED", t("statusCompleted")],
                            ["IN_PROGRESS", t("statusInProgress")],
                        ] as [StatusFilter, string][]
                    ).map(([value, label]) => (
                        <button
                            key={value || "all"}
                            type="button"
                            onClick={() => applyFilter(value)}
                            className={cn(
                                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                                status === value
                                    ? "border-bgc-highlight bg-bgc-highlight/15 text-bgc-highlight"
                                    : "border-bdc-primary text-text-muted hover:border-bgc-highlight/60",
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <form onSubmit={submitSearch} className="relative">
                    <Search className="text-text-muted absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder={t("searchPlaceholder")}
                        className="border-bdc-primary bg-bgc-app text-text-contrast focus:border-bgc-highlight w-full rounded-lg border py-2 pr-3 pl-9 text-sm focus:outline-none sm:w-64"
                    />
                </form>
            </div>

            {/* List */}
            {isLoading ? (
                <div className="text-text-muted py-16 text-center text-sm">
                    {t("loading")}
                </div>
            ) : isError ? (
                <div className="text-text-error py-16 text-center text-sm">
                    {t("error")}
                </div>
            ) : items.length === 0 ? (
                <div className="border-bdc-primary text-text-muted rounded-2xl border border-dashed py-16 text-center text-sm">
                    {t("empty")}
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => {
                        const comp = item.personaId
                            ? companionMap.get(item.personaId)
                            : undefined;
                        const name = comp?.name ?? item.topic ?? "AI";
                        const done = item.status === "COMPLETED";
                        return (
                            <Link
                                key={item.sessionCode}
                                href={`/dialogue-history/${item.sessionCode}`}
                                className="border-bdc-primary bg-bgc-app hover:border-bgc-highlight/60 flex items-center gap-4 rounded-2xl border p-4 shadow-sm transition-colors"
                            >
                                <Avatar
                                    className={`h-12 w-12 shrink-0 ${comp?.accent ?? "bg-bgc-highlight/15 text-bgc-highlight"}`}
                                >
                                    {getInitials(name)}
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                    <div className="text-text-contrast truncate font-semibold">
                                        {item.topic || name}
                                    </div>
                                    <div className="text-text-muted mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                                        <span
                                            className={cn(
                                                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
                                                done
                                                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
                                                    : "bg-amber-500/15 text-amber-600 dark:text-amber-300",
                                            )}
                                        >
                                            {done
                                                ? t("statusCompleted")
                                                : t("statusInProgress")}
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <MessagesSquare className="h-3.5 w-3.5" />
                                            {t("turns", {
                                                count: item.totalTurns,
                                            })}
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            {formatDuration(
                                                item.durationSeconds,
                                            )}
                                        </span>
                                        <span>{formatWhen(item.startedAt)}</span>
                                    </div>
                                </div>
                                {done && (
                                    <div className="hidden shrink-0 flex-col items-center sm:flex">
                                        <span className="text-bgc-highlight text-2xl font-bold">
                                            {item.overallScore}
                                        </span>
                                        {item.jlptEstimate && (
                                            <span className="text-text-muted text-[11px]">
                                                {item.jlptEstimate}
                                            </span>
                                        )}
                                    </div>
                                )}
                                <ChevronRight className="text-text-muted h-5 w-5 shrink-0" />
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                    <Button
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page <= 0}
                        variant="outlined"
                        size="small"
                        className="!rounded-lg capitalize"
                    >
                        {t("prev")}
                    </Button>
                    <span className="text-text-muted text-sm">
                        {t("pageInfo", { page: page + 1, total: totalPages })}
                    </span>
                    <Button
                        onClick={() =>
                            setPage((p) => Math.min(totalPages - 1, p + 1))
                        }
                        disabled={page >= totalPages - 1}
                        variant="outlined"
                        size="small"
                        className="!rounded-lg capitalize"
                    >
                        {t("next")}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default DialogueHistory;
