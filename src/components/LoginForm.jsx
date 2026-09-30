import { useState } from "react";
import loginIllustration from "../assets/login-illustration.gif";

export function LoginForm({ onLogin, onSwitchToRegister, onSwitchToForgotPassword }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onLogin(username, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Panel kiri - branding */}
      <section className="relative hidden lg:flex lg:w-1/2 bg-slate-950 text-white flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-900 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />

        <header className="relative z-10 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white block">APS Group 2</span>
            <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">Penyimpanan Data Aplikasi</span>
          </div>
        </header>

        <div className="relative z-10 my-auto py-10 flex flex-col items-center text-center">
          <img
            src={loginIllustration}
            alt="Ilustrasi login"
            className="w-full max-w-md drop-shadow-2xl mb-10"
          />
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight max-w-md">
            Kelola Data Aplikasi.
          </h1>
          {/* <p className="text-slate-300 text-base leading-relaxed max-w-md">
            Setiap akun yang masuk sudah terverifikasi lewat login, jadi data aplikasi tim kamu tetap tersimpan rapi dan tidak sembarang orang bisa mengubahnya.
          </p> */}
        </div>
      </section>

      {/* Panel kanan - form login */}
      <section className="flex-1 flex items-center justify-center bg-white p-6 sm:p-10 lg:p-16">
        <div className="max-w-md w-full mx-auto">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
            Selamat Datang Kembali 👋
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Masuk</h1>
          <p className="text-base text-slate-500 mb-10">
            APS Group — Penyimpanan Data Aplikasi
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="block w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="block w-full rounded-xl border border-slate-200 pl-11 pr-11 py-3.5 text-sm text-slate-900 placeholder-slate-400 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600"
                  aria-label="Tampilkan atau sembunyikan password"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onSwitchToForgotPassword}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Lupa password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Belum punya akun ?{" "}
            <button type="button" onClick={onSwitchToRegister} className="font-semibold text-indigo-600 hover:text-indigo-700">Daftar Di Sini</button>
          </p>
        </div>
      </section>
    </div>
  );
}