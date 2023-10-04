import { UsuarioType } from "../../app/shared/types/UsuarioType";
import { UsuarioActionTypeEnum } from "./UsuarioActionTypeEnum";

const initialState: { usuario: UsuarioType | undefined } = {
    usuario: undefined,
};

const UsuarioReducer = (
    state = initialState,
    action: { type: string; payload: UsuarioType }
) => {
    switch (action.type) {
        case UsuarioActionTypeEnum.SET_USUARIO:
            return { ...state, usuario: action.payload };

        default:
            return state;
    }
};

export default UsuarioReducer;
