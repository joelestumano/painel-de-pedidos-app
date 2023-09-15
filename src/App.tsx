import { UseDocumentTitle } from "./app/shared/hooks/use-document-title.hook";
import PedidosList from "./app/modules/pedidos/pages/PedidosList/PedidosList";
import { OffCanvasComponent } from "./app/shared/components/off-canvas/off-canvas.component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { EVENTO_ACTION_TYPE } from "./redux/eventos/action-type.enum";

function Index({ ...props }) {
  const dispatch = useDispatch();

  const getOnLineStatus = () =>
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
      ? navigator.onLine
      : true;

  dispatch({
    type: EVENTO_ACTION_TYPE.IS_ONLINE,
    payload: getOnLineStatus()
  })

  useEffect(() => {
    const handleOnline = () => {
      dispatch({
        type: EVENTO_ACTION_TYPE.IS_ONLINE,
        payload: true
      })
    };

    const handleOffline = () => {
      dispatch({
        type: EVENTO_ACTION_TYPE.IS_ONLINE,
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
