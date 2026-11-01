import { useMemo, useState } from "react";
import { StatCard } from "../components/dashboard/StatCard";
import { BreakdownCard } from "../components/dashboard/BreakdownCard";
import { DateRangeFilter } from "../components/dashboard/DateRangeFilter";
import { ActivityChart } from "../components/dashboard/ActivityChart";
import { RecentActivity } from "../components/dashboard/RecentActivity";
import { MOCK_SUMMARY, MOCK_BREAKDOWN, MOCK_ACTIVITIES } from "../data/dashboardMock";
import { buildDailySeries } from "../utils/dashboard";
import { formatRange, getDefaultRange, toWibDateString, validateRange } from "../utils/date";

// warna batang per kategori (kunci: huruf kecil)
const LAYANAN_COLORS = { web: "bg-blue-500", api: "bg-violet-500", mobile: "bg-purple-500" };
const KONEKSI_COLORS = { vpn: "bg-indigo-600", public: "bg-emerald-500", bpn: "bg-amber-500" };
const SKALA_COLORS = { kecil: "bg-slate-600", sedang: "bg-blue-500", besar: "bg-amber-500" };

const RECENT_LIMIT = 5;

function percentOf(part, total) {
  return total === 0 ? 0 : Math.round((part / total) * 100);
}

export function DashboardPage() {
  // range = isi kolom tanggal; appliedRange = rentang valid terakhir yang dipakai untuk data
  const [range, setRange] = useState(getDefaultRange);
  const [appliedRange, setAppliedRange] = useState(getDefaultRange);

  const error = validateRange(range.from, range.to);

  const handleRangeChange = (next) => {
    setRange(next);
    if (!validateRange(next.from, next.to)) setAppliedRange(next);
  };

  const handleReset = () => {
    const defaults = getDefaultRange();
    setRange(defaults);
    setAppliedRange(defaults);
  };

  const activitiesInRange = useMemo(
    () =>
      MOCK_ACTIVITIES.filter((activity) => {
        const date = toWibDateString(activity.actionAt);
        return date >= appliedRange.from && date <= appliedRange.to;
      }),
    [appliedRange]
  );

  const series = useMemo(() => buildDailySeries(appliedRange, activitiesInRange), [appliedRange, activitiesInRange]);

  const recent = useMemo(
    () => [...activitiesInRange].sort((a, b) => b.actionAt.localeCompare(a.actionAt)).slice(0, RECENT_LIMIT),
    [activitiesInRange]
  );

  const rangeLabel = formatRange(appliedRange.from, appliedRange.to);
  const { total, aktif, nonaktif } = MOCK_SUMMARY;

  return (
    <div className="space-y-8">
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Ringkasan data aplikasi Group 2</p>
        </div>
        <DateRangeFilter range={range} error={error} onChange={handleRangeChange} onReset={handleReset} />
      </header>

      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Kondisi Saat Ini</h2>
          <span className="text-xs text-slate-500">Per hari ini, tidak terpengaruh filter tanggal</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard label="Total Aplikasi" value={total} helper="Terdaftar di sistem" icon="total" tone="brand" />
          <StatCard label="Aktif" value={aktif} helper={`${percentOf(aktif, total)}% dari total`} icon="check" tone="emerald" />
          <StatCard label="Nonaktif" value={nonaktif} helper={`${percentOf(nonaktif, total)}% dari total`} icon="cross" tone="rose" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <BreakdownCard title="Berdasarkan Layanan" items={MOCK_BREAKDOWN.layanan} colors={LAYANAN_COLORS} />
          <BreakdownCard title="Berdasarkan Koneksi" items={MOCK_BREAKDOWN.koneksi} colors={KONEKSI_COLORS} />
          <BreakdownCard title="Berdasarkan Skala" items={MOCK_BREAKDOWN.skala} colors={SKALA_COLORS} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Aktivitas</h2>
          <span className="text-xs text-slate-500">{rangeLabel}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <ActivityChart series={series} rangeLabel={rangeLabel} />
          <RecentActivity activities={recent} />
        </div>
      </section>
    </div>
  );
}