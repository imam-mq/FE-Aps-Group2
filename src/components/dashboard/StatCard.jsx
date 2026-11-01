import { Card } from "../../ui";

const ICONS = {
  total:
    "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  check: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  cross: "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

const TONES = {
  brand: "bg-brand-50 text-brand-600",
  emerald: "bg-emerald-50 text-emerald-600",
  rose: "bg-rose-50 text-rose-600",
};

export function StatCard({ label, value, helper, icon, tone = "brand" }) {
  return (
    <Card className="p-5 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 block">{label}</span>
        <p className="text-3xl font-bold text-slate-900 mt-2 truncate leading-none">
          {Number(value).toLocaleString("id-ID")}
        </p>
        <p className="text-xs text-slate-500 mt-2 truncate">{helper}</p>
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${TONES[tone]}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
          <path d={ICONS[icon]} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Card>
  );
}