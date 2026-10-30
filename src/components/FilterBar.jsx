import { useState } from "react";
import { Select } from "../ui";
import { SearchBar } from "./SearchBar";
import {
  LAYANAN_OPTIONS,
  KONEKSI_OPTIONS,
  SKALA_OPTIONS,
  STATUS_OPTIONS,
} from "../constants/aplikasiOptions";

const ADVANCED_KEYS = ["layanan", "koneksi", "skala"];

function StatusTabs({ value, onChange }) {
  return (
    <div
      role="group"
      aria-label="Filter status"
      className="inline-flex items-center p-1 bg-slate-100/90 border border-slate-200/80 rounded-lg text-xs font-medium text-slate-600"
    >
      {STATUS_OPTIONS.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
              active ? "bg-white text-slate-900 font-semibold shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {option.dot && <span className={`w-1.5 h-1.5 rounded-full ${option.dot}`} />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function SelectField({ label, value, onChange, allLabel, options }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-slate-500 mb-1">{label}</span>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </label>
  );
}

export function FilterBar({ filters, onChange, onReset }) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const advancedCount = ADVANCED_KEYS.filter((key) => filters[key]).length;
  const hasFilter = Object.values(filters).some(Boolean);

  return (
    <section className="bg-white rounded-xl border border-slate-200/90 shadow-sm mb-4">
      <div className="p-4 flex flex-wrap items-center gap-3">
        <SearchBar value={filters.search} onChange={(value) => onChange("search", value)} />
        <StatusTabs value={filters.status} onChange={(value) => onChange("status", value)} />

        <button
          type="button"
          aria-expanded={isAdvancedOpen}
          onClick={() => setIsAdvancedOpen((open) => !open)}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 4.5h18m-14 5h10m-7 5h4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Filter Lanjutan
          {advancedCount > 0 && (
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-brand-50 text-brand-700 border border-brand-100">
              {advancedCount}
            </span>
          )}
        </button>

        {hasFilter && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Reset Filter
          </button>
        )}
      </div>

      {isAdvancedOpen && (
        <div className="px-4 pb-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SelectField
            label="Layanan"
            value={filters.layanan}
            onChange={(value) => onChange("layanan", value)}
            allLabel="Semua Layanan"
            options={LAYANAN_OPTIONS}
          />
          <SelectField
            label="Koneksi"
            value={filters.koneksi}
            onChange={(value) => onChange("koneksi", value)}
            allLabel="Semua Koneksi"
            options={KONEKSI_OPTIONS}
          />
          <SelectField
            label="Skala"
            value={filters.skala}
            onChange={(value) => onChange("skala", value)}
            allLabel="Semua Skala"
            options={SKALA_OPTIONS}
          />
        </div>
      )}
    </section>
  );
}