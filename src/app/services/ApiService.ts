import axios, { AxiosInstance } from "axios";
import { LoginService } from "../modules/login/services/LoginService";
import { LocalStorageService } from "./LocalStorageServide";

const baseURL = (): string => {
  return "http://localhost:3000/";
  //return "https://sg-api-b7fl.onrender.com/";
};

const create = (): AxiosInstance => {
  const axios_ = axios.create({
    baseURL: baseURL(),
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
    },
  });

  // Adiciona um interceptador na requisição
  axios_.interceptors.request.use(
    (config: any) => {
      // Faz alguma coisa antes da requisição ser enviada
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${LoginService.getToken()}`,
      };
      return config;
    },
    (error) => {
      // Faz alguma coisa com o erro da requisição
      return Promise.reject(error);
    }
  );
  // Adiciona um interceptador na resposta
  axios_.interceptors.response.use(
    (response) => {
      // Qualquer código de status que dentro do limite de 2xx faz com que está função seja acionada
      // Faz alguma coisa com os dados de resposta
      return response;
    },
    (error) => {
      // Qualquer código de status que não esteja no limite do código 2xx faz com que está função seja acionada
      // Faz alguma coisa com o erro da resposta
      if (error?.response?.status === 401) {
        LoginService.logout();
      }
      return Promise.reject(error);
    }
  );

  return axios_;
};

export const ApiService = {
  baseURL,
  create,
};
