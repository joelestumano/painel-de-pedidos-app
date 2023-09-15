import { UseDocumentTitle } from "./app/shared/hooks/UseDocumentTitleHook";
import PedidosList from "./app/modules/pedidos/pages/PedidosList/PedidosList";
import { OffCanvasComponent } from "./app/shared/components/off-canvas/OffCanvasComponent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { EventosActionTypeEnum } from "./redux/eventos/EventosActionTypeEnum";

function Index({ ...props }) {
  const dispatch = useDispatch();

  const getOnLineStatus = () =>
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
      ? navigator.onLine
      : true;

  dispatch({
    type: EventosActionTypeEnum.IS_ONLINE,
    payload: getOnLineStatus()
  })

  useEffect(() => {
    const handleOnline = () => {
      dispatch({
        type: EventosActionTypeEnum.IS_ONLINE,
        payload: true
      })
    };

    const handleOffline = () => {
      dispatch({
        type: EventosActionTypeEnum.IS_ONLINE,
        payload: false
      })
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);


  return (
    <>
      <OffCanvasComponent />
      <PedidosList />
    </>
  );
}

function App() {
  /* const [document_title, setDoucmentTitle] = UseDocumentTitle("Painel de pedidos"); */
  UseDocumentTitle("Painel de pedidos");
  const props = {
    scroll: true,
    backdrop: true,
  };
  return <Index {...props} />;
}

export default App;
