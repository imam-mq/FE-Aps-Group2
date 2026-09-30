import { useState } from "react";
import loginIllustration from "../assets/login-illustration.gif";

export function ForgotPasswordForm({ onForgotPassword, onSwitchToLogin }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onForgotPassword(email);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
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
                    alt="Ilustrasi lupa password"
                    className="w-full max-w-md drop-shadow-2xl mb-10"
                />
                <h1 className="text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight max-w-md">
                    Lupa Password?
                </h1>
                </div>
            </section>

            <section className="flex-1 flex items-center justify-center bg-white p-6 sm:p-10 lg:p-16">
                <div className="max-w-md w-full mx-auto">
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
                    Reset Password 🔑
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Lupa Password</h1>
                <p className="text-base text-slate-500 mb-10">
                    Masukkan email yang kamu pakai saat registrasi, nanti kami kirim link buat reset password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email"
                        className="block w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition duration-200"
                        required
                    />
                    </div>

                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                    {loading ? "Mengirim..." : "Kirim Link Reset"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Sudah ingat password?{" "}
                    <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                    Login di sini
                    </button>
                </p>
                </div>
            </section>
        </div>
    );
}