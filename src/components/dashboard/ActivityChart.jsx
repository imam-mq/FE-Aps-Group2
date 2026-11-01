import { useEffect, useRef } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import { Card } from "../../ui";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

// warna sama dengan emerald-500, amber-500, rose-500 di Tailwind
const SERIES = [
  { key: "create", label: "Create", color: "#10b981", legendClass: "bg-emerald-500" },
  { key: "update", label: "Update", color: "#f59e0b", legendClass: "bg-amber-500" },
  { key: "delete", label: "Delete", color: "#f43f5e", legendClass: "bg-rose-500" },
];

const TICK_STYLE = { color: "#94a3b8", font: { size: 11 } };

export function ActivityChart({ series, rangeLabel }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const total = series.reduce((sum, day) => sum + day.create + day.update + day.delete, 0);

  // buat grafik satu kali, hancurkan saat komponen dilepas
  useEffect(() => {
    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: [],
        datasets: SERIES.map((item) => ({
          label: item.label,
          data: [],
          backgroundColor: item.color,
          borderRadius: 3,
          maxBarThickness: 18,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          tooltip: { filter: (item) => item.parsed.y > 0 },
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { ...TICK_STYLE, maxTicksLimit: 7, maxRotation: 0 },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            suggestedMax: 4,
            ticks: { ...TICK_STYLE, precision: 0 },
            grid: { color: "#f1f5f9" },
            border: { display: false },
          },
        },
      },
    });
    chartRef.current = chart;

    return () => {
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  // perbarui isi grafik setiap data berubah
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    chart.data.labels = series.map((day) => day.label);
    SERIES.forEach((item, index) => {
      chart.data.datasets[index].data = series.map((day) => day[item.key]);
    });
    chart.update();
  }, [series]);

  return (
    <Card className="p-5 lg:col-span-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h3 className="font-bold text-slate-900 text-sm">Perubahan per Hari</h3>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          {SERIES.map((item) => (
            <div key={item.key} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-sm ${item.legendClass}`} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-56">
        <canvas ref={canvasRef} role="img" aria-label={`Grafik jumlah perubahan per hari, ${rangeLabel}`} />
        {total === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 text-sm font-medium text-slate-400">
            Tidak ada aktivitas pada rentang ini
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 pt-5 mt-4 border-t border-slate-100">
        Total {total.toLocaleString("id-ID")} aktivitas pada {rangeLabel}
      </p>
    </Card>
  );
}