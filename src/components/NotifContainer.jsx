export function NotifContainer({ notifs }) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 flex flex-col gap-2.5 z-50">
      {notifs.map((n) => (
        <div
          key={n.id}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-lg text-sm font-medium text-white shadow-lg min-w-[260px]
            transition-all duration-300 ${n.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            ${n.type === "success" ? "bg-green-700" : "bg-red-600"}`}
        >
          <span className="font-bold">{n.type === "success" ? "✓" : "✕"}</span>
          <span>{n.message}</span>
        </div>
      ))}
    </div>
  );
}