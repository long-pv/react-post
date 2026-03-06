export const decodeJwtPayload = (token) => {
    if (!token || typeof token !== 'string') return null;

    const parts = token.split('.');
    if (parts.length < 2) return null;

    try {
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
        const json = atob(padded);
        return JSON.parse(json);
    } catch {
        return null;
    }
};

export const extractUserIdFromToken = (token) => {
    const payload = decodeJwtPayload(token);
    const value =
        payload?.userId ??
        payload?.user_id ??
        payload?.uid ??
        payload?.id ??
        payload?.sub ??
        null;

    if (value === null || value === undefined || value === '') return null;

    const asNumber = Number(value);
    return Number.isNaN(asNumber) ? value : asNumber;
};

export const extractUserFromToken = (token) => {
    const payload = decodeJwtPayload(token);
    if (!payload) return null;

    const userId = extractUserIdFromToken(token);
    const username = payload?.username ?? payload?.preferred_username ?? payload?.name ?? null;
    const email = payload?.email ?? null;

    if (!userId && !username && !email) return null;

    return {
        ...(userId ? { id: userId } : {}),
        ...(username ? { username, name: username } : {}),
        ...(email ? { email } : {}),
    };
};
