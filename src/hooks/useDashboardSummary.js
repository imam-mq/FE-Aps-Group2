import { useState, useCallback } from "react";
import { dashboardApi } from "../api/dashboard.api";


export function useDashboardSummary() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // socket muat data dashboard
    const fetchSummary = useCallback(async (silent) => {
        if (!silent) {
            setLoading(true);
            setError("");
        }
        try {
            setSummary(await dashboardApi.getSummary());
            setError("");
        } catch (err) {
            if (!silent) setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const load  = useCallback(() => fetchSummary(false), [fetchSummary]);
    const reload  = useCallback(() => fetchSummary(true), [fetchSummary]);

    return { summary, loading, error, load, reload };
}