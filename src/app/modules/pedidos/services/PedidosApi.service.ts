import { Paginate } from "../../../shared/types/Paginate.type";
import { ApiService } from "../../../services/Api.service";

const limit: number = 1000;
const status: string = "pendente";
const baseURL: string = "v1/pedidos/"

const start: Date = new Date();
const end: Date = new Date();
const timeDifferenceServer = 0;

start.setHours(start.getHours() + timeDifferenceServer);
end.setHours(end.getHours() + timeDifferenceServer);
end.setDate(end.getDate() + 1);

const dateStart: string = start.toISOString().replace('T', ' ').replace('Z', '');
const dateEnd: string = end.toISOString().replace('T', ' ').replace('Z', '');

const getPaginate = async (): Promise<Paginate> => {
    const { data } = await ApiService().get(`${baseURL}paginate?ativarPaginacao=true&pagina=1&limite=${limit}&status=${status}&dateEnd=${dateEnd}&dateStart=${(dateStart)}`);
    return data;
};

export const PedidosApiService = {
    getPaginate
}