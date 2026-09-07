export function DeleteModal({ target, onCancel, onConfirm }) {
  if (!target) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-40"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center shadow-xl">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
          Konfirmasi Hapus
        </h2>
        <p className="text-slate-600 mb-5">
          Hapus data {target.namaAplikasi}?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg bg-slate-200 text-slate-800 font-semibold hover:bg-slate-300"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}