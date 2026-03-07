import axios from "axios";

const fetchEvents = async (item) => {
    const response = await axios.get(
        `http://localhost:8000/events/${item.id}`
    );
    return response.data;
};

export default fetchEvents;
