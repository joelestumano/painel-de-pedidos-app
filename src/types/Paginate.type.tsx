import { Pedido } from "./Pedido.type";

export type Paginate = {
    documentos: Pedido[];
    limite: number;
    pagina: number;
    paginaAnterior: number;
    proximaPagina: number;
    totalDocumentos: number;
    totalPaginas: number;
}