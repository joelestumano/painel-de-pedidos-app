import { Pedido } from "../types/Pedido.type";
import { Icon } from "./Icon";

const Section = ({ ...props }) => {
  return <span className="card-text p-1 px-3 fs-5 fw-bold rounded-2 bg-primary bg-opacity-25">
    <small className="">{props.cliente}</small>
  </span>
}

export const PedidoCard = ({ ...props }) => {
  let despacho = new Date(props.pedido?.horaDespacho);
  return (
    <>
      <div className={`card w-100 h-100 border-0 p-3 ${props.isPrincipal ? "shadow" : "bg-primary bg-opacity-25"}`}>
        <div className="row h-100">
          <div className="col-md-4">
            <img src={props.pedido.items[0].bannerUrl} className="img-fluid rounded h-100" alt="item" />
          </div>
          <div className="col-md-8 p-0">
            <div className="card-body p-0 h-100 d-flex flex-column">

              {props.isPrincipal ? <div className="d-flex align-items-center">
                <Section cliente={props.pedido.cliente.nome} /><Icon iconName="Clock" size={24} className="align-middle ms-2 me-1" />
                {despacho.toLocaleDateString()} às {despacho.toLocaleTimeString()}</div>
                : null}

              <ul className="list-group">
                {props.pedido.items.map((item: any, index: number) =>
                  <li className="list-group-item border-0 bg-transparent p-0 my-1" key={index}>
                    <span className="card-text p-1 px-2 rounded-2 bg-primary bg-opacity-25">
                      <small className="">{item.descricao} R$ {(item.valor.toFixed(2).replace('.', ','))}</small>
                    </span>
                  </li>
                )}
              </ul>

              <ul className="list-group list-group-horizontal mt-auto">
                {props.pedido.items.map((item: any, index: number) =>
                  <li className="list-group-item border-0 bg-transparent p-0 me-2" key={index}>
                    <img src={item.bannerUrl} className="img-fluid_ rounded" width={56} height={56} alt="item" />
                  </li>
                ).slice(1)}
              </ul>
            </div>

          </div>
        </div>
      </div>

    </>
  );
};
