const fetchHero = async (heroType) => {
    let response = await fetch(
        `https://backend-theta-seven-48.vercel.app/heroes/by-type/${heroType}`,
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
