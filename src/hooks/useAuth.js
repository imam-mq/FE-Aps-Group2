import { useState, useCallback } from "react";
import { authApi } from "../api/auth.api";

export function useAuth() {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const login  = useCallback(async (username, password) => {
        const result = await authApi.login(username, password);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setToken(result.token);
        setUser(result.user);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    }, []);

    return { token, user, isLoggedIn: Boolean(token), login, logout };
}