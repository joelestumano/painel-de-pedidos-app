import { ApiService } from "../../../services/ApiService";

const baseURL: string = "/v1/auth/";

const forgottenPassword = async (payload: { email: string }): Promise<any> => {
    const { data } = await ApiService.create().post(`${baseURL}forgotten-password`, payload);
    return data;
};

export const AccountService = {
    forgottenPassword
};