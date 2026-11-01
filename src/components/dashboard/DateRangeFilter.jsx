import { todayString } from "../../utils/date";

const DATE_INPUT =
  "w-40 rounded-lg border border-slate-200 bg-white text-sm px-3 py-1.5 text-slate-900 shadow-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors";

export function DateRangeFilter({ range, error, onChange, onReset }) {
  const today = todayString();

  return (
    <div className="flex flex-col items-start lg:items-end gap-1.5">
      <div className="flex flex-wrap items-end gap-2.5">
        <div>
          <label htmlFor="date-dari" className="block text-xs font-semibold text-slate-500 mb-1">Dari</label>
          <input
            id="date-dari"
            type="date"
            value={range.from}
            max={today}
            onChange={(e) => onChange({ ...range, from: e.target.value })}
            className={DATE_INPUT}
          />
        </div>
        <div>
          <label htmlFor="date-sampai" className="block text-xs font-semibold text-slate-500 mb-1">Sampai</label>
          <input
            id="date-sampai"
            type="date"
            value={range.to}
            max={today}
            onChange={(e) => onChange({ ...range, to: e.target.value })}
            className={DATE_INPUT}
          />
        </div>
        <button
          type="button"
          onClick={onReset}
          className="px-2.5 py-1.5 text-sm font-medium text-slate-500 hover:text-rose-600 transition-colors"
        >
          Reset
        </button>
      </div>

      {error ? (
        <p className="text-[11px] text-rose-600 font-medium">{error}</p>
      ) : (
        <p className="text-[11px] text-slate-500">Maksimal 90 hari. Berlaku untuk bagian Aktivitas.</p>
      )}
    </div>
  );
}