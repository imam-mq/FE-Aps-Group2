import axiosClient from "./axiosClient";

function toApiFormat(item) {
    return {
        nama_aplikasi: item.namaAplikasi,
        url_link: item.urlLink,
        user_login: item.userLogin,
        password_login: item.passwordLogin,
        lokasi_server: item.lokasiServer,
        lokasi_database: item.lokasiDatabase,
        layanan: item.layanan,
        koneksi: item.koneksi,
        skala: item.skala,
        is_active: item.isActive,

    };
}

function toFrontendFormat (row) {
    return {
        id: row.id,
        namaAplikasi: row.nama_aplikasi,
        urlLink: row.url_link,
        userLogin: row.user_login,
        passwordLogin: row.password_login,
        lokasiServer: row.lokasi_server,
        lokasiDatabase: row.lokasi_database,
        layanan: row.layanan,
        koneksi: row.koneksi,
        skala: row.skala,
        isActive: row.is_active,  
    };
}

export const aplikasiApi = {
    getAll: async () => {
        const res = await axiosClient.get("/aplikasi");
        return res.data.map(toFrontendFormat);
    },

    create: async (item) => {
        const res = await axiosClient.post("/aplikasi", toApiFormat(item));
        return toFrontendFormat(res.data);
    },

    update: async (id, item) => {
        const res = await axiosClient.patch(`/aplikasi/${id}`, toApiFormat(item));
        return toFrontendFormat(res.data);
    },

    remove: async (id) => {
        const res = await axiosClient.delete(`/aplikasi/${id}`);
        return res.data;
    },
};