import { ApiService } from "../../../services/ApiService";

export type AccessTokenType = {
    access_token: string;
};

export type LoginType = {
    email: string;
    password: string;
};

const baseURL: string = "/v1/auth/";
let dataToken: AccessTokenType = { access_token: "" };

const login = async (login: LoginType): Promise<AccessTokenType> => {
    const { data } = await ApiService.create().post(`${baseURL}login`, login);
    setToken(data);
    return data;
};

const setToken = (dataToken_: AccessTokenType) => {
    dataToken = {
        ...dataToken,
        access_token: dataToken_?.access_token,
    };
};

const getToken = (): string => {
    return dataToken?.access_token;
};

export const LoginService = {
    login,
    setToken,
    getToken,
};
