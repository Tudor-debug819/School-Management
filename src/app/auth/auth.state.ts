export interface AuthState {
    user: { uid: string; email: string; role: string } | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}