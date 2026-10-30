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

export function AplikasiTable({
  items, currentPage, totalPages, totalData, startIndex, endIndex,
  onPrev, onNext, onEdit, onDelete,
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
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={onPrev} disabled={currentPage === 1}>
            Sebelumnya
          </Button>
          <Button variant="secondary" size="sm" onClick={onNext} disabled={currentPage === totalPages}>
            Berikutnya
          </Button>
        </div>
      </div>
    </div>
  );
}