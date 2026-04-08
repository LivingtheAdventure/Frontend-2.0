import axios from "axios";

import { API_BASE_URL } from "./config.js";

export const fetchFavourites = async (token) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/favourites/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data?.favourites || [];
  } catch (err) {
    if (err.response?.status === 404) {
      return [];
    }

    console.error("Failed to fetch favourites", err);
    return [];
  }
};

export const toggleFavourite = async (eventId, token) => {
  const res = await axios.post(
    `${API_BASE_URL}/favourites/toggle/`,
    { event_id: eventId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data?.is_favourite;
};

