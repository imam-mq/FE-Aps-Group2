import { useState, useCallback, useRef } from "react";

let idCounter = 0;

export function useNotif() {
    const [notifs, setNotifs] = useState([]);
    const timers = useRef({});

    const showNotif = useCallback((message, type = "success") => {
        const id = ++idCounter;

        setNotifs((prev) => [...prev, { id, message, type, show: false }]);
        requestAnimationFrame(() => {
            setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, show: true } : n)));
        });

        timers.current[id] = setTimeout(() => {
            setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, show: false } : n)));
            setTimeout(() => {
                setNotifs((prev) => prev.filter((n) => n.id !== id));
            }, 300);
        }, 300);
    }, []);

    return { notifs, showNotif };
}