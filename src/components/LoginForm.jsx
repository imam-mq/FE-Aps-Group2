import { useState } from "react";

export function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await onLogin(username, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-xl shadow">
            <h1 className="text-lg font-bold mb-4"> Login APs Group 2</h1>
            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
            <input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="input mb-3"
                required
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input mb-4"
                required
            />
            <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-60">
                {loading ? "Masuk..." : "Masuk"}
            </button>
        </form>
    );

}