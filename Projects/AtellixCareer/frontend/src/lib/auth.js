"use client";
const KEY = "atellix_session";
const PROFILE_KEY = "atellix_profile";
export function getSession() {
    if (typeof window === "undefined")
        return null;
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : null;
    }
    catch (_a) {
        return null;
    }
}
export function setSession(user) {
    localStorage.setItem(KEY, JSON.stringify(user));
}
export function clearSession() {
    localStorage.removeItem(KEY);
}
export function isAdmin() {
    var _a;
    return ((_a = getSession()) === null || _a === void 0 ? void 0 : _a.role) === "admin";
}
export const DEFAULT_PROFILE = {
    targetRole: "senior-frontend-engineer",
    weeklyHours: 6,
    experience: "1-3 years",
    notifications: { weekly: true, milestones: true, insights: true },
    accent: "#6a5cf0",
};
export function getProfile() {
    if (typeof window === "undefined")
        return DEFAULT_PROFILE;
    try {
        return Object.assign(Object.assign({}, DEFAULT_PROFILE), JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}"));
    }
    catch (_a) {
        return DEFAULT_PROFILE;
    }
}
export function setProfile(p) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(Object.assign(Object.assign({}, getProfile()), p)));
}
