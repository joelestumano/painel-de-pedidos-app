import { ApiService } from "../../../services/ApiService";

type AccessTokenType = {
    access_token: string;
};

export type LoginType = {
    email: string;
    password: string;
};

const baseURL: string = "/v1/auth/";

const login = async (login: LoginType): Promise<AccessTokenType> => {
    const { data } = await ApiService.create().post(`${baseURL}login`, login);
    return data;
};

export const LoginService = {
    login,
};
