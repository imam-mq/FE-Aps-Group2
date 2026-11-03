import { useState, useCallback, useRef } from "react";
import { dashboardApi } from "../api/dashboard.api";

export function useDashboardActivity() {
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // request data yuang lama tidak timpa yang baru
    const requestIdRef = useRef(0);
    // rentang tanggal socket
    const rangeRef = useRef(null);

    const fetchActivity = useCallback(async (range, silent) => {
        const requestId = ++requestIdRef.current;
        rangeRef.current = range;

        if (!silent) {
            setLoading(true);
            setError("");
        }
        try {
            const result = await dashboardApi.getActivity(range);
            if (requestId !== requestIdRef.current) return;
            setActivity(result);
            setError("");
        } catch (err) {
            if (requestId === requestIdRef.current && !silent) setError(err.message);
        } finally {
            if (requestId === requestIdRef.current) setLoading(false);
        }
    }, []);

    const load = useCallback((range) => fetchActivity(range, false), [fetchActivity]);

    const reload = useCallback(async () => {
        if (rangeRef.current) await fetchActivity(rangeRef.current, true);
    }, [fetchActivity]);


    return { activity, loading, error, load, reload };
}