const BASE_URL = import.meta.env.VITE_API_URL_AUTH || "http://localhost:4000/api/auth";

async function handleResponse(res) {
    if(!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request Gagal (status $[res.status])`);
    }
    return res.json();
}

export const authApi = {
    login: async (username, password) => {
        const res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        return handleResponse(res);
    },
};