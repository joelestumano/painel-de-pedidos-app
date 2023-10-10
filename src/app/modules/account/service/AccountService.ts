import { ApiService } from "../../../services/ApiService";

const baseURL: string = "auth/";

export type ResetPassType = {
    email: string;
    password: string;
    confirmPassword: string;
    token: string;
};

const forgottenPassword = async (payload: { email: string }): Promise<any> => {
    const { data } = await ApiService.create().post(`${baseURL}forgot-password`, payload);
    return data;
};

const resetPassword = async (payload: ResetPassType): Promise<any> => {
    const { data } = await ApiService.create().post(`${baseURL}reset-password`, payload);
    return data;
};

export const AccountService = {
    forgottenPassword,
    resetPassword
};