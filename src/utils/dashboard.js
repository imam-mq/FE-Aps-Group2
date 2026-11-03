import { eachDay, formatShort } from "./date";

// cek aktivitas perhari
export function buildDailySeries(range, daily) {
  const byDate = new Map(daily.map((day) => [day.date, day]));

  return eachDay(range.from, range.to).map((date) => {
    const day = byDate.get(date);
    return {
      date,
      label: formatShort(date),
      create: day?.create ?? 0,
      update: day?.update ?? 0,
      delete: day?.delete ?? 0,
    };
  });
}


export function toBreakdownItems(items, options) {
  return items.map(({ key, count }) => {
    const known = options.find((option) => option.toLowerCase() === key);
    const fallback = key.charAt(0).toUpperCase() + key.slice(1);
    return { label: key === "" ? "Belum diisi" : (known ?? fallback), count };
  });
}