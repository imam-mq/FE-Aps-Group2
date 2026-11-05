import { useState } from "react";
import { AuthHero } from "./auth/AuthHero";
import { resetPasswordSchema } from "../validators/auth.schema";
import { firstZodMessage } from "../utils/zodError";

export function ResetPasswordForm({ onResetPassword, onSwitchToLogin }) {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();

    const parsed = resetPasswordSchema.safeParse({ password });
        if (!parsed.success) {
            setError(firstZodMessage(parsed.error));
            return;
        }

        setError("");
        setLoading(true);
        try {
            await onResetPassword(parsed.data.password);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
        <AuthHero
            title="Buat Password Baru."
            description="Atur password baru agar akunmu tetap aman."
        />

        <section className="flex-1 flex items-center justify-center bg-white p-6 sm:p-10 lg:p-16">
            <div className="max-w-md w-full mx-auto">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
                Reset Password 🔑
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Password Baru</h1>
            <p className="text-base text-slate-500 mb-10">
                Masukkan password baru untuk akun kamu.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password Baru</label>
                <div className="relative rounded-xl shadow-sm">
                    <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 8 karakter, kombinasi huruf & angka"
                    className="block w-full rounded-xl border border-slate-200 pl-4 pr-11 py-3.5 text-sm text-slate-900 placeholder-slate-400 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition duration-200"
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
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                {loading ? "Memproses..." : "Simpan Password Baru"}
                </button>
            </form>
            
            <p className="mt-6 text-center text-sm text-slate-500">
                Batal reset?{" "}
                <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-semibold text-indigo-600 hover:text-indigo-700"
                >
                Kembali ke login
                </button>
            </p>
        </div>
        </section>
        </div>
    );
}