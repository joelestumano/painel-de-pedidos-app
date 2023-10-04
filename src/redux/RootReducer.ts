import { combineReducers } from "redux";
import PedidosReducer from "./pedidos/PedidosReducer";
import EventosReducer from "./eventos/EventosReducer";
import UsuarioReducer from "./usuario/UsuarioReducer";

const RootReducer = combineReducers({ PedidosReducer, EventosReducer, UsuarioReducer });
export default RootReducer;
