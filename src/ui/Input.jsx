export const FIELD_STYLE =
  "block w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all";

export function Input({ className = "", ...props }) {
  return <input className={`${FIELD_STYLE} ${className}`} {...props} />;
}