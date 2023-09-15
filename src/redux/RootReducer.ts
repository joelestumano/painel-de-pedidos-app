import { combineReducers } from "redux";
import PedidosReducer from "./pedidos/PedidosReducer";
import EventosReducer from "./eventos/EventosReducer";

const RootReducer = combineReducers({ PedidosReducer, EventosReducer });
export default RootReducer;
