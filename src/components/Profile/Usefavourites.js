import { useState, useCallback, useEffect } from "react";
import { fetchFavouriteIds, fetchEventById, toggleFavouriteApi } from "../../api/favourites";

export function useFavourites(user, active) {
    const [favouriteIds, setFavouriteIds] = useState([]);
    const [favouriteEvents, setFavouriteEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        setError(null);
        try {
            const token = await user.getIdToken();
            const ids = await fetchFavouriteIds(token);
            setFavouriteIds(ids);
            const events = await Promise.all(ids.map(id => fetchEventById(id)));
            setFavouriteEvents(events.filter(Boolean));
        } catch (err) {
            console.error(err);
            setError(err.message ?? "Could not load favourites.");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (active) load();
    }, [active, load]);

    const toggle = useCallback(async (eventUuid) => {
        if (!user) return;
        try {
            const token = await user.getIdToken();
            const result = await toggleFavouriteApi(token, eventUuid);
            if (result.is_favourite) {
                setFavouriteIds(prev => [...prev, result.event_id]);
                const ev = await fetchEventById(result.event_id);
                if (ev) setFavouriteEvents(prev => [...prev, ev]);
            } else {
                const idStr = String(result.event_id);
                setFavouriteIds(prev => prev.filter(id => String(id) !== idStr));
                setFavouriteEvents(prev =>
                    prev.filter(ev =>
                        String(ev.id) !== idStr && String(ev.event_uuid) !== idStr
                    )
                );
            }
        } catch (err) {
            console.error("[toggle]", err.message);
        }
    }, [user]);

    return { favouriteIds, favouriteEvents, loading, error, reload: load, toggle };
}