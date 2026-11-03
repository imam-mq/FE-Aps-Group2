import { Card } from "../../ui";

export function LoadState({ error, onRetry }) {
    return (
        <Card className="p-8 flex flex-col items-center justify-center gap-3 text-center">
            {error ? (
                <>
                    <p className="text-sm font-medium text-rose-600">{error}</p>
                        <button
                            type="button"
                            onClick={onRetry}
                            className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Coba lagi
                        </button>
                </>
                ) : (
                  <p className="text-sm text-slate-400" role="status">Memuat data...</p>
            )}

        </Card>
    );
}