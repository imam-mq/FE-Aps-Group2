const TONES = {
  blue: "bg-blue-50 text-blue-700 border-blue-200/50",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  violet: "bg-violet-50 text-violet-700 border-violet-200/50",
  purple: "bg-purple-50 text-purple-700 border-purple-200/60",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
  amber: "bg-amber-50 text-amber-700 border-amber-200/60",
  slate: "bg-slate-100 text-slate-700 border-slate-200/60",
};

export function Badge({ tone = "slate", className = "", children }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}