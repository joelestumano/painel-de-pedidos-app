import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./modules/login/pages/LoginPage";
import PedidosPage from "./modules/pedidos/pages/PedidosList/PedidosPage";
import useLocalStorage from "@rehooks/local-storage";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { UsuarioActionTypeEnum } from "../redux/usuario/UsuarioActionTypeEnum";

const RequireAuth: React.FC<{ children: any; redirectTo: any }> = ({
    children,
    redirectTo,
}) => {
    const [isToken] = useLocalStorage("access_token");
    const dispatch = useDispatch();
    const userDecoded = isToken ? jwt_decode(isToken) : undefined;
    dispatch({
        type: UsuarioActionTypeEnum.SET_USUARIO,
        payload: userDecoded,
    });
    return isToken ? children : <Navigate to={redirectTo} />;
};

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/pedidos" element={<PedidosPage />} />
            <Route path="*" element={<Navigate to="/" />} />

            <Route
                path="/"
                element={
                    <RequireAuth redirectTo="/login">
                        <PedidosPage />
                    </RequireAuth>
                }
            />
        </Routes>
    );
};
