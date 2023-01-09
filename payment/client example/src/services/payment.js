import axios from "axios";
const baseUrl = 'https://payment-eosin.vercel.app/api/'


export const createPaymentIntent = async (ticket) => {
    const response = await axios.post(baseUrl + "pay", ticket);
    return response.data;
}
