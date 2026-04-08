import axios from "axios";
import { apiUrl } from "../../../api/config.js";

const fetchEvents = async (event_type) => {
    let response;
    if (event_type === "home") {
        response = await axios.get(
            apiUrl(`/events/?skip=0&limit=10`)
        );
    }
    else {
        response = await axios.get(
            apiUrl(`/events/by-type/${event_type}`)
        );
    }
    return response.data;
};

export default fetchEvents;
