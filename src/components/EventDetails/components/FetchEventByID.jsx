import axios from "axios";

const fetchEventsByID = async (event_id) => {
    let response;

    response = await axios.get(
        `http://127.0.0.1:8000/events/${event_id}`
    );
    return response.data;
};

export default fetchEventsByID;
