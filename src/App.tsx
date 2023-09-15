import { UseDocumentTitle } from "./app/shared/hooks/UseDocumentTitle.hook";
import PedidosList from "./app/modules/pedidos/pages/PedidosList/PedidosList";
import { OffCanvas } from "./app/shared/components/off-canvas/Offcanvas";

function Index({ ...props }) {
  return (
    <>
      <OffCanvas />
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
