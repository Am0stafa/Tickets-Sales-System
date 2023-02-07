import axios from "axios";
const baseUrl = "https://reservation-two.vercel.app/api/reservation/";


export const addTicketToCart = async (ticket) => {
    const response = await axios.post(baseUrl + "pending", ticket);
    return response.data;
}

export const purchased = async (ticket) => {
    const response = await axios.post(baseUrl + "purchase", ticket);
    return response.data;
}

export const cancel = async (ticket) => {
    const response = await axios.post(baseUrl + "cancel", ticket);
    return response.data;
}
