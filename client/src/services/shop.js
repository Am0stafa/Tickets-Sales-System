import axios from "axios";
const baseUrl = "https://shop-delta-khaki.vercel.app/api/shop/"

export const getAllMatches= async () => {
    const response = await axios.get(baseUrl + "matches");
    return response.data;   
}

export const getAvailability = async (matchId) => {
    const response = await axios.get(baseUrl + "availability/" + matchId);
    return response.data;
}

export const getAllAvailability = async () => {
    const response = await axios.get(baseUrl + "allAvailability");
    return response.data;
}

export const getHold = async () => {
    const response = await axios.get(baseUrl + "hold");
    return response.data;
}
// get hold  by id
export const getHoldById = async (id) => {
    const response = await axios.get(baseUrl + "hold/" + id);
    return response.data;
}

export const getCatagories = async (matchId) => {
    const response = await axios.get(baseUrl + "catagories/" + matchId);
    return response.data;
}

