import { ApiService } from "../../../services/ApiService";

const baseURL: string = "auth/";

const forgottenPassword = async (payload: { email: string }): Promise<any> => {
    const { data } = await ApiService.create().post(`${baseURL}forgot-password`, payload);
    return data;
};

export const AccountService = {
    forgottenPassword
};