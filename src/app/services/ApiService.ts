import axios, { AxiosInstance } from "axios";

const baseURL = (): string => {
  return "http://localhost:3000/";
  //return "https://sg-api-b7fl.onrender.com/";
};

const create = (): AxiosInstance => {
  return axios.create({
    baseURL: baseURL(),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${''}`
    },
  });
};

export const ApiService = {
  baseURL,
  create,
};
