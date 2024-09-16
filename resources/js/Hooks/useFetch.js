import axios from "axios";

export default async function useFetch(endpoint) {
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
    try {
        let response = await axios.get(BASE_URL + endpoint);
        return response.data;
    } catch (error) {
        return error.data.message;
    }
}
