import axios from "axios";

const fetchEvents = async (event_type) => {
    let response;
    if (event_type === "home") {
        response = await axios.get(
            `https://backend-theta-seven-48.vercel.app/events/?skip=0&limit=10`
        );
    }
    else {
        response = await axios.get(
            `https://backend-theta-seven-48.vercel.app/events/by-type/${event_type}`
        );
    }
    return response.data;
};

export default fetchEvents;
