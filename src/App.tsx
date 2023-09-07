import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Icon } from "./components/Icon";
import PedidosList from "./components/PedidosList";
import { UseDocumentTitle } from "./hooks/UseDocumentTitle.hook";

function Index({ ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  return (
    <div className="container-fluid min-vh-100">
      <Button type="button" title="offcanvas" variant="primary" style={{zIndex:1}} onClick={toggleShow} className="position-fixed top-0 end-0 rounded-end-0 rounded-start-3 mt-2 px-2 shadow">
        <Icon iconName="List" color="white" size={32} className="align-top" />
      </Button>
      <Offcanvas placement="end" show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>

      <PedidosList />
    </div>
  );
}

function App() {
  const [document_title, setDoucmentTitle] = UseDocumentTitle("Painel de pedidos");
  const props = {
    scroll: true,
    backdrop: true,
  };
  return <Index {...props} />;
}

export default App;
