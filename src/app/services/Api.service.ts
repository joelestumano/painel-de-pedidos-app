import axios from "axios"

//const baseURL = 'http://localhost:3000/'
const baseURL = "https://sg-api-b7fl.onrender.com/";

export const Api = () => {
    return axios.create({
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json"
        },
    })
}