import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useNotif } from "./hooks/useNotif";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { ResetPasswordForm } from "./components/ResetPasswordForm";
import { LoginNotif } from "./components/LoginNotif";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { AplikasiPage } from "./pages/AplikasiPage";

function getTokenFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
}

function App() {
  const { isLoggedIn, user, login, register, forgotPassword, resetPassword, logout } = useAuth();
  const { notifs, showNotif } = useNotif();
  const [showDashboard, setShowDashboard] = useState(isLoggedIn);
  const [resetToken] = useState(() => getTokenFromUrl());
  const [authView, setAuthView] = useState(resetToken ? "reset" : "login");

  const handleLogin = async (username, password) => {
    try {
      await login(username, password);
      showNotif("Login berhasil, selamat datang!", "success");
      setTimeout(() => setShowDashboard(true), 1000);
    } catch (err) {
      showNotif(err.message || "Login gagal", "error");
    }
  };

  const handleRegister = async (data) => {
    try {
      await register(data);
      showNotif("Registrasi berhasil, silahkan login", "success");
      setAuthView("login");
    } catch (err) {
      showNotif(err.message || "Registrasi Gagal", "error");
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      const result = await forgotPassword(email);
      showNotif(result.message, "success");
      setAuthView("login");
    } catch (err) {
      showNotif(err.message || "Gagal Kirim Link Reset Password", "error")
    }
  };

  const handleResetPassword = async (password) => {
    try {
      const result = await resetPassword(resetToken, password);
      showNotif(result.message, "success");
      window.history.replaceState({}, "", "/");
      setAuthView("login");
    } catch (err) {
      showNotif(err.message || "Gagal reset password", "error");
    }
  };

  const handleLogout = () => {
    logout();
    setShowDashboard(false);
  };

  const renderAuthView = () => {
    switch (authView) {
      case "register":
        return <RegisterForm onRegister={handleRegister} onSwitchToLogin={() => setAuthView("login")} />;
      case "forgot":
        return <ForgotPasswordForm onForgotPassword={handleForgotPassword} onSwitchToLogin={() => setAuthView("login")} />;
      case "reset":
        return <ResetPasswordForm onResetPassword={handleResetPassword} onSwitchToLogin={() => setAuthView("login")} />;
      default:
        return (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthView("register")}
            onSwitchToForgotPassword={() => setAuthView("forgot")}
          />
        );
    }
  };

  return (
    <>
      <LoginNotif notifs={notifs} />
      {!isLoggedIn || !showDashboard ? (
        renderAuthView()
      ) : (
        <DashboardLayout user={user} onLogout={handleLogout}>
          <AplikasiPage />
        </DashboardLayout>
      )}
    </>
  );
}

export default App;