import { Badge, Card } from "../../ui";
import { formatDateTimeWib } from "../../utils/date";

const ACTION_TONE = { CREATE: "green", UPDATE: "amber", DELETE: "red" };
const ACTION_VERB = { CREATE: "menambah", UPDATE: "mengubah", DELETE: "menghapus" };

export function RecentActivity({ activities }) {
  return (
    <Card className="p-5 lg:col-span-4">
      <h3 className="font-bold text-slate-900 text-sm mb-4">Aktivitas Terbaru</h3>

      {activities.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-400">Belum ada aktivitas pada rentang ini</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {activities.map((activity) => {
            const [firstField, ...otherFields] = activity.changedFields;
            return (
              <li key={activity.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-start gap-2 min-w-0">
                  <Badge tone={ACTION_TONE[activity.action] || "slate"}>{activity.action}</Badge>
                  <p className="text-xs text-slate-700 leading-snug min-w-0">
                    {activity.user} {ACTION_VERB[activity.action]}{" "}
                    <strong className="font-semibold text-slate-900 break-words">{activity.aplikasi}</strong>
                  </p>
                </div>

                {firstField && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded truncate max-w-[130px]" title={firstField}>
                      {firstField}
                    </span>
                    {otherFields.length > 0 && (
                      <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-500 rounded">
                        +{otherFields.length} lainnya
                      </span>
                    )}
                  </div>
                )}

                <p className="mt-1.5 text-[11px] text-slate-500">{formatDateTimeWib(activity.actionAt)}</p>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}