import { Navigate, Route, Routes } from "react-router-dom";
import PedidosPage from "./modules/pedidos/pages/PedidosList/PedidosPage";
import { LoginPage } from "./modules/login/pages/Login";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route Component={PedidosPage} path="/pedidos" />
            <Route
                path="/"
                element={<Navigate to="/pedidos" />}
            />
            <Route Component={LoginPage} path="/login" />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}