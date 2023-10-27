import { ApiService } from "../../../../services/ApiService";
import { writeStorage, deleteFromStorage } from "@rehooks/local-storage";

export type AccessTokenType = {
    access_token: string;
};

export type LoginType = {
    email: string;
    password: string;
};

const baseURL: string = "auth/";

const login = async (login: LoginType): Promise<AccessTokenType> => {
    const { data } = await ApiService.create().post(`${baseURL}login`, login);
    return data;
};

const setToken = (dataToken: AccessTokenType) => {
    writeStorage("access_token", dataToken.access_token);
};

const getToken = (): string | null => {
    return localStorage.getItem("access_token");
};

const logout = () => {
    deleteFromStorage("access_token");
};

export const LoginService = {
    login,
    setToken,
    getToken,
    logout
};
