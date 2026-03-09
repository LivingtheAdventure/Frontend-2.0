import { FaCompass } from "react-icons/fa";
import HorizontalEventCard from "../Common/EventCard/HorizontalCard"; // ← update path if needed
import { SkeletonCard, EmptyFavourites, FavErrorBanner } from "./FavouritesUI";

export function FavouritesTab({ favouriteIds, favouriteEvents, loading, error, onReload, onToggle }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-lg font-semibold text-white">Your Saved Adventures</h2>
                    {!loading && (
                        <p className="text-xs text-slate-500 mt-0.5">
                            {favouriteEvents.length > 0
                                ? `${favouriteEvents.length} adventure${favouriteEvents.length !== 1 ? "s" : ""} saved`
                                : "Nothing saved yet"}
                        </p>
                    )}
                </div>
                {favouriteEvents.length > 0 && (
                    <button
                        onClick={onReload}
                        className="text-xs text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1"
                    >
                        <FaCompass className="text-xs" /> Refresh
                    </button>
                )}
            </div>

            {error && <FavErrorBanner message={error} onRetry={onReload} />}

            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
                </div>
            )}

            {!loading && favouriteEvents.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {favouriteEvents.map(event => (
                        <HorizontalEventCard
                            key={event.event_uuid ?? event.id}
                            item={event}
                            isFavourite={favouriteIds.map(String).includes(String(event.id))}
                            onToggleFavourite={onToggle}
                        />
                    ))}
                </div>
            )}

            {!loading && !error && favouriteEvents.length === 0 && <EmptyFavourites />}
        </div>
    );
}