export function Sidebar({ user, onLogout }) {
  const initial = (user?.name || user?.username || "A").charAt(0).toUpperCase();

  return (
    <aside className="w-64 shrink-0 bg-slate-950 text-white flex flex-col justify-between p-6">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-white block">APS Group 2</span>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Data Aplikasi</span>
          </div>
        </div>

        <nav className="space-y-1">
          <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-indigo-600/15 text-indigo-300 text-sm font-medium border border-indigo-500/20 cursor-default">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16" />
            </svg>
            Data Aplikasi
          </span>
        </nav>
      </div>

      <div className="border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 px-1 mb-3">
          <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-sm font-semibold text-slate-300">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name || "Admin"}</p>
            <p className="text-xs text-slate-400 truncate">{user?.username}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}