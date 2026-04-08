import axios from "axios";
import { apiUrl } from "../../../api/config.js";

const fetchEventsByID = async (event_id) => {
    let response;

    response = await axios.get(
        apiUrl(`/events/${event_id}`)
    );
    return response.data;
};

export default fetchEventsByID;
