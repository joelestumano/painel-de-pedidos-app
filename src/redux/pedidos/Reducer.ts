import { PedidoType } from "../../app/modules/pedidos/types/Pedido.type";

export enum ACTION_TYPE {
    LISTAR_PEDIDOS = 'LISTAR_PEDIDOS'
}

const initialState: { pedidos: PedidoType[], pedidosAtrasados: number } = {
    pedidos: [],
    pedidosAtrasados: 0
}

const PedidosReducer = (state = initialState, action: { type: string, payload: PedidoType[] }) => {
    if (action.type === ACTION_TYPE.LISTAR_PEDIDOS) {
        return { ...state, pedidos: action.payload };
    }
    return state;
}

export default PedidosReducer;