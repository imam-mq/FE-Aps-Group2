import { useAuth } from "./hooks/useAuth";
import { LoginForm } from "./components/LoginForm";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { AplikasiPage } from "./pages/AplikasiPage";

function App() {
  const { isLoggedIn, user, login, logout } = useAuth();

  if (!isLoggedIn) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <DashboardLayout user={user} onLogout={logout}>
      <AplikasiPage />
    </DashboardLayout>
  );
}

export default App;