import { useEffect, useMemo, useState } from "react";
import { StatCard } from "../components/dashboard/StatCard";
import { BreakdownCard } from "../components/dashboard/BreakdownCard";
import { DateRangeFilter } from "../components/dashboard/DateRangeFilter";
import { ActivityChart } from "../components/dashboard/ActivityChart";
import { RecentActivity } from "../components/dashboard/RecentActivity";
import { LoadState } from "../components/dashboard/LoadState";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import { useDashboardActivity } from "../hooks/useDashboardActivity";
import { socket } from "../api/socket";
import { LAYANAN_OPTIONS, KONEKSI_OPTIONS, SKALA_OPTIONS } from "../constants/aplikasiOptions";
import { buildDailySeries, toBreakdownItems } from "../utils/dashboard";
import { formatRange, getDefaultRange, validateRange } from "../utils/date";

// warna per kategori
const LAYANAN_COLORS = { web: "bg-blue-500", api: "bg-violet-500", mobile: "bg-purple-500" };
const KONEKSI_COLORS = { vpn: "bg-indigo-600", public: "bg-emerald-500", bpn: "bg-amber-500" };
const SKALA_COLORS = { kecil: "bg-slate-600", sedang: "bg-blue-500", besar: "bg-amber-500" };

const REFRESH_DELAY_MS = 500;


function percentOf(part, total) {
  return total === 0 ? 0 : Math.round((part / total) * 100);
}

export function DashboardPage() {
  // range = isi kolom tanggal; appliedRange = rentang valid terakhir yang dipakai untuk memuat data
  const [range, setRange] = useState(getDefaultRange);
  const [appliedRange, setAppliedRange] = useState(getDefaultRange);

  const {
    summary,
    error: summaryError,
    load: loadSummary,
    reload: reloadSummary,
  } = useDashboardSummary();
  const {
    activity,
    loading: activityLoading,
    error: activityError,
    load: loadActivity,
    reload: reloadActivity,
  } = useDashboardActivity();

  // ringkasan dimuat sekali
  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  useEffect(() => {
    loadActivity(appliedRange);
  }, [loadActivity, appliedRange]);

  useEffect(() => {
    socket.connect();
    let timer;

    const handleChanged = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        reloadSummary();
        reloadActivity();
      }, REFRESH_DELAY_MS);
    };

    socket.on("aplikasi:changed", handleChanged);
    return () => {
      clearTimeout(timer);
      socket.off("aplikasi:changed", handleChanged);
      socket.disconnect();
    };
  }, [reloadSummary, reloadActivity]);

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

  const series = useMemo(
    () => (activity ? buildDailySeries(activity.range, activity.daily) : []),
    [activity]
  );

  const shownRange = activity?.range ?? appliedRange;
  const rangeLabel = formatRange(shownRange.from, shownRange.to);

  return (
    <div className="space-y-8">
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Ringkasan data aplikasi</p>
        </div>
        <DateRangeFilter range={range} error={error} onChange={handleRangeChange} onReset={handleReset} />
      </header>

      <section className="space-y-4">
        {summary ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <StatCard label="Total Aplikasi" value={summary.total} helper="Terdaftar di sistem" icon="total" tone="brand" />
              <StatCard label="Aktif" value={summary.aktif} helper={`${percentOf(summary.aktif, summary.total)}% dari total`} icon="check" tone="emerald" />
              <StatCard label="Nonaktif" value={summary.nonaktif} helper={`${percentOf(summary.nonaktif, summary.total)}% dari total`} icon="cross" tone="rose" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <BreakdownCard title="Berdasarkan Layanan" items={toBreakdownItems(summary.layanan, LAYANAN_OPTIONS)} colors={LAYANAN_COLORS} />
              <BreakdownCard title="Berdasarkan Koneksi" items={toBreakdownItems(summary.koneksi, KONEKSI_OPTIONS)} colors={KONEKSI_COLORS} />
              <BreakdownCard title="Berdasarkan Skala" items={toBreakdownItems(summary.skala, SKALA_OPTIONS)} colors={SKALA_COLORS} />
            </div>
          </>
        ) : (
          <LoadState error={summaryError} onRetry={loadSummary} />
        )}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Aktivitas</h2>
          <span className="text-xs text-slate-500">{rangeLabel}</span>
        </div>

        {activityError ? (
          <LoadState error={activityError} onRetry={() => loadActivity(appliedRange)} />
        ) : activity ? (
          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-5 items-start transition-opacity ${
              activityLoading ? "opacity-60" : ""
            }`}
          >
            <ActivityChart series={series} rangeLabel={rangeLabel} />
            <RecentActivity activities={activity.recent} />
          </div>
        ) : (
          <LoadState />
        )}
      </section>
    </div>
  );
}