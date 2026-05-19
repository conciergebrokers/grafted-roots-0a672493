// Stub auth context. Replace with a real provider when wiring backend.

export type AuthUser = {
  id: string;
  email: string;
  role: "member" | "branch_leader" | "admin";
  branchId?: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
};

export const defaultAuth: AuthState = {
  isAuthenticated: false,
  user: null,
};

export function useAuth(): AuthState {
  return defaultAuth;
}