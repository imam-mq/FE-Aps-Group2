// DATA CONTOH untuk tahap UI. Nanti diganti respons dari backend.

export const MOCK_SUMMARY = { total: 20, aktif: 19, nonaktif: 1 };

export const MOCK_BREAKDOWN = {
  layanan: [
    { label: "Web", count: 10 },
    { label: "API", count: 5 },
    { label: "Mobile", count: 5 },
  ],
  koneksi: [
    { label: "VPN", count: 10 },
    { label: "Public", count: 6 },
    { label: "BPN", count: 4 },
  ],
  skala: [
    { label: "Kecil", count: 12 },
    { label: "Sedang", count: 7 },
    { label: "Besar", count: 1 },
  ],
};

// actionAt dalam UTC, seperti yang tersimpan di database
export const MOCK_ACTIVITIES = [
  { id: 6, action: "UPDATE", user: "imammubaraq", aplikasi: "INFO TMP", changedFields: ["nama_aplikasi", "layanan", "koneksi"], actionAt: "2026-10-26T06:52:31Z" },
  { id: 5, action: "UPDATE", user: "imammubaraq", aplikasi: "SAPBARU", changedFields: ["nama_aplikasi"], actionAt: "2026-10-26T06:51:47Z" },
  { id: 4, action: "UPDATE", user: "imammubaraq", aplikasi: "SAP", changedFields: ["lokasi_database"], actionAt: "2026-10-16T09:16:05Z" },
  { id: 3, action: "UPDATE", user: "imammubaraq", aplikasi: "SAP", changedFields: ["user_login"], actionAt: "2026-10-16T09:13:52Z" },
  { id: 2, action: "CREATE", user: "imammubaraq", aplikasi: "SAP", changedFields: [], actionAt: "2026-10-16T09:12:04Z" },
  { id: 1, action: "UPDATE", user: "imammubaraq", aplikasi: "NPM Mobile", changedFields: ["nama_aplikasi"], actionAt: "2026-10-15T14:17:49Z" },
];