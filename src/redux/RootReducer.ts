import { combineReducers } from "redux";
import PedidosReducer from "./pedidos/Reducer";

const RootReducer = combineReducers({ PedidosReducer });
export default RootReducer;
