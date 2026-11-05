import { useState } from "react";
import { AuthHero } from "./auth/AuthHero";
import { forgotPasswordSchema } from "../validators/auth.schema";
import { firstZodMessage } from "../utils/zodError";

export function ForgotPasswordForm({ onForgotPassword, onSwitchToLogin }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsed = forgotPasswordSchema.safeParse({ email });
        if (!parsed.success) {
            setError(firstZodMessage(parsed.error));
            return;
        }

        setError("");
        setLoading(true);
        try {
            await onForgotPassword(parsed.data.email);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
            <AuthHero
                title="Lupa Password?"
                description="Tenang, kami bantu kamu masuk kembali ke akunmu."
            />

            <section className="flex-1 flex items-center justify-center bg-white p-6 sm:p-10 lg:p-16">
                <div className="max-w-md w-full mx-auto">
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
                    Reset Password 🔑
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Lupa Password</h1>
                <p className="text-base text-slate-500 mb-10">
                    Masukkan email yang kamu pakai saat registrasi, nanti kami kirim link buat reset password.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
                    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
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