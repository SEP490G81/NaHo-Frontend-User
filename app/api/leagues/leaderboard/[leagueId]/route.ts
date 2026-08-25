import { proxyGet } from "@/services/server/backend.proxy";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ leagueId: string }> },
) {
    const { leagueId } = await params;
    return proxyGet(`/leagues/leaderboard/${leagueId}`);
}
