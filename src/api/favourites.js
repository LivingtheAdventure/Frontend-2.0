import axios from "axios";

const API_BASE = "http://localhost:8000";

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

// ── Keep original function names exactly as they were ─────────────────────────

export const fetchFavourites = async (token) => {
  try {
    const res = await axios.get(`${API_BASE}/favourites/`, {
      headers: authHeaders(token),
    });
    return res.data?.favourites || [];
  } catch (err) {
    if (err.response?.status === 404) return [];
    console.error("Failed to fetch favourites", err);
    return [];
  }
};

export const toggleFavourite = async (eventId, token) => {
  const res = await axios.post(
    `${API_BASE}/favourites/toggle`,
    null,
    {
      params: { event_id: eventId },
      headers: authHeaders(token),
    }
  );
  return res.data?.is_favourite;
};

// Fixed: was using raw fetch + missing safeJson — now uses axios + maps fields
export async function fetchEventById(id) {
  if (!id) return null;
  try {
    const res = await axios.get(`${API_BASE}/events/by-uuid/${id}`);
    const item = res.data;
    if (!item) return null;

    return {
      id: item.id,
      event_uuid: item.event_uuid ?? item.event_id ?? id,
      event_type: item.event_type ?? "",
      name: item.title ?? item.name ?? "",
      imageUrl: item.cover_image_url ?? item.imageUrl ?? "",
      description: item.short_description ?? item.description ?? "",
      videoUrl: item.promo_video_url ?? item.videoUrl ?? "",
      label: item.label ?? "",
    };
  } catch (err) {
    console.warn(`[fetchEventById(${id})]`, err.message);
    return null;
  }
}

// Fixed: was calling undefined authHeaders — now defined above
export async function fetchFavouriteIds(token) {
  try {
    const res = await axios.get(`${API_BASE}/favourites/`, {
      headers: authHeaders(token),
    });
    return res.data?.favourites ?? [];
  } catch (err) {
    console.error("[fetchFavouriteIds]", err.message);
    return [];
  }
}

export async function toggleFavouriteApi(token, eventId) {
  const res = await axios.post(
    `${API_BASE}/favourites/toggle`,
    null,
    {
      params: { event_id: eventId },
      headers: authHeaders(token),
    }
  );
  return res.data; // { event_id, is_favourite }
}