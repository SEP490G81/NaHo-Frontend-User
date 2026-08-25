import { QuoteItem } from "@/types/responses/quote.response";
import { clientFetchJson } from "./client.fetch";

/**
 * Service client lấy ngẫu nhiên trích dẫn (Quote) từ API /api/quote
 */
export async function getRandomQuote(): Promise<QuoteItem> {
    return clientFetchJson<QuoteItem>("/api/quote", {
        cache: "no-store",
    });
}
