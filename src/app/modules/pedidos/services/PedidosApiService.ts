
import { ApiService } from "../../../services/ApiService";
import { PaginateType } from "../../../shared/types/PaginateType";

const limit: number = 1000;
const status: string = "pendente";
const baseURL: string = "v1/pedidos/"

const start: Date = new Date();
const end: Date = new Date();

start.setHours(start.getHours() - 3);

const dateStart: string = start.toISOString();
end.setDate(start.getDate() + 1)
const dateEnd: string = end.toISOString().slice(0, 10);

const getPaginate = async (): Promise<PaginateType> => {
    const { data } = await ApiService().get(`${baseURL}paginate?ativarPaginacao=true&pagina=1&limite=${limit}&status=${status}&dateEnd=${dateEnd}&dateStart=${(dateStart)}`);
    return data;
};

export const PedidosApiService = {
    getPaginate
}