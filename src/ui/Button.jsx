const VARIANTS = {
  primary: "bg-brand-600 text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 active:bg-brand-800",
  secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
  warning: "bg-amber-50 text-amber-700 border border-amber-200/70 hover:bg-amber-100",
  danger: "bg-rose-50 text-rose-700 border border-rose-200/70 hover:bg-rose-100",
};

const SIZES = {
  sm: "px-2 py-1 text-xs",
  md: "px-4 py-2.5 text-sm",
};

export function Button({ variant = "primary", size = "md", type = "button", className = "", ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    />
  );
}