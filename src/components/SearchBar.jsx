import { Input } from "../ui";

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1 min-w-56">
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari nama aplikasi atau URL..."
        aria-label="Cari aplikasi"
        className="pl-10 pr-9"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          title="Hapus pencarian"
          aria-label="Hapus pencarian"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}