import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsIcon } from "./app/shared/components/BsIcon/BsIcon";
import { UseDocumentTitle } from "./app/shared/hooks/UseDocumentTitle.hook";
import PedidosList from "./app/modules/pedidos/pages/PedidosList/PedidosList";

function Index({ ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  return (
    <>
      <Button
        type="button"
        title="offcanvas"
        variant="primary"
        style={{ zIndex: 100 }}
        onClick={toggleShow}
        className="position-fixed top-0 end-0 rounded-end-0 rounded-start-3 mt-5 px-2 shadow"
      >
        <BsIcon iconName="List" color="white" size={32} className="align-top" />
      </Button>
      <Offcanvas placement="end" show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <BsIcon iconName="Gear" size={32} className="align-middle me-1" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc. */}
        </Offcanvas.Body>
      </Offcanvas>
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
