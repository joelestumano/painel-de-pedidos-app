import { ApiService } from "../../../services/ApiService";
import { PaginateType } from "../../../shared/types/PaginateType";

const limit: number = 1000;
const status: string = "pendente";
const baseURL: string = "pedidos/";

let dateStart = new Date();
let dateEnd = new Date();

dateStart.setHours(-3, 0, 0, 0);
dateEnd.setHours(24, 0, 0, 0);

dateStart.setHours(dateStart.getHours() - 3);
//dateEnd.setHours(dateEnd.getHours()+3);

const getPaginate = async (): Promise<PaginateType> => {
  const { data } = await ApiService.create().get(
    `${baseURL}paginate?ativarPaginacao=true&pagina=1&limite=${limit}&status=${status}&dateEnd=${dateEnd.toISOString()}&dateStart=${dateStart.toISOString()}`
  );
  return data;
};

export const PedidosApiService = {
  getPaginate,
};
