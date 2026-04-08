import { apiUrl } from "../../api/config.js";

const fetchHero = async (heroType) => {
    let response = await fetch(
        apiUrl(`/heroes/by-type/${heroType}`),
        {
            headers: { Accept: "application/json" },
            credentials: "include",
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.map((item) => ({
        id: item.id,
        eventId: item.event_id,
        title: item.title,
        video: item.video_url,
        thumbnail: item.thumbnail_image_url,
        logo: item.thumbnail_image_url,
        description: item.description,
        details: item.details,
        genres: item.genres,
    }));
};

export default fetchHero;
