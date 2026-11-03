import axiosClient from "./axiosClient";
export const dashboardApi = {
    getSummary: async () => {
        const res = await axiosClient.get("/dashboard/summary");
        return res.data;
    },

    // range akan di simpan di hasil 
    getActivity: async ({ from, to }) => {
        const res = await axiosClient.get("/dashboard/activity", { params: { from, to } });
        return { range: { from, to }, ...res.data };
    },
};