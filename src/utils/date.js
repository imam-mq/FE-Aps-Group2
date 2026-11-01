const TIME_ZONE = "Asia/Jakarta";
const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_RANGE_DAYS = 30;

export const MAX_RANGE_DAYS = 90;

function parse(dateString) {
    return new Date(`${dateString}T00:00:00Z`);
}

// tanggal format
export function toWibDateString(value) {
    return new Date(value).toLocaleDateString("sv-SE", { timeZone: TIME_ZONE });
}

export function todayString() {
    return toWibDateString(new Date());
}

export function addDays(dateString, days) {
  return new Date(parse(dateString).getTime() + days * DAY_MS).toISOString().slice(0, 10);
}

// filter jumlah hari
export function countDays(from, to) {
  return Math.round((parse(to) - parse(from)) / DAY_MS) + 1;
}

export function eachDay(from, to) {
  return Array.from({ length: countDays(from, to) }, (_, i) => addDays(from, i));
}

export function getDefaultRange() {
  const to = todayString();
  return { from: addDays(to, -(DEFAULT_RANGE_DAYS - 1)), to };
}

// filter jika rentang waktu yang di masukin salah
export function validateRange(from, to) {
    if (!from || !to) return "Tanggal 'Dari' dan 'Sampai' wajib diisi";
    if (from > to) return "Tanggal 'Dari' tidak boleh lebih besar dari 'Sampai'";
    if (to > todayString()) return "Tanggal 'Sampai' tidak boleh melewati hari ini";
    if (countDays(from, to) > MAX_RANGE_DAYS) return `Rentang maksimal ${MAX_RANGE_DAYS} hari`;
    return "";
}

const DAY_MONTH = { day: "numeric", month: "short", timeZone: "UTC" };

export function formatShort(dateString) {
  return parse(dateString).toLocaleDateString("id-ID", DAY_MONTH);
}

export function formatRange(from, to) {
  const end = parse(to).toLocaleDateString("id-ID", { ...DAY_MONTH, year: "numeric" });
  return `${formatShort(from)} – ${end}`;
}

export function formatDateTimeWib(iso) {
  const date = new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: TIME_ZONE,
  });
  const time = new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TIME_ZONE,
  });
  return `${date}, ${time} WIB`;
}

