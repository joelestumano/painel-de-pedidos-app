import { ApiService } from "../../../services/ApiService";
import { LocalStorageService } from "../../../services/LocalStorageServide";

export type AccessTokenType = {
    access_token: string;
};

export type LoginType = {
    email: string;
    password: string;
};

const baseURL: string = "/v1/auth/";

const login = async (login: LoginType): Promise<AccessTokenType> => {
    const { data } = await ApiService.create().post(`${baseURL}login`, login);
    setToken(data);
    return data;
};

const setToken = (dataToken: AccessTokenType) => {
    LocalStorageService.setStorage("access_token", dataToken.access_token);
};

const getToken = (): string => {
    return LocalStorageService.getStorage("access_token");
};

const logout = () => {
    LocalStorageService.deleteStorage("access_token");
    window.location.href = "/login";
};

export const LoginService = {
    login,
    setToken,
    getToken,
    logout
};
