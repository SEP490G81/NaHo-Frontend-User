const DEVICE_ID_KEY = "deviceId";

export function getDeviceId(): string {
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);

    if (deviceId) {
        return deviceId;
    }

    deviceId = crypto.randomUUID();

    localStorage.setItem(DEVICE_ID_KEY, deviceId);

    return deviceId;
}
