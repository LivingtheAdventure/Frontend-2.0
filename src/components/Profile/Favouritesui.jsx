import { FaHeart } from "react-icons/fa";

export function SkeletonCard() {
    return (
        <div
            className="w-full rounded-xl overflow-hidden animate-pulse"
            style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
            <div className="aspect-[5/3] w-full bg-slate-700/50" />
            <div className="p-3 space-y-2">
                <div className="h-3 bg-slate-700/60 rounded w-3/4" />
                <div className="h-2 bg-slate-700/40 rounded w-full" />
                <div className="h-2 bg-slate-700/40 rounded w-2/3" />
            </div>
        </div>
    );
}

export function EmptyFavourites() {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.18)" }}
            >
                <FaHeart className="text-3xl text-emerald-400/60" />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white mb-1">No saved adventures yet</h3>
                <p className="text-sm text-slate-500 max-w-xs">
                    Tap the <span className="text-emerald-400 font-medium">+ button</span> on any trek card to save it here.
                </p>
            </div>
            <a
                href="/"
                className="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold inline-block"
                style={{ background: "linear-gradient(135deg, #059669, #047857)", color: "white" }}
            >
                Explore Adventures
            </a>
        </div>
    );
}

export function FavErrorBanner({ message, onRetry }) {
    return (
        <div
            className="mb-4 px-4 py-3 rounded-xl text-sm flex items-center gap-3"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}
        >
            <span>{message}</span>
            <button onClick={onRetry} className="underline hover:no-underline ml-auto">Retry</button>
        </div>
    );
}