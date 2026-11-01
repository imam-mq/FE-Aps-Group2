export function Card({ className = "", children, ...props }) {
    return (
        <div className={`bg-white border border-slate-200/90 rounded-xl shadow-sm ${className}`} {...props}>
            {children}
        </div>
    );
}