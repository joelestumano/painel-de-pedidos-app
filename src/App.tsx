import { UseDocumentTitle } from "./app/shared/hooks/use-document-title.hook";
import PedidosList from "./app/modules/pedidos/pages/PedidosList/PedidosList";
import { OffCanvasComponent } from "./app/shared/components/off-canvas/off-canvas.component";

function Index({ ...props }) {
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
