import axios from "axios";
import { apiUrl } from "../../../api/config.js";

const fetchScheduleByID = async (event_uuid) => {
    let response;

    response = await axios.get(
        apiUrl(`/event-schedules/by-event/${event_uuid}`)
    );
    return response.data;
};

export default fetchScheduleByID;
