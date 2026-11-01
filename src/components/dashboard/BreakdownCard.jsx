import { Card } from "../../ui";

const MAX_ROWS = 5;

// tampilkan 5 kategori terbesar, sisanya digabung jadi "Lainnya"
function toRows(items) {
  const sorted = [...items].sort((a, b) => b.count - a.count);
  if (sorted.length <= MAX_ROWS) return sorted;
  const rest = sorted.slice(MAX_ROWS).reduce((sum, item) => sum + item.count, 0);
  return [...sorted.slice(0, MAX_ROWS), { label: "Lainnya", count: rest }];
}

export function BreakdownCard({ title, items, colors }) {
  const total = items.reduce((sum, item) => sum + item.count, 0);
  const rows = toRows(items);

  return (
    <Card className="p-5">
      <h3 className="font-bold text-slate-900 text-sm mb-4">{title}</h3>

      {rows.length === 0 ? (
        <p className="text-xs text-slate-400">Belum ada data.</p>
      ) : (
        <div className="space-y-3.5">
          {rows.map((row) => {
            // dipakai untuk lebar batang saja, tidak ditampilkan sebagai teks
            const width = total === 0 ? 0 : (row.count / total) * 100;
            const color = colors[row.label.toLowerCase()] || "bg-slate-400";
            return (
              <div key={row.label}>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-medium text-slate-700 truncate pr-2" title={row.label}>
                    {row.label}
                  </span>
                  <span className="font-semibold text-slate-900 shrink-0">
                    {row.count.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full min-w-[6px] ${color}`} style={{ width: `${width}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}