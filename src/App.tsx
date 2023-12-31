import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { EventosActionTypeEnum } from "./redux/eventos/EventosActionTypeEnum";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import useLocalStorage from "@rehooks/local-storage";
import { UsuarioActionTypeEnum } from "./redux/usuario/UsuarioActionTypeEnum";
import { Container } from "react-bootstrap";
import { AdminModule } from "./app/modules/admin/AdminModule";
import { LoginPage } from "./app/modules/painel/login/pages/LoginPage";
import { ForgottenPasswordPage } from "./app/modules/account/pages/ForgottenPassword";
import { ResetPasswordPage } from "./app/modules/account/pages/ResetPassword";
import { PedidosPage } from "./app/modules/painel/pedidos/pages/PedidosList/PedidosPage";
import { RequireAuth, PainelModule } from "./app/modules/painel/PainelModule";

function IndexApp() {
  return (
    <Container fluid={true} className="p-0">
      <Outlet />
    </Container>
  );
}

function App() {
  const dispatch = useDispatch();
  const [isToken] = useLocalStorage("access_token");
  const userDecoded = isToken ? jwt_decode(isToken) : undefined;

  dispatch({
    type: UsuarioActionTypeEnum.SET_USUARIO,
    payload: userDecoded,
  });

  const getOnLineStatus = () =>
    typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
      ? navigator.onLine
      : true;

  dispatch({
    type: EventosActionTypeEnum.IS_ONLINE,
    payload: getOnLineStatus(),
  });

  useEffect(() => {
    const handleOnline = () => {
      dispatch({
        type: EventosActionTypeEnum.IS_ONLINE,
        payload: true,
      });
    };

    const handleOffline = () => {
      dispatch({
        type: EventosActionTypeEnum.IS_ONLINE,
        payload: false,
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch, userDecoded]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<IndexApp />}>

          <Route path="sg-painel" element={<PainelModule />} >
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgottenPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="" element={
              <RequireAuth redirectTo="login">
                <PedidosPage />
              </RequireAuth>
            } />
          </Route>

          <Route path="sg-admin" element={<AdminModule />} >

          </Route>

        </Route>
        <Route index element={<Navigate to='sg-painel' />}></Route>
        <Route path="sg-painel/*" element={<Navigate to="/sg-painel" />} />
        <Route index element={<Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
