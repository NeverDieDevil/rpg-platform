import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Adapter Next.js -> Cloudflare Workers.
 *
 * Faza 0 zostaje przy domyślnych ustawieniach (brak cache'u inkrementalnego,
 * brak kolejek). Cache i tagi wymagałyby KV/D1, co dokładamy dopiero wtedy,
 * gdy będzie potrzebne — i po potwierdzeniu, że mieści się w planie Free.
 */
export default defineCloudflareConfig();
