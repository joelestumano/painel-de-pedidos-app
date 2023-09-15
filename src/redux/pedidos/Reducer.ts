import { PedidoType } from "../../app/modules/pedidos/types/pedido.type";
import { ACTION_TYPE } from "./ActionType.enum";

const initialState: { pedidos: PedidoType[], pedidosAtrasados: number } = {
    pedidos: [],
    pedidosAtrasados: 0
}

const PedidosReducer = (state = initialState, action: { type: string, payload: PedidoType[] }) => {
    switch (action.type) {
        case ACTION_TYPE.LISTAR_PEDIDOS:
            return { ...state, pedidos: action.payload };

        case ACTION_TYPE.INCREMENTAR_PEDIDOS_ATRASADOS:
            return { ...state, pedidosAtrasados: state.pedidosAtrasados + 1 };

        default:
            return state;
    }

}

export default PedidosReducer;