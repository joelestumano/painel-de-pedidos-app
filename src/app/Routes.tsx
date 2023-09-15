import { Navigate, Route, Routes } from "react-router-dom";
import PedidosPage from "./modules/pedidos/pages/PedidosList/PedidosPage";
import { RelatorioPage } from "./modules/relatorios/pages/Relatorio";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route Component={PedidosPage} path="/pedidos" />
            <Route
                path="/"
                element={<Navigate to="/pedidos" />}
            />
            <Route Component={RelatorioPage} path="/relatorio" />
        </Routes>
    )
}