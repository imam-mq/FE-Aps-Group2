import { useState, useCallback } from "react";
import { aplikasiApi } from "../api/aplikasi.api";

export function useAplikasiData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadData  = useCallback(async () => {
        setLoading(true);
        try{
            const rows = await aplikasiApi.getAll();
            setData(rows);
        } finally {
            setLoading(false);
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
        await loadData();
    }, [loadData]);

    return { data, loading, loadData, addData, updateData, deleteData };
}