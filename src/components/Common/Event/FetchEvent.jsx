import axios from "axios";

const fetchEvents = async (event_type) => {
    let response;
    if (event_type === "home") {
        response = await axios.get(
            `http://127.0.0.1:8000/events/?skip=0&limit=10`
        );
    }
    else {
        response = await axios.get(
            `http://127.0.0.1:8000/events/by-type/${event_type}`
        );
    }
    return response.data;
};

export default fetchEvents;
