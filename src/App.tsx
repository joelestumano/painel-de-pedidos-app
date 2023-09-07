import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Icon } from "./components/Icon";
import PedidosList from "./components/PedidosList";

function Index({ ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <div>
      <Button variant="primary" onClick={toggleShow} className="position-fixed me-2 rounded-0">
        <Icon iconName="List" color="white" size={32} className="align-top" />
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>

      <PedidosList/>
      
    </div>
  );
}

function App() {
  const props = {
    scroll: true,
    backdrop: true,
  };
  return <Index {...props} />;
}

export default App;
