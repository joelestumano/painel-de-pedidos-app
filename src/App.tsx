import { OffCanvasComponent } from "./app/shared/components/off-canvas/OffCanvasComponent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { EventosActionTypeEnum } from "./redux/eventos/EventosActionTypeEnum";
import { AppRoutes } from "./app/Routes";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { UsuarioActionTypeEnum } from "./redux/usuario/UsuarioActionTypeEnum";
import { LocalStorageService } from "./app/services/LocalStorageServide";

function App() {
  const dispatch = useDispatch();

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

    const localToken = LocalStorageService.getStorage("access_token");
    const userDecoded = localToken ? jwt_decode(localToken) : undefined;
    dispatch({
      type: UsuarioActionTypeEnum.SET_USUARIO,
      payload: userDecoded,
    });

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <OffCanvasComponent />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
