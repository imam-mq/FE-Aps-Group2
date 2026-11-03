import { useState, useCallback } from "react";
import { dashboardApi } from "../api/dashboard.api";


export function useDashboardSummary() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            setSummary(await dashboardApi.getSummary());
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    },[]);

    return { summary, loading, error, load };
}