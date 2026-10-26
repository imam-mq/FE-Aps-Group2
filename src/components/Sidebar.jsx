const ICONS = {
  aplikasi: [
    "M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zm0 4h16M8 4v4",
  ],
  logout: [
    "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75",
  ],
};

function Icon({ name, className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {ICONS[name].map((d) => (
        <path key={d} d={d} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

export function Sidebar({ user, onLogout }) {
  const displayName = user?.name || user?.username || "Pengguna";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <aside className="w-full md:w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between md:sticky md:top-0 md:h-screen">
      <div>
        <div className="h-20 px-6 flex items-center gap-3.5 border-b border-slate-100">
          <div className="h-10 w-10 rounded-xl bg-linear-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-brand-500/20">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 tracking-tight leading-tight">
              APS Group 2
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-brand-600 uppercase mt-0.5">
              Data Aplikasi
            </span>
          </div>
        </div>

        <nav aria-label="Menu utama" className="p-4 space-y-1.5">
          <span
            aria-current="page"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold bg-brand-50 text-brand-700 cursor-default"
          >
            <Icon name="aplikasi" className="w-5 h-5 text-brand-600" />
            Data Aplikasi
          </span>
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-semibold text-slate-700 text-sm shrink-0">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-800 truncate leading-tight">
                {displayName}
              </p>
              {user?.name && user?.username && (
                <p className="text-[11px] font-medium text-slate-500 truncate">
                  {user.username}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            title="Keluar"
            aria-label="Keluar"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Icon name="logout" />
          </button>
        </div>
      </div>
    </aside>
  );
}