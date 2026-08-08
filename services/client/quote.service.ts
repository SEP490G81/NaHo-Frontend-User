import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { QuoteItem } from "@/types/responses/quote.response";

/**
 * Service client lấy ngẫu nhiên trích dẫn (Quote) từ API /api/quote
 */
export async function getRandomQuote(): Promise<QuoteItem> {
    const response = await fetch("/api/quote", {
        cache: "no-store",
    });
    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            (result as ProblemDetail).detail ||
                "Không lấy được trích dẫn ngẫu nhiên",
        );
    }

    const api = result as ApiResponse<QuoteItem>;
    return api.data;
}
