import { Paginate } from "../../../shared/types/Paginate.type";
import { Api } from "../../../services/Api.service";

const limit: number = 1000;
const status: string = "pendente";
const baseURL: string = "v1/pedidos/"

const getPaginate = async (): Promise<Paginate> => {
    const { data } = await Api().get(`${baseURL}paginate?ativarPaginacao=true&pagina=1&limite=${limit}&status=${status}`);
    return data;
};

export const PedidosService = {
    getPaginate
}