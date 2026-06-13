const DEVICE_ID_KEY = "Device-ID";

function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function setCookie(request: {
    name: string;
    value: string;
    maxAgeSeconds: number;
}) {
    if (typeof document === "undefined") return;
    document.cookie = `${request.name}=${request.value}; path=/; max-age=${request.maxAgeSeconds}; SameSite=Lax`;
}

export function getDeviceId(): string {
    let deviceId = getCookie(DEVICE_ID_KEY);

    if (deviceId) {
        return deviceId;
    }

    deviceId = crypto.randomUUID();

    setCookie({
        name: DEVICE_ID_KEY,
        value: deviceId,
        maxAgeSeconds: 315360000,
    });

    return deviceId;
}
