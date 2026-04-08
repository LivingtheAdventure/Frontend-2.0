import axios from "axios";
import { apiUrl } from "../../api/config.js";

const fetchEventsByType = async (event_type, state = "") => {
    const response = await axios.get(
        apiUrl(`/events/by-type/${event_type}`)
    );

    let events = response.data;

    // ✅ filter only if state is not empty
    if (state && state.trim() !== "") {
        events = events.filter(
            event => event.state?.toLowerCase() === state.toLowerCase()
        );
    }

    return events.map(event => ({
        id: event.id,
        title: event.title,
        imageUrl: event.cover_image_url,
        description: event.short_description,
        category: event.adventure_activity_category,
        difficulty: event.adventure_difficulty_level,
        durationDays: event.duration_days,
        durationNights: event.duration_nights,
        location: event.location,
        raw: event // optional: keep original
    }));
};

export default fetchEventsByType;
