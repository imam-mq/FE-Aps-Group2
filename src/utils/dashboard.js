import { eachDay, formatShort, toWibDateString } from "./date";

// cek aktivitas perhari
export function buildDailySeries(range, activities) {
  const byDate = {};
  for (const activity of activities) {
    const date = toWibDateString(activity.actionAt);
    byDate[date] ??= { create: 0, update: 0, delete: 0 };
    byDate[date][activity.action.toLowerCase()] += 1;
  }

  return eachDay(range.from, range.to).map((date) => ({
    date,
    label: formatShort(date),
    create: byDate[date]?.create ?? 0,
    update: byDate[date]?.update ?? 0,
    delete: byDate[date]?.delete ?? 0,
  }));
}