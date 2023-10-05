import { OffCanvasComponent } from "./app/shared/components/off-canvas/OffCanvasComponent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { EventosActionTypeEnum } from "./redux/eventos/EventosActionTypeEnum";
import { AppRoutes } from "./app/Routes";
import { BrowserRouter } from "react-router-dom";

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
