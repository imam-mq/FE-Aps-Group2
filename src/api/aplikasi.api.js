const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/aplikasi";

async function handleResponse(res) {
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request gagal (status ${res.status})`);
    }
    return res.json();
}

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

function toFrontendFormat(row) {
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
    getAll: async() => {
        const res = await fetch(BASE_URL);
        const rows = await handleResponse(res);
        return rows.map(toFrontendFormat);
    },

    create: async (item) => {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toApiFormat(item)),
        });
        const row = await handleResponse(res);
        return toFrontendFormat(row);
    },

    update: async (id, item) => {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toApiFormat(item)),
        });
        const row = await handleResponse(res);
        return toFrontendFormat(row);
    },

    remove: async (id) => {
        const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
        return handleResponse(res);
    },
};