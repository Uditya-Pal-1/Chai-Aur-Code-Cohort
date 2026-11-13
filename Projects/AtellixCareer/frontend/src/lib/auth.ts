"use client";

export interface SessionUser {
  email: string;
  name: string;
  role: "user" | "admin";
}

const KEY = "atellix_session";
const PROFILE_KEY = "atellix_profile";

export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

export function setSession(user: SessionUser) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(KEY);
}

export function isAdmin(): boolean {
  return getSession()?.role === "admin";
}

export interface Profile {
  targetRole: string;
  weeklyHours: number;
  experience: string;
  notifications: { weekly: boolean; milestones: boolean; insights: boolean };
  accent: string;
}

export const DEFAULT_PROFILE: Profile = {
  targetRole: "senior-frontend-engineer",
  weeklyHours: 6,
  experience: "1-3 years",
  notifications: { weekly: true, milestones: true, insights: true },
  accent: "#6a5cf0",
};

export function getProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    return { ...DEFAULT_PROFILE, ...(JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}") as Partial<Profile>) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function setProfile(p: Partial<Profile>) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...getProfile(), ...p }));
}
