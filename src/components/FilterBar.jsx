import { Button, Select } from "../ui";
import { SearchBar } from "./SearchBar";
import {
  LAYANAN_OPTIONS,
  KONEKSI_OPTIONS,
  SKALA_OPTIONS,
} from "../constants/aplikasiOptions";

function FilterSelect({ value, onChange, allLabel, options }) {
  return (
    <div className="w-40">
      <Select value={value} onChange={(e) => onChange(e.target.value)} aria-label={allLabel}>
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
}

export function FilterBar({ filters, onChange, onReset }) {
  const hasFilter = Object.values(filters).some(Boolean);

  return (
    <section className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
      <SearchBar value={filters.search} onChange={(value) => onChange("search", value)} />

      <div className="flex flex-wrap items-center gap-2.5">
        <FilterSelect
          value={filters.layanan}
          onChange={(value) => onChange("layanan", value)}
          allLabel="Semua Layanan"
          options={LAYANAN_OPTIONS}
        />
        <FilterSelect
          value={filters.koneksi}
          onChange={(value) => onChange("koneksi", value)}
          allLabel="Semua Koneksi"
          options={KONEKSI_OPTIONS}
        />
        <FilterSelect
          value={filters.skala}
          onChange={(value) => onChange("skala", value)}
          allLabel="Semua Skala"
          options={SKALA_OPTIONS}
        />
        {hasFilter && (
          <Button variant="secondary" onClick={onReset} className="px-3 py-2 text-xs">
            Reset
          </Button>
        )}
      </div>
    </section>
  );
}