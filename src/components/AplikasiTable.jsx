import { Badge, Button } from "../ui";

// Data di database tidak seragam (Web/WEB, VPN/Vpn/vpn), jadi dicocokkan dengan huruf kecil.
// Teks yang tampil tetap seperti yang tersimpan.
const LAYANAN_TONE = { web: "blue", api: "violet", mobile: "purple" };
const KONEKSI_TONE = { public: "green", vpn: "indigo", bpn: "amber" };
const SKALA_TONE = { kecil: "slate", sedang: "blue", besar: "amber" };

function TagBadge({ value, tones }) {
  if (!value) return "-";
  const tone = tones[value.toLowerCase()] || "slate";
  return <Badge tone={tone}>{value}</Badge>;
}

const TH = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 whitespace-nowrap";
const TD = "px-4 py-3 whitespace-nowrap text-slate-700";
const ARROW_BUTTON =
  "p-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors disabled:text-slate-300 disabled:cursor-not-allowed disabled:hover:bg-white";

// nomor halaman: 1 2 3 4 5 … 20, dengan "…" untuk halaman yang dilewati
function getPageItems(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export function AplikasiTable({
  items, currentPage, totalPages, totalData, startIndex, endIndex,
  onPageChange, onEdit, onDelete,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className={TH}>Nama Aplikasi</th>
              <th className={TH}>URL/Link</th>
              <th className={TH}>User Login</th>
              <th className={TH}>Password</th>
              <th className={TH}>Lokasi Server</th>
              <th className={TH}>Lokasi Database</th>
              <th className={TH}>Layanan</th>
              <th className={TH}>Koneksi</th>
              <th className={TH}>Skala</th>
              <th className={TH}>Status</th>
              <th className={`${TH} sticky right-0 bg-slate-50`}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="group border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className={`${TD} font-medium text-slate-900`}>{item.namaAplikasi}</td>
                <td className={TD}>
                  {item.urlLink ? (
                    <a href={item.urlLink} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">
                      {item.urlLink}
                    </a>
                  ) : "-"}
                </td>
                <td className={TD}>{item.userLogin || "-"}</td>
                <td className={TD}>{item.passwordLogin || "•••••"}</td>
                <td className={TD}>{item.lokasiServer || "-"}</td>
                <td className={TD}>{item.lokasiDatabase || "-"}</td>
                <td className={TD}><TagBadge value={item.layanan} tones={LAYANAN_TONE} /></td>
                <td className={TD}><TagBadge value={item.koneksi} tones={KONEKSI_TONE} /></td>
                <td className={TD}><TagBadge value={item.skala} tones={SKALA_TONE} /></td>
                <td className={TD}>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      item.isActive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${item.isActive ? "bg-emerald-500" : "bg-rose-500"}`} />
                    {item.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className={`${TD} sticky right-0 bg-white group-hover:bg-slate-50`}>
                  <div className="flex gap-1.5">
                    <Button variant="warning" size="sm" onClick={() => onEdit(item.id)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => onDelete(item)}>Hapus</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">Data tidak ditemukan.</div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-slate-100 text-sm text-slate-600">
        <span>
          {totalData === 0 ? "0-0 dari 0 data" : `${startIndex + 1}-${endIndex} dari ${totalData} data`}
        </span>

        <nav aria-label="Halaman" className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Halaman sebelumnya"
            className={ARROW_BUTTON}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.75 19.5L8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {getPageItems(currentPage, totalPages).map((item, index) =>
            item === "…" ? (
              <span key={`ellipsis-${index}`} className="px-1 text-slate-400 select-none">…</span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={item === currentPage ? "page" : undefined}
                className={`min-w-8 px-2 py-1 text-xs rounded-md transition-colors ${
                  item === currentPage
                    ? "bg-brand-600 text-white font-semibold shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 font-medium hover:bg-slate-50"
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Halaman berikutnya"
            className={ARROW_BUTTON}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.25 4.5l7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
}