
import { PedidoType } from "../../app/shared/types/PedidoType";
import { PedidosActionTypeEnum } from "./PedidosActionTypeEnum";

const initialState: { pedidos: PedidoType[], pedidosAtrasados: number } = {
    pedidos: [],
    pedidosAtrasados: 0
}

const PedidosReducer = (state = initialState, action: { type: string, payload: PedidoType[] }) => {
    switch (action.type) {
        case PedidosActionTypeEnum.LISTAR_PEDIDOS:
            return { ...state, pedidos: action.payload };
        default:
            return state;
    }

}

export default PedidosReducer;