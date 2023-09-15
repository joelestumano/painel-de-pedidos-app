import { combineReducers } from "redux";
import PedidosReducer from "./pedidos/Reducer";
import EventosReducer from "./eventos/reducer";

const RootReducer = combineReducers({ PedidosReducer, EventosReducer });
export default RootReducer;
