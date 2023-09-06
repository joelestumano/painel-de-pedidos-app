import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Icon } from "./components/icon.component";
import { PedidoComponent } from "./components/pedido.component";

function OffCanvasExample({ ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/v1/pedidos/paginate?status=pendente', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(resp => resp.json())
      .then((resp) => {
        setPedidos(resp.documentos)
      }).catch((err) => {
        console.error(err);
      })
  }, [])

  return (
    <div className="App">
      <Button variant="primary" onClick={toggleShow} className="position-fixed me-2 rounded-0">
        <Icon iconName="List" color="white" size={32} className="align-top" />
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>

      <div className="container">
        <ul className="list-group">
          {pedidos.length > 0 && pedidos.map((pedido: any, index) => <li key={index} className="list-group-item border-0">
            <PedidoComponent pedido={pedido} />
          </li>)}
        </ul>
      </div>

    </div>
  );
}

function App() {
  const props = {
    scroll: true,
    backdrop: true,
  };
  return <OffCanvasExample {...props} />;
}

export default App;
