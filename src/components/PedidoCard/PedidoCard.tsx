import "./PedidoCard.scss";
import { Icon } from "../Icon";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Pedido } from "../../types/Pedido.type";
import { NumeroPedido } from "../NumeroPedido/NumeroPedido";

const Section = ({ ...props }) => {
  return <span className="card-text p-1 px-3 fs-5 fw-bold rounded-2 bg-primary bg-opacity-25">
    <small className="">{props.cliente}</small>
  </span>
}

export const PedidoCard = ({ ...props }) => {
  let despacho = new Date(props.pedido?.horaDespacho);
  function getImgs(pedido: Pedido): string[] {
    return pedido.items.map((item: any, index: number) => item.bannerUrl);
  }
  return (

    <div className={`card card-item w-100 border-0 p-3 ${props.isPrincipal ? "card-principal shadow" : "h-100 bg-primary bg-opacity-25"}`}>
      <div className="row p-0 m-0">

        <div className="col-md-6 p-2">
          <ImageGallery images={getImgs(props.pedido)} />
        </div>

        <div className="col-md-6 p-2">
          <div className="card-body p-0 d-flex flex-column">

          <NumeroPedido value={props.pedido.codigo}/>

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

          </div>

        </div>
      </div>
    </div>

  );
};
