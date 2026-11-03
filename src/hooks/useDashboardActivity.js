import { useState, useCallback, useRef } from "react";
import { dashboardApi } from "../api/dashboard.api";

export function useDashboardActivity() {
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // request data yuang lama tidak timpa yang baru
    const requestIdRef = useRef(0);

    const load = useCallback(async (range) => {
        const requestId = ++requestIdRef.current;

        setLoading(true);
        setError("");
        try {
            const result = await dashboardApi.getActivity(range);
            if (requestId !== requestIdRef.current) return;
            setActivity(result);
        } catch (err) {
            if (requestId === requestIdRef.current) setError(err.message);
        } finally {
            if (requestId === requestIdRef.current) setLoading(false);
        }
    }, []);

    return { activity, loading, error, load };
}