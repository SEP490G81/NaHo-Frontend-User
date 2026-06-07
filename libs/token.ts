// Helper to check if a JWT token is expired or expiring soon
export function isTokenExpired(token: string | undefined): boolean {
    if (!token) return true;
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return true;
        const payload = parts[1];
        const decoded = atob(payload.replaceAll("-", "+").replaceAll("_", "/"));
        const data = JSON.parse(decoded);
        const exp = data.exp;
        if (typeof exp !== "number") return true;
        // Check if token is expired or will expire in the next 60 seconds (grace period)
        const bufferSeconds = 60;
        return exp - Math.floor(Date.now() / 1000) < bufferSeconds;
    } catch {
        return true;
    }
}
