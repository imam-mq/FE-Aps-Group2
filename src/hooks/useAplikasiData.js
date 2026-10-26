import { useState, useCallback, useRef } from "react";
import { aplikasiApi } from "../api/aplikasi.api";

const EMPTY_META = { page: 1, limit: 10, total: 0, totalPages: 1 };

export function useAplikasiData() {
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState(EMPTY_META);
    const [loading, setLoading] = useState(false);

    // parameter terakhir, dipakai saat loadData() dipanggil tanpa argumen (mis. dari WebSocket)
    const paramsRef = useRef({});
    // penanda request terbaru, supaya jawaban lama tidak menimpa yang baru
    const requestIdRef = useRef(0);

    const loadData = useCallback(async (params) => {
        if (params) paramsRef.current = params;
        const requestId = ++requestIdRef.current;

        setLoading(true);
        try {
            const result = await aplikasiApi.getAll(paramsRef.current);
            if (requestId !== requestIdRef.current) return;
            setData(result.rows);
            setMeta(result.meta);
            return result;
        } catch (err) {
            if (requestId === requestIdRef.current) {
                console.error("Gagal memuat data:", err.message);
            }
        } finally {
            if (requestId === requestIdRef.current) setLoading(false);
        }
    }, []);

    const addData = useCallback(async (item) => {
        await aplikasiApi.create(item);
        await loadData();
    }, [loadData]);

    const updateData = useCallback(async (id, item) => {
        await aplikasiApi.update(id, item);
        await loadData();
    }, [loadData]);

    const deleteData = useCallback(async (id) => {
        await aplikasiApi.remove(id);
        return loadData();
    }, [loadData]);

    return { data, meta, loading, loadData, addData, updateData, deleteData };
}