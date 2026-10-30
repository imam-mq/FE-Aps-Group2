import { FIELD_STYLE } from "./Input";

export function Select({ className = "", children, ...props }) {
  return (
    <div className="relative">
      <select
        className={`peer appearance-none pr-9 cursor-pointer ${FIELD_STYLE} ${className}`}
        {...props}
      >
        {children}
      </select>
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none transition-transform duration-200 peer-[:open]:rotate-180"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}