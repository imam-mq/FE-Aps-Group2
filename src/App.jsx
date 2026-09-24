import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useNotif } from "./hooks/useNotif";
import { LoginForm } from "./components/LoginForm";
import { LoginNotif } from "./components/LoginNotif";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { AplikasiPage } from "./pages/AplikasiPage";

function App() {
  const { isLoggedIn, user, login, logout } = useAuth();
  const { notifs, showNotif } = useNotif();
  const [showDashboard, setShowDashboard] = useState(isLoggedIn);

  const handleLogin = async (username, password) => {
    try {
      await login(username, password);
      showNotif("Login berhasil, selamat datang!", "success");
      setTimeout(() => setShowDashboard(true), 1000);
    } catch (err) {
      showNotif(err.message || "Login gagal", "error");
    }
  };

  const handleLogout = () => {
    logout();
    setShowDashboard(false);
  };

  return (
    <>
      <LoginNotif notifs={notifs} />
      {!isLoggedIn || !showDashboard ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <DashboardLayout user={user} onLogout={handleLogout}>
          <AplikasiPage />
        </DashboardLayout>
      )}
    </>
  );
}

export default App;