import { useEffect, useState } from "react";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const PASSWORD_MASK = "•••••";

const EMPTY_FORM = {
  namaAplikasi: "", urlLink: "", userLogin: "", passwordLogin: "",
  lokasiServer: "", lokasiDatabase: "", layanan: "", koneksi: "",
  skala: "Kecil", isActive: true,
};

function getPasswordStrength(password) {
  if (password.length === 0) return null;
  const adaHuruf = /[A-Za-z]/.test(password);
  const adaAngka = /\d/.test(password);
  const adaSimbol = /[^A-Za-z0-9]/.test(password);
  const panjangCukup = password.length >= 8;

  if (panjangCukup && adaHuruf && adaAngka && adaSimbol) return { text: "Sangat aman", color: "text-green-600" };
  if (panjangCukup && adaHuruf && adaAngka) return { text: "Aman", color: "text-yellow-600" };
  return { text: "Mudah", color: "text-red-600" };
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}

export function AplikasiForm({ isOpen, editingItem, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) setForm(editingItem ? { ...EMPTY_FORM, ...editingItem } : EMPTY_FORM);
  }, [isOpen, editingItem]);

  if (!isOpen) return null;

  const isEdit = Boolean(editingItem);
  const strength = getPasswordStrength(form.passwordLogin);

  const handleChange = (field) => (e) => {
    const value = field === "isActive" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isNewPassword = form.passwordLogin && form.passwordLogin !== PASSWORD_MASK;

    if (!isEdit && !PASSWORD_REGEX.test(form.passwordLogin)) {
      alert("Password minimal 8 karakter & kombinasi huruf serta angka!");
      return;
    }
    if (isEdit && isNewPassword && !PASSWORD_REGEX.test(form.passwordLogin)) {
      alert("Password minimal 8 karakter dan harus kombinasi huruf serta angka!");
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        ...form,
        namaAplikasi: form.namaAplikasi.trim(),
        urlLink: form.urlLink.trim(),
        userLogin: form.userLogin.trim(),
        lokasiServer: form.lokasiServer.trim(),
        lokasiDatabase: form.lokasiDatabase.trim(),
        layanan: form.layanan.trim(),
        koneksi: form.koneksi.trim(),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/45 flex items-center justify-center p-4 z-40"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold">{isEdit ? "Edit Data Aplikasi" : "Tambah Data Aplikasi"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nama Aplikasi">
              <input required value={form.namaAplikasi} onChange={handleChange("namaAplikasi")} className="input" />
            </Field>
            <Field label="URL / Link">
              <input value={form.urlLink} onChange={handleChange("urlLink")} className="input" />
            </Field>
            <Field label="User Login">
              <input value={form.userLogin} onChange={handleChange("userLogin")} className="input" />
            </Field>
            <Field label="Password Login">
              <input type="password" value={form.passwordLogin} onChange={handleChange("passwordLogin")} className="input" />
              {strength && <small className={`block font-semibold mt-1 ${strength.color}`}>{strength.text}</small>}
            </Field>
            <Field label="Lokasi Server">
              <input value={form.lokasiServer} onChange={handleChange("lokasiServer")} className="input" />
            </Field>
            <Field label="Lokasi Database">
              <input value={form.lokasiDatabase} onChange={handleChange("lokasiDatabase")} className="input" />
            </Field>
            <Field label="Layanan">
              <input value={form.layanan} onChange={handleChange("layanan")} placeholder="Web, API, Mobile" className="input" />
            </Field>
            <Field label="Koneksi">
              <input value={form.koneksi} onChange={handleChange("koneksi")} placeholder="VPN, Public, Intranet" className="input" />
            </Field>
            <Field label="Skala">
              <select value={form.skala} onChange={handleChange("skala")} className="input">
                <option>Kecil</option><option>Sedang</option><option>Besar</option>
              </select>
            </Field>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input type="checkbox" checked={form.isActive} onChange={handleChange("isActive")} />
                Is Active
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2.5 mt-5">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">
              Batal
            </button>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60">
              {saving ? "Menyimpan..." : "Simpan Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}