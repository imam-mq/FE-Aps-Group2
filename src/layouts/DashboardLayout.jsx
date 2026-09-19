import { Sidebar } from "../components/Sidebar";

export function DashboardLayout({ user, onLogout, children }) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="flex-1 min-w-0 p-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}