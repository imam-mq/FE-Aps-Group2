import { Sidebar } from "../components/Sidebar";

export function DashboardLayout({ user, onLogout, children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="flex-1 min-w-0 p-6 md:p-8">{children}</main>
    </div>
  );
}