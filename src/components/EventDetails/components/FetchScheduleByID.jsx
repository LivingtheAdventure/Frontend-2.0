import axios from "axios";

const fetchScheduleByID = async (event_uuid) => {
    let response;

    response = await axios.get(
        `http://127.0.0.1:8000/event-schedules/by-event/${event_uuid}`
    );
    return response.data;
};

export default fetchScheduleByID;
