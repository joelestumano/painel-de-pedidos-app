const initialState = {
    pedidosAtrasados: 0
}

const PedidosReducer = (state = initialState, action: { type: string, payload: number }) => {
    if (action.type === "PEDIDO_ATRASADO") {
        return { ...state, pedidosAtrasados: state.pedidosAtrasados + action.payload };
    }
    return state;
}

export default PedidosReducer;